import nodemailer from 'nodemailer';

// Emails a landing-page form submission to LEAD_TO (defaults to EMAIL_USER).
// Seller responses come from the home page; buyer inquiries (kind: 'buyer') from /land listings.
const FIELDS = ['name', 'phone', 'email', 'apn', 'county', 'state', 'intent', 'message', 'property'];

// Single-line fields get newlines collapsed (keeps the email subject/header clean)
function clean(v, max, multiline = false) {
  const s = String(v || '');
  return (multiline ? s : s.replace(/[\r\n]+/g, ' ')).trim().slice(0, max);
}

export async function POST(request) {
  const body = await request.json().catch(() => ({}));

  // Honeypot: bots fill the hidden "website" field. Pretend success.
  if (body.website) return Response.json({ ok: true });

  const lead = {};
  for (const f of FIELDS) lead[f] = f === 'message' ? clean(body[f], 3000, true) : clean(body[f], 200);

  if (!lead.name || (!lead.phone && !lead.email) || !lead.intent) {
    return Response.json({ ok: false, error: 'missing fields' }, { status: 400 });
  }

  const buyer = body.kind === 'buyer';
  const optOut = !buyer && lead.intent.startsWith('Not interested');
  const when = new Date().toLocaleString('en-US', { timeZone: 'America/New_York' });
  const where = [lead.county, lead.state].filter(Boolean).join(', ');
  const subject = buyer
    ? `Buyer inquiry: ${lead.name} – ${lead.property || lead.apn || 'land listing'}`
    : optOut
      ? `Opt-out: ${lead.name}${lead.apn ? ` (APN ${lead.apn})` : ''}`
      : `New seller lead: ${lead.name}${where ? ` – ${where}` : ''}`;

  const text =
    `${lead.intent}\n\n` +
    (buyer ? `Property: ${lead.property || '-'}\n` : '') +
    `Name:    ${lead.name}\n` +
    `Phone:   ${lead.phone || '-'}\n` +
    `Email:   ${lead.email || '-'}\n` +
    `APN:     ${lead.apn || '-'}\n` +
    `County:  ${lead.county || '-'}\n` +
    `State:   ${lead.state || '-'}\n\n` +
    `Message:\n${lead.message || '-'}\n\n` +
    `Submitted ${when} ET via ${request.headers.get('host') || 'website'}`;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: process.env.EMAIL_USER, pass: (process.env.EMAIL_PASSWORD || '').replace(/\s/g, '') },
  });

  try {
    await transporter.sendMail({
      from: `MJFolio Website <${process.env.EMAIL_USER}>`,
      to: process.env.LEAD_TO || process.env.EMAIL_USER,
      replyTo: /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(lead.email) ? lead.email : undefined,
      subject,
      text,
    });
    return Response.json({ ok: true });
  } catch (err) {
    console.error(err);
    return Response.json({ ok: false, error: 'email failed' }, { status: 500 });
  }
}
