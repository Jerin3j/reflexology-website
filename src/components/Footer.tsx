import { ArrowUp, Footprints, MapPin, Phone, Mail } from "lucide-react";
import { BUSINESS, NAV_LINKS, SESSIONS, SOCIALS, formatPrice } from "@/data/site";
import { WhatsAppGlyph } from "@/components/icons";

function SocialIcon({ network }: { network: string }) {
  const cls = "h-[18px] w-[18px]";
  switch (network) {
    case "instagram":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={cls}>
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
      );
    case "facebook":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={cls}>
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      );
    case "whatsapp":
      return <WhatsAppGlyph className={cls} />;
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={cls}>
          <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
          <path d="m10 15 5-3-5-3z" />
        </svg>
      );
  }
}

interface FooterProps {
  onBook: () => void;
}

export function Footer({ onBook }: FooterProps) {
  const year = new Date().getFullYear();

  const goTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer className="relative overflow-hidden bg-espresso text-cream">
      {/* CTA banner */}
      <div className="relative border-b border-cream/10">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
        >
          <span className="select-none whitespace-nowrap font-display text-[13vw] font-semibold italic leading-none text-cream/[0.035]">
            breathe
          </span>
        </div>
        <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-8 px-5 py-20 text-center sm:px-8">
          <p className="text-[0.72rem] font-medium uppercase tracking-[0.34em] text-champagne">
            Your feet carried you here
          </p>
          <h2 className="max-w-3xl font-display text-[clamp(2.4rem,5vw,4.4rem)] font-medium leading-[1.04]">
            Begin at the feet.
            <span className="italic text-champagne"> The rest follows.</span>
          </h2>
          <button
            onClick={onBook}
            className="group flex items-center gap-3 rounded-full bg-ember px-9 py-4.5 text-sm font-medium uppercase tracking-[0.16em] text-cream shadow-[0_20px_44px_-14px_rgba(200,121,44,0.65)] transition-all duration-300 hover:-translate-y-1 hover:bg-ember-deep"
          >
            Book a Session
          </button>
        </div>
      </div>

      {/* main footer grid */}
      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-2 lg:grid-cols-4">
        {/* brand */}
        <div>
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-champagne text-espresso">
              <Footprints className="h-5 w-5" strokeWidth={1.8} />
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-display text-xl font-semibold">Serene Feet</span>
              <span className="mt-1 text-[0.58rem] font-medium uppercase tracking-[0.38em] text-champagne/80">
                Reflexology
              </span>
            </span>
          </div>
          <p className="mt-5 max-w-xs text-sm font-light leading-relaxed text-cream/60">
            A boutique reflexology and foot massage studio devoted to slow afternoons,
            warm water, and the quiet art of caring for tired feet.
          </p>
          <div className="mt-6 flex gap-3">
            {SOCIALS.map((s) => (
              <a
                key={s.key}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/15 text-cream/70 transition-all duration-300 hover:border-champagne hover:bg-champagne hover:text-espresso"
              >
                <SocialIcon network={s.key} />
              </a>
            ))}
          </div>
        </div>

        {/* explore */}
        <nav aria-label="Footer">
          <h3 className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-champagne">
            Explore
          </h3>
          <ul className="mt-5 space-y-3">
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => goTo(link.id)}
                  className="text-sm font-light text-cream/65 transition-colors hover:text-champagne"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* sessions */}
        <div>
          <h3 className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-champagne">
            Sessions
          </h3>
          <ul className="mt-5 space-y-3">
            {SESSIONS.map((s) => (
              <li key={s.id}>
                <button
                  onClick={() => goTo("sessions")}
                  className="text-left text-sm font-light text-cream/65 transition-colors hover:text-champagne"
                >
                  {s.name}
                  <span className="ml-2 text-xs text-cream/35">
                    {s.durationMin} min · {formatPrice(s.price)}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* contact */}
        <div>
          <h3 className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-champagne">
            Contact
          </h3>
          <ul className="mt-5 space-y-4 text-sm font-light text-cream/65">
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-champagne/70" strokeWidth={1.8} />
              <span>
                {BUSINESS.addressLine1}
                <br />
                {BUSINESS.addressLine2}
              </span>
            </li>
            <li>
              <a
                href={BUSINESS.phoneHref}
                className="flex items-center gap-3 transition-colors hover:text-champagne"
              >
                <Phone className="h-4 w-4 shrink-0 text-champagne/70" strokeWidth={1.8} />
                {BUSINESS.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${BUSINESS.email}`}
                className="flex items-center gap-3 break-all transition-colors hover:text-champagne"
              >
                <Mail className="h-4 w-4 shrink-0 text-champagne/70" strokeWidth={1.8} />
                {BUSINESS.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* bottom bar */}
      <div className="relative border-t border-cream/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 py-6 text-xs font-light text-cream/45 sm:flex-row sm:px-8">
          <p>
            © {year} {BUSINESS.name}. All rights reserved.
          </p>
          <p className="text-center">
            Sholinganallur, Chennai · Photography via{" "}
            <a
              href="https://www.pexels.com"
              target="_blank"
              rel="noreferrer"
              className="text-champagne/80 underline-offset-2 hover:underline"
            >
              Pexels
            </a>
          </p>
          <button
            onClick={() => goTo("home")}
            className="group flex items-center gap-2 text-cream/60 transition-colors hover:text-champagne"
            aria-label="Back to top"
          >
            Back to top
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-cream/15 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-champagne">
              <ArrowUp className="h-3.5 w-3.5" strokeWidth={2} />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
