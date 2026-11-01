import type { LucideIcon } from "lucide-react";
import { Sparkles, Footprints, MoonStar, Leaf } from "lucide-react";

/**
 * ─────────────────────────────────────────────────────────────
 *  SERENE FEET REFLEXOLOGY · SITE CONTENT
 *  Single source of truth for business details, pricing,
 *  testimonials, and imagery. Update values here only.
 * ─────────────────────────────────────────────────────────────
 */

export const BUSINESS = {
  name: "Serene Feet Reflexology",
  shortName: "Serene Feet",
  tagline: "Reflexology · Foot Rituals · Deep Rest",
  phoneDisplay: "+91 99611 10579",
  phoneHref: "tel:+919961110579",
  email: "hello@serenefeet.in",
  addressLine1: "Old Mahabalipuram Road (OMR), Sholinganallur",
  addressLine2: "Chennai, Tamil Nadu 600119",
};

/* ── WhatsApp booking ──────────────────────────────────────── */
export const WHATSAPP_NUMBER = "919961110579";

export const waLink = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

/** Generic “I’d like to book” chat opener. */
export const WA_GREETING_LINK = waLink(
  "Hello Serene Feet! I'd like to book a reflexology session. Could you share your next available slots?"
);

/* ── Maps (Sholinganallur, Chennai — 12.896909, 80.224768) ─────
   The share link "?ll=…&mapclient=embed" doesn't render inside an
   iframe; appending &output=embed is the supported iframe format
   and honours the same view, zoom and query.                    */
export const MAPS_EMBED_URL =
  "https://www.google.com/maps?ll=12.896909,80.224768&z=13&t=m&hl=en-US&gl=IN&q=Sholinganallur,+Chennai,+Tamil+Nadu&output=embed";

/* Coordinate-pin fallbacks if the named query is blocked. */
const MAP_COORDS = "12.896909,80.224768";
export const MAPS_EMBED_FALLBACK_URL = `https://maps.google.com/maps?q=${MAP_COORDS}&hl=en&z=13&output=embed`;
export const OPENSTREETMAP_EMBED_URL = `https://www.openstreetmap.org/export/embed.html?bbox=80.208768,12.880909,80.240768,12.912909&layer=mapnik&marker=12.896909,80.224768`;

export const DIRECTIONS_URL =
  "https://www.google.com/maps?ll=12.896909,80.224768&z=13&t=m&hl=en-US&gl=US&mapclient=embed&q=Sholinganallur+Chennai,+Tamil+Nadu";

export const SOCIALS: { label: string; href: string; key: "instagram" | "facebook" | "whatsapp" }[] = [
  { label: "Instagram", href: "https://instagram.com", key: "instagram" },
  { label: "Facebook", href: "https://facebook.com", key: "facebook" },
  { label: "WhatsApp", href: WA_GREETING_LINK, key: "whatsapp" },
];

/* ── Hours IST (Sunday = 0 … Saturday = 6) ─────────────────── */
export interface DayHours {
  days: number[];
  label: string;
  time: string;
  open: number; // minutes from midnight
  close: number;
}

export const HOURS: DayHours[] = [
  { days: [1, 2, 3, 4, 5, 6], label: "Monday – Saturday", time: "10:00 AM – 8:00 PM", open: 600, close: 1200 },
  { days: [0], label: "Sunday", time: "11:00 AM – 7:00 PM", open: 660, close: 1140 },
];

export function getOpenStatus(now: Date = new Date()): {
  open: boolean;
  message: string;
  todayRange: DayHours;
} {
  const day = now.getDay();
  const minutes = now.getHours() * 60 + now.getMinutes();
  const today = HOURS.find((h) => h.days.includes(day)) ?? HOURS[0];
  const fmt = (m: number) => {
    const h24 = Math.floor(m / 60);
    const h = ((h24 + 11) % 12) + 1;
    const mm = String(m % 60).padStart(2, "0");
    return `${h}:${mm} ${h24 >= 12 ? "PM" : "AM"}`;
  };
  const open = minutes >= today.open && minutes < today.close;
  return {
    open,
    todayRange: today,
    message: open
      ? `Open now · until ${fmt(today.close)}`
      : minutes < today.open
        ? `Opens today at ${fmt(today.open)}`
        : `Closed · opens at ${fmt(today.open)} tomorrow`,
  };
}

/** Bookable time slots for the request form (derived from hours). */
export function timeSlotsFor(dayIndex: number): string[] {
  const day = HOURS.find((h) => h.days.includes(dayIndex));
  if (!day) return [];
  const slots: string[] = [];
  for (let m = day.open; m <= day.close - 45; m += 30) {
    const h24 = Math.floor(m / 60);
    const h = ((h24 + 11) % 12) + 1;
    const mm = String(m % 60).padStart(2, "0");
    slots.push(`${h}:${mm} ${h24 >= 12 ? "PM" : "AM"}`);
  }
  return slots;
}

/* ── Pricing (INR) ─────────────────────────────────────────── */
export const formatPrice = (n: number) => `₹${n.toLocaleString("en-IN")}`;

/* ── Navigation ────────────────────────────────────────────── */
export const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "sessions", label: "Sessions" },
  { id: "why", label: "Why Reflexology" },
  { id: "reviews", label: "Reviews" },
  { id: "visit", label: "Visit Us" },
];

