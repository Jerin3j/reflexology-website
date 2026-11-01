import { ArrowUpRight, Clock, Sparkle } from "lucide-react";
import { BUSINESS, SESSIONS, formatPrice } from "@/data/site";
import { Reveal } from "@/components/Reveal";

interface SessionsProps {
  onBook: (sessionId?: string) => void;
}

export function Sessions({ onBook }: SessionsProps) {
  return (
    <section id="sessions" className="relative scroll-mt-24 bg-cream py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* header */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <div>
              <p className="flex items-center gap-3 text-[0.72rem] font-medium uppercase tracking-[0.34em] text-ember">
                <span className="h-px w-10 bg-ember/70" />
                The Menu
              </p>
              <h2 className="mt-5 max-w-xl font-display text-[clamp(2.4rem,4.6vw,4rem)] font-medium leading-[1.02] text-espresso">
                Sessions shaped around
                <span className="italic text-ember"> your feet.</span>
              </h2>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <p className="max-w-md text-base font-light leading-relaxed text-mocha/80 lg:text-right">
              Every session begins with a warm mineral soak and ends with hot towels and
              a pot of masala chai. Group bookings and gift vouchers available.
            </p>
          </Reveal>
        </div>

        {/* cards */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {SESSIONS.map((session, i) => (
            <Reveal key={session.id} delay={i * 110} className="h-full">
              <article className="group flex h-full flex-col overflow-hidden rounded-[1.9rem] border border-mocha/10 bg-[#fffdf7] shadow-[0_20px_55px_-28px_rgba(58,43,29,0.4)] transition-all duration-500 hover:-translate-y-2.5 hover:shadow-[0_40px_80px_-30px_rgba(58,43,29,0.5)]">
                {/* image */}
                <div className="relative overflow-hidden">
                  <img
                    src={session.image}
                    alt={session.name}
                    loading="lazy"
                    className="aspect-[8/7] w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.08]"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-espresso/45 via-transparent to-transparent opacity-80"
                  />
                  {session.badge && (
                    <span className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-champagne px-3.5 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-espresso shadow-lg">
                      <Sparkle className="h-3 w-3" strokeWidth={2.2} />
                      {session.badge}
                    </span>
                  )}
                  <span className="absolute right-4 top-4 rounded-full bg-cream/95 px-4 py-1.5 font-display text-lg font-semibold text-espresso shadow-lg backdrop-blur">
                    {formatPrice(session.price)}
                  </span>
                  <span className="absolute bottom-4 left-4 flex items-center gap-1.5 rounded-full bg-espresso/55 px-3.5 py-1.5 text-[0.68rem] font-medium uppercase tracking-[0.18em] text-cream backdrop-blur-sm">
                    <Clock className="h-3 w-3" strokeWidth={2.2} />
                    {session.durationMin} minutes
                  </span>
                </div>

                {/* body */}
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-[1.65rem] font-semibold leading-tight text-espresso">
                    {session.name}
                  </h3>
                  <p className="mt-2.5 flex-1 text-sm font-light leading-relaxed text-mocha/80">
                    {session.description}
                  </p>
                  <div className="mt-6 border-t border-mocha/10 pt-5">
                    <button
                      onClick={() => onBook(session.id)}
                      className="flex w-full items-center justify-between rounded-full border border-ember/45 px-5 py-3 text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-ember transition-all duration-300 hover:border-ember hover:bg-ember hover:text-cream"
                      aria-label={`Book ${session.name}`}
                    >
                      Book Now
                      <ArrowUpRight className="h-4 w-4" strokeWidth={2.2} />
                    </button>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <p className="mt-10 text-center text-sm font-light text-mocha/60">
            Not sure where to begin? Call{" "}
            <a href={BUSINESS.phoneHref} className="font-medium text-ember underline-offset-4 hover:underline">
              {BUSINESS.phoneDisplay}
            </a>{" "}
            and we will guide you to the right ritual.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
