// Land we own and are selling. Photos live in public/land/<slug>/.
export type Photo = { file: string; alt: string; w: number; h: number };

export type Listing = {
  slug: string;
  status: "available" | "pending" | "sold";
  title: string;
  location: string;
  apn: string;
  county: string;
  state: string;
  acres: number;
  cashPrice: number;
  terms: { down: number; monthly: number; months: number };
  lat: number;
  lng: number;
  summary: string;
  description: string[];
  facts: [string, string][];
  photos: Photo[];
};

const drone = (file: string, alt: string): Photo => ({ file, alt, w: 1920, h: 1080 });
const phone = (file: string, alt: string): Photo => ({ file, alt, w: 1920, h: 1440 });

export const listings: Listing[] = [
  {
    slug: "interlachen-hudson-st",
    status: "available",
    title: "Wooded 0.23-acre lot on Hudson St",
    location: "Interlachen, FL 32148",
    apn: "12-10-24-4081-0690-0060",
    county: "Putnam",
    state: "FL",
    acres: 0.23,
    cashPrice: 9500,
    terms: { down: 499, monthly: 249, months: 48 },
    lat: 29.6431,
    lng: -81.8472,
    summary:
      "Quiet, wooded homesite under live oaks and tall pines, with road frontage and Flood Zone X.",
    description: [
      "Own your own piece of Florida for less than the cost of a used car. This 0.23-acre lot sits on Hudson St in Interlachen Lakes Estates, a rural neighborhood of wooded lots and scattered homes just outside the small town of Interlachen.",
      "The lot is covered in mature live oaks hung with Spanish moss, with tall pines and palmettos toward the back. It fronts a graded sand road, one lot in from Morrison Rd, and power lines run along the road nearby.",
      "It sits in FEMA Flood Zone X, an area of minimal flood hazard. That's great for building, camping, or simply holding land in a growing part of North Central Florida, between Gainesville and Palatka.",
      "No HOA. Pay cash, or take it home with low monthly payments and no credit check.",
    ],
    facts: [
      ["Size", "0.23 acres"],
      ["County", "Putnam County, FL"],
      ["Parcel (APN)", "12-10-24-4081-0690-0060"],
      ["Legal", "Interlachen Lakes Ests Unit 22, Blk 69 Lot 6"],
      ["Road access", "Hudson St, graded sand road"],
      ["Flood zone", "Zone X (minimal flood hazard)"],
      ["Power", "Power lines along the road nearby"],
      ["Water / sewer", "Well and septic needed"],
      ["Annual taxes", "About $90 (2025)"],
      ["HOA", "None"],
      ["Zoning", "Residential. Verify allowed uses with Putnam County Planning & Zoning"],
      ["GPS (approx.)", "29.6431, -81.8472"],
    ],
    photos: [
      drone("01_aerial_lot.jpg", "Overhead drone view of the wooded lot along Hudson St"),
      { file: "02_parcel_map.jpg", alt: "Parcel map with the lot outlined in blue on Hudson St near Morrison Rd", w: 846, h: 744 },
      phone("09_oaks_frontage.jpg", "Live oaks with Spanish moss along the road frontage"),
      drone("03_aerial_hudson_st.jpg", "Aerial view looking down Hudson St"),
      drone("04_aerial_neighborhood.jpg", "Aerial view of the surrounding neighborhood and homes"),
      drone("07_drone_frontage.jpg", "Low drone view of the lot from the road"),
      drone("08_drone_frontage_pines.jpg", "Tall pines and palmettos along the frontage"),
      phone("10_live_oaks.jpg", "Large live oaks on the lot"),
      phone("11_frontage.jpg", "Road frontage on Hudson St"),
      phone("12_hudson_st.jpg", "Looking down Hudson St beside the lot"),
      phone("13_road_power.jpg", "Hudson St with power lines and a nearby home"),
      phone("14_road_edge.jpg", "Edge of the lot along the sand road"),
      drone("05_aerial_area.jpg", "Wide aerial view of the Interlachen area"),
      drone("06_aerial_pond_homes.jpg", "Nearby pond and homes in the neighborhood"),
    ],
  },
];

export const money = (n: number) => `$${n.toLocaleString("en-US")}`;
export const photoSrc = (l: Listing, p: Photo) => `/land/${l.slug}/${p.file}`;
