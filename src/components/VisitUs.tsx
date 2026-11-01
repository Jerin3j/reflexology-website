import { useEffect, useRef, useState } from "react";
import {
  Clock,
  Mail,
  MapPin,
  Navigation,
  Phone,
  ArrowRight,
} from "lucide-react";
import {
  BUSINESS,
  DIRECTIONS_URL,
  HOURS,
  MAPS_EMBED_URL,
  MAPS_EMBED_FALLBACK_URL,
  OPENSTREETMAP_EMBED_URL,
  WA_GREETING_LINK,
  getOpenStatus,
} from "@/data/site";
import { Reveal } from "@/components/Reveal";
import { WhatsAppGlyph } from "@/components/icons";
import { cn } from "@/utils/cn";

interface VisitUsProps {
  onBook: () => void;
}

const MAP_FRAMES = [
  { src: MAPS_EMBED_URL, title: "Google map — Serene Feet Reflexology in Sholinganallur, Chennai" },
  { src: MAPS_EMBED_FALLBACK_URL, title: "Google map (fallback) of the studio location" },
  { src: OPENSTREETMAP_EMBED_URL, title: "OpenStreetMap of the studio location" },
];

export function VisitUs({ onBook }: VisitUsProps) {
  const status = getOpenStatus();
  const today = new Date().getDay();

  const [frame, setFrame] = useState(0);
  const [mapReady, setMapReady] = useState(false);
  const timer = useRef<ReturnType<typeof window.setTimeout> | null>(null);
  const loadedRef = useRef(false);

  /* If a frame doesn't report loading within 9s (blocked by the
     browser/network), advance to the next provider. */
  useEffect(() => {
    loadedRef.current = false;
    timer.current = setTimeout(() => {
      if (!loadedRef.current && frame < MAP_FRAMES.length - 1) setFrame(frame + 1);
    }, 9000);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [frame]);

  return (
    <section id="visit" className="relative scroll-mt-24 bg-cream py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* header */}
        <Reveal>
          <div className="max-w-2xl">
            <p className="flex items-center gap-3 text-[0.72rem] font-medium uppercase tracking-[0.34em] text-ember">
              <span className="h-px w-10 bg-ember/70" />
              Visit Us
            </p>
            <h2 className="mt-5 font-display text-[clamp(2.4rem,4.6vw,4rem)] font-medium leading-[1.02] text-espresso">
              Find your way
              <span className="italic text-ember"> to quiet.</span>
            </h2>
            <p className="mt-5 text-base font-light leading-relaxed text-mocha/80">
              You'll find us just off OMR in Sholinganallur, minutes from the junction.
              Step in from the Chennai traffic — we will put the chai on.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-8 lg:grid-cols-5">
          {/* ── Info card ── */}
          <Reveal className="lg:col-span-2">
            <div className="flex h-full flex-col rounded-[2rem] border border-mocha/10 bg-sand p-8 shadow-[0_26px_60px_-30px_rgba(58,43,29,0.4)]">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-display text-2xl font-semibold text-espresso">
                  The Studio
                </h3>
                <span
                  className={cn(
                    "flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.14em]",
                    status.open
                      ? "bg-emerald-700/10 text-emerald-800"
                      : "bg-ember/10 text-ember-deep"
                  )}
                >
                  <span
                    className={cn(
                      "h-1.5 w-1.5 animate-pulse-dot rounded-full",
                      status.open ? "bg-emerald-600" : "bg-ember"
                    )}
                  />
                  {status.open ? "Open now" : "Closed"}
                </span>
              </div>

              <ul className="mt-7 space-y-5">
                <li className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-champagne/70 text-ember">
                    <MapPin className="h-5 w-5" strokeWidth={1.8} />
                  </span>
                  <span>
                    <span className="block text-sm font-medium text-espresso">
                      {BUSINESS.addressLine1}
                    </span>
                    <span className="block text-sm font-light text-mocha/75">
                      {BUSINESS.addressLine2}
                    </span>
                    <span className="mt-1 block text-xs font-light italic text-mocha/55">
                      Landmark: Sholinganallur junction, OMR
                    </span>
                  </span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-champagne/70 text-ember">
                    <Phone className="h-5 w-5" strokeWidth={1.8} />
                  </span>
                  <span>
                    <a
                      href={BUSINESS.phoneHref}
                      className="block text-sm font-medium text-espresso underline-offset-4 hover:text-ember hover:underline"
                    >
                      {BUSINESS.phoneDisplay}
                    </a>
                    <span className="block text-sm font-light text-mocha/75">
                      Call or WhatsApp to book
                    </span>
                  </span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-champagne/70 text-ember">
                    <Mail className="h-5 w-5" strokeWidth={1.8} />
                  </span>
                  <span>
                    <a
                      href={`mailto:${BUSINESS.email}`}
                      className="block break-all text-sm font-medium text-espresso underline-offset-4 hover:text-ember hover:underline"
                    >
                      {BUSINESS.email}
                    </a>
                    <span className="block text-sm font-light text-mocha/75">
                      We reply within a day
                    </span>
                  </span>
                </li>
              </ul>

              {/* hours */}
              <div className="mt-8 border-t border-mocha/10 pt-6">
                <p className="flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-mocha/70">
                  <Clock className="h-3.5 w-3.5" strokeWidth={2} />
                  Hours
                </p>
                <ul className="mt-3.5 space-y-1">
                  {HOURS.map((h) => {
                    const isToday = h.days.includes(today);
                    return (
                      <li
                        key={h.label}
                        className={cn(
                          "flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm",
                          isToday
                            ? "bg-champagne/60 font-medium text-espresso"
                            : "font-light text-mocha/80"
                        )}
                      >
                        <span>{h.label}</span>
                        <span>{h.time}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* actions */}
              <div className="mt-8 flex flex-1 flex-col justify-end gap-3">
                <a
                  href={DIRECTIONS_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-center gap-2.5 rounded-full bg-espresso px-6 py-3.5 text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-champagne transition-all duration-300 hover:-translate-y-0.5 hover:bg-mocha"
                >
                  <Navigation className="h-4 w-4" strokeWidth={1.9} />
                  Get Directions
                </a>
                <button
                  onClick={onBook}
                  className="group flex items-center justify-center gap-2.5 rounded-full bg-ember px-6 py-3.5 text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-cream transition-all duration-300 hover:-translate-y-0.5 hover:bg-ember-deep"
                >
                  Book a Session
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2} />
                </button>
                <a
                  href={WA_GREETING_LINK}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-center gap-2.5 rounded-full border border-ember/45 bg-cream/60 px-6 py-3.5 text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-ember transition-all duration-300 hover:-translate-y-0.5 hover:border-ember hover:bg-ember hover:text-cream"
                >
                  <WhatsAppGlyph className="h-4 w-4" />
                  Book on WhatsApp
                </a>
              </div>
            </div>
          </Reveal>

          {/* ── Map ── */}
          <Reveal delay={150} className="lg:col-span-3">
            <div className="flex h-full flex-col overflow-hidden rounded-[2rem] border border-mocha/10 bg-parchment shadow-[0_26px_60px_-30px_rgba(58,43,29,0.4)]">
              <div className="relative flex-1">
                {/* loading shimmer */}
                {!mapReady && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-parchment">
                    <span className="h-8 w-8 animate-spin rounded-full border-2 border-mocha/20 border-t-ember" />
                    <span className="text-xs font-medium uppercase tracking-[0.24em] text-mocha/60">
                      Loading map…
                    </span>
                  </div>
                )}
                <iframe
                  key={frame}
                  title={MAP_FRAMES[frame].title}
                  src={MAP_FRAMES[frame].src}
                  loading="eager"
                  allowFullScreen
                  onLoad={() => {
                    loadedRef.current = true;
                    setMapReady(true);
                  }}
                  className={cn(
                    "h-full min-h-[320px] w-full border-0 [filter:sepia(0.32)_saturate(0.85)_hue-rotate(-8deg)] sm:min-h-[420px]",
                    "transition-opacity duration-700",
                    mapReady ? "opacity-100" : "opacity-0"
                  )}
                />
                {mapReady && (
                  <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-center p-4">
                    <span className="pointer-events-auto flex items-center gap-2 rounded-full bg-espresso/85 px-5 py-2.5 text-xs font-medium tracking-wide text-champagne shadow-xl backdrop-blur">
                      <MapPin className="h-3.5 w-3.5 shrink-0" strokeWidth={2} />
                      Sholinganallur · OMR, Chennai
                    </span>
                  </div>
                )}
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3 bg-sand px-6 py-4">
                <p className="text-xs font-light italic text-mocha/60">
                  Pin on OMR, Sholinganallur — message us on WhatsApp if you'd like
                  landmark directions.
                </p>
                <a
                  href={DIRECTIONS_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-semibold uppercase tracking-[0.16em] text-ember underline-offset-4 hover:underline"
                >
                  Open in Google Maps
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
