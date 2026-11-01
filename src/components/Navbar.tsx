import { useEffect, useState } from "react";
import { Footprints, Menu, X, Phone } from "lucide-react";
import { BUSINESS, NAV_LINKS } from "@/data/site";
import { cn } from "@/utils/cn";

interface NavbarProps {
  onBook: () => void;
}

export function Navbar({ onBook }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const probe = window.scrollY + 140;
      let current = "home";
      for (const link of NAV_LINKS) {
        const el = document.getElementById(link.id);
        if (el && el.offsetTop <= probe) current = link.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const goTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "border-b border-mocha/10 bg-cream/85 shadow-[0_10px_40px_-18px_rgba(58,43,29,0.35)] backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
          {/* Brand */}
          <button
            onClick={() => goTo("home")}
            className="group flex items-center gap-3"
            aria-label="Serene Feet Reflexology — back to top"
          >
            <span className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-espresso text-champagne shadow-[0_10px_24px_-10px_rgba(58,43,29,0.7)] transition-transform duration-500 group-hover:rotate-6">
              <Footprints className="h-5 w-5" strokeWidth={1.8} />
            </span>
            <span className="flex flex-col items-start leading-none">
              <span className="font-display text-[1.35rem] font-semibold tracking-tight text-espresso">
                Serene Feet
              </span>
              <span className="mt-1 text-[0.6rem] font-medium uppercase tracking-[0.38em] text-ember">
                Reflexology
              </span>
            </span>
          </button>

          {/* Desktop links */}
          <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => goTo(link.id)}
                className={cn(
                  "nav-link text-[0.83rem] font-medium uppercase tracking-[0.14em] transition-colors duration-300",
                  active === link.id ? "active text-espresso" : "text-mocha/75 hover:text-espresso"
                )}
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={BUSINESS.phoneHref}
              className="hidden items-center gap-2 text-sm font-medium text-mocha/80 transition-colors hover:text-espresso xl:flex"
            >
              <Phone className="h-4 w-4" strokeWidth={1.8} />
              {BUSINESS.phoneDisplay}
            </a>
            <button
              onClick={onBook}
              className="group relative hidden items-center gap-2 overflow-hidden rounded-full bg-ember px-6 py-3 text-[0.83rem] font-medium uppercase tracking-[0.14em] text-cream shadow-[0_14px_30px_-12px_rgba(200,121,44,0.7)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-ember-deep hover:shadow-[0_18px_38px_-12px_rgba(200,121,44,0.8)] sm:flex"
            >
              Book a Session
            </button>
            <button
              onClick={() => setMenuOpen(true)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-mocha/15 bg-cream/70 text-espresso backdrop-blur transition-colors hover:bg-champagne lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" strokeWidth={1.8} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay menu */}
      <div
        className={cn(
          "fixed inset-0 z-[60] flex flex-col bg-espresso text-cream transition-all duration-500 lg:hidden",
          menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
      >
        <div className="flex h-[76px] items-center justify-between px-5 sm:px-8">
          <span className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-champagne text-espresso">
              <Footprints className="h-5 w-5" strokeWidth={1.8} />
            </span>
            <span className="font-display text-xl font-semibold">Serene Feet</span>
          </span>
          <button
            onClick={() => setMenuOpen(false)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/20 text-cream transition-colors hover:bg-cream/10"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" strokeWidth={1.8} />
          </button>
        </div>

        <nav className="flex flex-1 flex-col justify-center gap-1 px-8" aria-label="Mobile">
          {NAV_LINKS.map((link, i) => (
            <button
              key={link.id}
              onClick={() => goTo(link.id)}
              style={{ transitionDelay: menuOpen ? `${120 + i * 70}ms` : "0ms" }}
              className={cn(
                "group flex items-baseline gap-4 py-3 text-left transition-all duration-700",
                menuOpen ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              )}
            >
              <span className="text-xs font-medium tracking-[0.3em] text-champagne/70">
                0{i + 1}
              </span>
              <span
                className={cn(
                  "font-display text-4xl font-medium transition-colors group-hover:text-champagne",
                  active === link.id ? "italic text-champagne" : "text-cream"
                )}
              >
                {link.label}
              </span>
            </button>
          ))}
        </nav>

        <div className="space-y-4 px-8 pb-10">
          <button
            onClick={() => {
              setMenuOpen(false);
              onBook();
            }}
            className="w-full rounded-full bg-ember py-4 text-sm font-medium uppercase tracking-[0.16em] text-cream transition-colors hover:bg-ember-deep"
          >
            Book a Session
          </button>
          <p className="text-center text-sm text-cream/50">
            {BUSINESS.addressLine1} · {BUSINESS.phoneDisplay}
          </p>
        </div>
      </div>
    </>
  );
}
