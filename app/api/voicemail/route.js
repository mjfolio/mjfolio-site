import nodemailer from 'nodemailer';

export async function POST(request) {
  const { recordingUrl, callerNumber } = await request.json();

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: `New land offer voicemail from ${callerNumber}`,
    text: `Caller: ${callerNumber}\n\nListen: ${recordingUrl}.mp3`,
  });

  return Response.json({ ok: true });
}
