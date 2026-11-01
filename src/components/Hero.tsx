import { ArrowRight, BadgeCheck, CupSoda, DoorOpen, ChevronDown } from "lucide-react";
import { IMAGES, SESSIONS, formatPrice, getOpenStatus } from "@/data/site";
import { Reveal } from "@/components/Reveal";

interface HeroProps {
  onBook: () => void;
}

const TRUST_POINTS = [
  { icon: BadgeCheck, label: "Certified reflexologists" },
  { icon: DoorOpen, label: "Walk-ins welcome" },
  { icon: CupSoda, label: "Masala chai with every visit" },
];

export function Hero({ onBook }: HeroProps) {
  const status = getOpenStatus();

  const goToSessions = () =>
    document.getElementById("sessions")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="home" className="grain relative overflow-hidden bg-cream">
      {/* ambient glows */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 right-[-8%] h-[34rem] w-[34rem] rounded-full bg-champagne/50 blur-3xl" />
        <div className="absolute bottom-[-20%] left-[-10%] h-[30rem] w-[30rem] rounded-full bg-ember/10 blur-3xl" />
        <div className="absolute left-1/2 top-[12%] h-72 w-72 -translate-x-1/2 rounded-full bg-champagne/30 blur-3xl" />
      </div>

      {/* giant watermark */}
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-14 left-0 select-none whitespace-nowrap font-display text-[19vw] font-semibold italic leading-none text-mocha/[0.045]"
      >
        Serene Feet
      </span>

      <div className="relative mx-auto grid max-w-7xl gap-14 px-5 pb-24 pt-32 sm:px-8 lg:grid-cols-12 lg:gap-6 lg:pb-28 lg:pt-44">
        {/* ── Copy ── */}
        <div className="flex flex-col justify-center lg:col-span-6 xl:col-span-6">
          <Reveal>
            <p className="flex items-center gap-3 text-[0.72rem] font-medium uppercase tracking-[0.34em] text-ember">
              <span className="h-px w-10 bg-ember/70" />
              Reflexology · Foot Rituals · Deep Rest
            </p>
          </Reveal>

          <Reveal delay={120}>
            <h1 className="mt-6 font-display text-[clamp(3rem,7.2vw,5.9rem)] font-medium leading-[0.98] tracking-[-0.015em] text-espresso">
              Step into calm.
              <br />
              <span className="italic text-ember">Walk out lighter.</span>
            </h1>
          </Reveal>

          <Reveal delay={240}>
            <p className="mt-7 max-w-xl text-lg font-light leading-relaxed text-mocha/85">
              Serene Feet Reflexology is a quiet studio devoted to the art of the foot —
              unhurried reflexology, warm botanical soaks, and restorative massage that
              helps you slow down from the ground up.
            </p>
          </Reveal>

          <Reveal delay={360}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <button
                onClick={onBook}
                className="group flex items-center gap-3 rounded-full bg-ember px-8 py-4 text-sm font-medium uppercase tracking-[0.16em] text-cream shadow-[0_18px_40px_-14px_rgba(200,121,44,0.75)] transition-all duration-300 hover:-translate-y-1 hover:bg-ember-deep hover:shadow-[0_26px_50px_-14px_rgba(200,121,44,0.85)]"
              >
                Book a Session
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5"
                  strokeWidth={2}
                />
              </button>
              <button
                onClick={goToSessions}
                className="group flex items-center gap-3 rounded-full border border-mocha/25 bg-transparent px-8 py-4 text-sm font-medium uppercase tracking-[0.16em] text-espresso transition-all duration-300 hover:border-espresso hover:bg-espresso hover:text-champagne"
              >
                Explore Sessions
              </button>
            </div>
          </Reveal>

          <Reveal delay={480}>
            <ul className="mt-12 flex flex-wrap gap-x-7 gap-y-3">
              {TRUST_POINTS.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="flex items-center gap-2 text-[0.83rem] font-medium tracking-wide text-mocha/75"
                >
                  <Icon className="h-4 w-4 text-ember" strokeWidth={1.9} />
                  {label}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* ── Imagery ── */}
        <div className="relative lg:col-span-6">
          <Reveal delay={200} className="relative mx-auto max-w-[520px] lg:ml-auto">
            <div className="relative px-6 pt-10">
              {/* champagne arch outline */}
              <div
                aria-hidden
                className="absolute inset-0 -translate-x-4 -translate-y-2 rounded-b-[2.5rem] rounded-t-[999px] border border-ember/40"
              />
              <div
                aria-hidden
                className="absolute inset-0 translate-x-5 translate-y-4 rounded-b-[2.5rem] rounded-t-[999px] bg-champagne/60"
              />

              <figure className="relative overflow-hidden rounded-b-[2.5rem] rounded-t-[999px] shadow-[0_50px_90px_-40px_rgba(58,43,29,0.55)]">
                <img
                  src={IMAGES.heroMain}
                  alt="Therapist giving a calm, therapeutic foot massage in soft spa light"
                  className="aspect-[3/4.1] w-full object-cover"
                  loading="eager"
                  fetchPriority="high"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-espresso/25 via-transparent to-transparent"
                />
              </figure>

              {/* open-status badge */}
              <div className="absolute -right-2 top-20 hidden animate-float items-center gap-2.5 rounded-full border border-mocha/10 bg-cream/95 py-2.5 pl-3.5 pr-5 shadow-[0_18px_40px_-18px_rgba(58,43,29,0.5)] backdrop-blur sm:flex">
                <span
                  className={`h-2 w-2 rounded-full ${
                    status.open ? "bg-emerald-600" : "bg-ember"
                  } animate-pulse-dot`}
                />
                <span className="text-xs font-medium tracking-wide text-espresso">
                  {status.message}
                </span>
              </div>

              {/* floating ritual card */}
              <div className="absolute -left-4 bottom-14 hidden w-[270px] animate-float-slow items-center gap-3.5 rounded-2xl border border-mocha/10 bg-cream/95 p-3.5 shadow-[0_24px_50px_-20px_rgba(58,43,29,0.55)] backdrop-blur sm:flex">
                <img
                  src={IMAGES.heroAccent}
                  alt="Candlelight and folded towels in the treatment room"
                  className="h-16 w-16 rounded-xl object-cover"
                  loading="lazy"
                />
                <div className="leading-snug">
                  <p className="font-display text-lg font-semibold text-espresso">
                    The Signature Ritual
                  </p>
                  <p className="mt-0.5 text-xs font-medium tracking-wide text-mocha/70">
                    {SESSIONS[0].durationMin} min · warm towels · {formatPrice(SESSIONS[0].price)}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* scroll cue */}
      <div className="relative hidden justify-center pb-10 lg:flex">
        <button
          onClick={goToSessions}
          className="group flex flex-col items-center gap-2 text-mocha/60 transition-colors hover:text-espresso"
          aria-label="Scroll to sessions"
        >
          <span className="text-[0.62rem] font-medium uppercase tracking-[0.4em]">
            Scroll to unwind
          </span>
          <span className="h-10 w-px overflow-hidden">
            <span className="block h-full w-full animate-draw-line bg-ember" />
          </span>
          <ChevronDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-1" />
        </button>
      </div>
    </section>
  );
}
