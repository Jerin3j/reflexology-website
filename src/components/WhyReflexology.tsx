import { Footprints, Info } from "lucide-react";
import { BENEFITS, IMAGES, WELLNESS_DISCLAIMER } from "@/data/site";
import { Reveal } from "@/components/Reveal";

function CircularBadge() {
  return (
    <div className="absolute -left-6 top-8 hidden h-32 w-32 items-center justify-center sm:flex lg:-left-12">
      <div aria-hidden className="absolute inset-0 animate-spin-slower">
        <svg viewBox="0 0 120 120" className="h-full w-full">
          <defs>
            <path
              id="badge-circle"
              d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0"
              fill="none"
            />
          </defs>
          <text className="fill-espresso" style={{ fontSize: 9.6, letterSpacing: 3.1, fontWeight: 600 }}>
            <textPath href="#badge-circle">
              SERENE FEET · REFLEXOLOGY · STEP SOFTLY ·
            </textPath>
          </text>
        </svg>
      </div>
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-ember text-cream shadow-[0_16px_34px_-12px_rgba(200,121,44,0.8)]">
        <Footprints className="h-6 w-6" strokeWidth={1.8} />
      </span>
    </div>
  );
}

export function WhyReflexology() {
  return (
    <section id="why" className="grain relative scroll-mt-24 overflow-hidden bg-sand py-24 sm:py-32">
      {/* watermark */}
      <span
        aria-hidden
        className="pointer-events-none absolute -right-10 top-10 select-none font-display text-[13rem] font-semibold italic leading-none text-mocha/[0.05]"
      >
        &amp;
      </span>

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-5 sm:px-8 lg:grid-cols-2 lg:gap-12">
        {/* ── Visual ── */}
        <Reveal className="relative">
          <div className="relative ml-auto max-w-[500px]">
            <CircularBadge />
            <div
              aria-hidden
              className="absolute -left-6 -top-6 h-40 w-40 rounded-full bg-champagne/70 blur-2xl"
            />
            <figure className="relative w-[86%] overflow-hidden rounded-[2.6rem] shadow-[0_50px_90px_-42px_rgba(58,43,29,0.55)]">
              <img
                src={IMAGES.ritualMain}
                alt="A reflexologist massaging a guest's foot in a calm, candlelit room"
                loading="lazy"
                className="aspect-[4/5] w-full object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-espresso/25 via-transparent to-transparent"
              />
            </figure>
            <figure className="absolute -bottom-10 right-0 w-52 rotate-[4deg] overflow-hidden rounded-2xl border-[6px] border-cream shadow-[0_26px_50px_-22px_rgba(58,43,29,0.5)] transition-transform duration-700 hover:rotate-0">
              <img
                src={IMAGES.ritualAccent}
                alt="Feet resting in a mineral salt foot soak"
                loading="lazy"
                className="aspect-[4/3] w-full object-cover"
              />
            </figure>
          </div>
        </Reveal>

        {/* ── Copy + benefits ── */}
        <div>
          <Reveal>
            <p className="flex items-center gap-3 text-[0.72rem] font-medium uppercase tracking-[0.34em] text-ember">
              <span className="h-px w-10 bg-ember/70" />
              The Practice
            </p>
            <h2 className="mt-5 font-display text-[clamp(2.4rem,4.6vw,4rem)] font-medium leading-[1.02] text-espresso">
              An ancient pause for
              <span className="italic text-ember"> modern feet.</span>
            </h2>
            <p className="mt-6 max-w-xl text-base font-light leading-relaxed text-mocha/85">
              Reflexology is the practice of applying gentle, targeted pressure to specific
              points on the feet. Guests come to us to trade noise for stillness — a chair
              that reclines just so, water that runs warm, and an hour that belongs
              entirely to them.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {BENEFITS.map((benefit, i) => (
              <Reveal key={benefit.title} delay={i * 100} className="h-full">
                <div className="group h-full rounded-3xl border border-mocha/10 bg-cream/80 p-6 transition-all duration-500 hover:-translate-y-1.5 hover:border-ember/30 hover:shadow-[0_28px_55px_-26px_rgba(58,43,29,0.45)]">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-champagne/70 text-ember transition-all duration-500 group-hover:bg-ember group-hover:text-cream">
                    <benefit.icon className="h-5 w-5" strokeWidth={1.8} />
                  </span>
                  <h3 className="mt-4 font-display text-xl font-semibold text-espresso">
                    {benefit.title}
                  </h3>
                  <p className="mt-1.5 text-sm font-light leading-relaxed text-mocha/80">
                    {benefit.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={220}>
            <div className="mt-8 flex items-start gap-3.5 rounded-2xl border border-champagne-deep/50 bg-champagne/35 p-5">
              <Info className="mt-0.5 h-4.5 w-4.5 shrink-0 text-ember" strokeWidth={2} />
              <p className="text-[0.83rem] font-light leading-relaxed text-mocha/85">
                {WELLNESS_DISCLAIMER}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