/* ── Imagery (photography via Pexels — swap freely) ────────── */
const px = (id: number, w: number, h: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=${w}&h=${h}`;

export const IMAGES = {
  heroMain: px(9483564, 980, 1320), // close-up therapeutic foot massage (portrait)
  heroMainCredit: { name: "Leomara Paiva", url: "https://www.pexels.com/@leomara-paiva-103844600" },
  heroAccent: px(6186740, 560, 420), // spa candle & towels
  heroAccentCredit: { name: "Tima Miroshnichenko", url: "https://www.pexels.com/@tima-miroshnichenko" },
  ritualMain: px(6663561, 860, 1080), // masseuse massaging feet (portrait)
  ritualAccent: px(19695948, 520, 400), // foot soak with mineral salts
  interior: px(7598366, 1200, 760), // tranquil treatment room
};

/* ── Sessions ──────────────────────────────────────────────── */
export interface Session {
  id: string;
  name: string;
  description: string;
  durationMin: number;
  price: number;
  image: string;
  badge?: string;
}

export const SESSIONS: Session[] = [
  {
    id: "signature",
    name: "The Signature Ritual",
    description:
      "Our most-loved session — unhurried thumb-walking across every reflex point of the foot, warm towel compressions, and your choice of house aromatherapy.",
    durationMin: 60,
    price: 1499,
    image: px(9146383, 800, 700),
    badge: "Guest Favorite",
  },
  {
    id: "warm-stone",
    name: "Warm Stone Sole Therapy",
    description:
      "Smooth basalt stones, gently heated and glided along the arches and calves, easing heavy legs into a slow, grounded calm.",
    durationMin: 75,
    price: 1899,
    image: px(6629530, 800, 700),
  },
  {
    id: "botanical-soak",
    name: "Botanical Soak & Scrub",
    description:
      "A deep copper-bowl soak infused with Himalayan pink salt and dried botanicals, followed by gentle exfoliation and a light, lifting massage.",
    durationMin: 45,
    price: 999,
    image: px(3865710, 800, 700),
  },
  {
    id: "full-unwind",
    name: "The Full Unwind",
    description:
      "Complete foot reflexology paired with a soothing champi for the scalp, neck, and shoulders — ninety minutes that ask nothing of you at all.",
    durationMin: 90,
    price: 2499,
    image: px(9146381, 800, 700),
  },
];

/* ── Why Reflexology ───────────────────────────────────────── */
export interface Benefit {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const BENEFITS: Benefit[] = [
  {
    icon: Sparkles,
    title: "Relaxation & Stress Relief",
    description:
      "Deliberate, rhythmic pressure invites the nervous system to downshift — many guests describe the hour as the stillest part of their week.",
  },
  {
    icon: Footprints,
    title: "A Soothing Foot Massage",
    description:
      "Slow, attentive work through the soles, arches, and ankles leaves feet feeling light, warm, and quietly renewed.",
  },
  {
    icon: MoonStar,
    title: "Comfort After Long Days",
    description:
      "Made for people who stand, commute, teach, nurse, build, and carry — a place for overworked feet to finally be looked after.",
  },
  {
    icon: Leaf,
    title: "A Restorative Ritual",
    description:
      "Warm water, botanicals, soft light, and no phones. A calm, unhurried pause you can build into your wellness routine.",
  },
];

export const WELLNESS_DISCLAIMER =
  "Reflexology is a complementary wellness practice focused on relaxation and comfort. It is not a medical treatment and is not a substitute for professional medical care.";

/* ── Reviews — SAMPLE testimonials for layout preview ─────────
   Replace each entry with verified guest feedback once the
   studio's Google review profile is connected.                */
export interface Testimonial {
  quote: string;
  name: string;
  initials: string;
  context: string;
  rating: number; // 1–5
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Ten-hour shifts on hospital floors — the Signature Ritual is the one hour my feet stop aching and my mind stops racing. I rebooked before I reached my scooter.",
    name: "Meera S.",
    initials: "MS",
    context: "Signature Ritual",
    rating: 5,
  },
  {
    quote:
      "OMR traffic steals two hours of my day. Seventy-five minutes with the warm stones gives it all back. This is my Sunday-evening ritual now.",
    name: "Aditya K.",
    initials: "AK",
    context: "Warm Stone Sole Therapy",
    rating: 5,
  },
  {
    quote:
      "They remembered exactly how I take my chai and where my arches ache — on my second visit. Thoughtful, unhurried, spotless.",
    name: "Lakshmi P.",
    initials: "LP",
    context: "Botanical Soak & Scrub",
    rating: 5,
  },
  {
    quote:
      "Standing through wedding-season shoots wrecked my feet. One soak and scrub and I walked out feeling two inches taller.",
    name: "Rahul V.",
    initials: "RV",
    context: "Signature Ritual",
    rating: 5,
  },
  {
    quote:
      "Gifted Amma the soak for her birthday and stayed for one myself. We both floated out. The staff are warmth personified.",
    name: "Ananya D.",
    initials: "AD",
    context: "The Full Unwind",
    rating: 5,
  },
  {
    quote:
      "Quiet room, warm towels, perfect pressure — my phone stayed in my pocket the whole hour. Exactly what a foot spa should feel like.",
    name: "Farhan M.",
    initials: "FM",
    context: "Botanical Soak & Scrub",
    rating: 4,
  },
];

export const REVIEWS_NOTE =
  "These testimonials are samples shown for design preview — verified guest reviews will appear here once the studio's Google review profile is connected.";

/* ── Marquee ribbon ────────────────────────────────────────── */
export const MARQUEE_ITEMS = [
  "Warm Towel Finish",
  "Botanical Foot Soaks",
  "Certified Reflexologists",
  "House Aromatherapy",
  "Quiet Recline Rooms",
  "Masala Chai Service",
  "Gift Vouchers Available",
  "Walk-ins Welcome",
];
