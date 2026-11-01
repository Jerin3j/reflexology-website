import { useCallback, useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Sessions } from "@/components/Sessions";
import { WhyReflexology } from "@/components/WhyReflexology";
import { Reviews } from "@/components/Reviews";
import { VisitUs } from "@/components/VisitUs";
import { Footer } from "@/components/Footer";
import { BookingModal } from "@/components/BookingModal";
import { cn } from "@/utils/cn";

export default function App() {
  const [booking, setBooking] = useState<{ open: boolean; sessionId: string | null }>({
    open: false,
    sessionId: null,
  });
  const [showFab, setShowFab] = useState(false);

  const openBooking = useCallback((sessionId?: string) => {
    setBooking({ open: true, sessionId: sessionId ?? null });
  }, []);

  const closeBooking = useCallback(() => {
    setBooking((b) => ({ ...b, open: false }));
  }, []);

  /* mobile floating CTA appears after the hero */
  useEffect(() => {
    const onScroll = () => setShowFab(window.scrollY > 620);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen overflow-x-clip bg-cream font-body text-mocha">
      <Navbar onBook={() => openBooking()} />

      <main>
        <Hero onBook={() => openBooking()} />
        <Marquee />
        <Sessions onBook={openBooking} />
        <WhyReflexology />
        <Reviews />
        <VisitUs onBook={() => openBooking()} />
      </main>

      <Footer onBook={() => openBooking()} />

      {/* mobile floating booking button */}
      <button
        onClick={() => openBooking()}
        aria-hidden={!showFab || booking.open}
        tabIndex={showFab && !booking.open ? 0 : -1}
        className={cn(
          "fixed bottom-5 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2.5 rounded-full",
          "bg-espresso px-7 py-4 text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-champagne",
          "shadow-[0_20px_44px_-14px_rgba(58,43,29,0.7)] transition-all duration-500 sm:hidden",
          showFab && !booking.open
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-20 opacity-0"
        )}
      >
        Book a Session
        <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
      </button>

      <BookingModal open={booking.open} sessionId={booking.sessionId} onClose={closeBooking} />
    </div>
  );
}
