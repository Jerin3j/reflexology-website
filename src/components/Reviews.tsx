import { Quote, Star, StarHalf, Asterisk } from "lucide-react";
import { REVIEWS_NOTE, TESTIMONIALS, type Testimonial } from "@/data/site";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/utils/cn";

function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-1" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => {
        const filled = rating >= i + 1;
        const half = !filled && rating > i;
        return filled ? (
          <Star key={i} className="h-3.5 w-3.5 fill-champagne text-champagne" strokeWidth={1.5} />
        ) : half ? (
          <StarHalf key={i} className="h-3.5 w-3.5 fill-champagne text-champagne" strokeWidth={1.5} />
        ) : (
          <Star key={i} className="h-3.5 w-3.5 text-champagne/30" strokeWidth={1.5} />
        );
      })}
    </span>
  );
}

function ReviewCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="flex w-[320px] shrink-0 flex-col rounded-[1.6rem] border border-cream/10 bg-cream/[0.055] p-7 backdrop-blur-sm transition-colors duration-500 hover:border-champagne/30 hover:bg-cream/[0.09] sm:w-[400px]">
      <div className="flex items-center justify-between">
        <Stars rating={testimonial.rating} />
        <Quote className="h-5 w-5 text-champagne/40" strokeWidth={1.5} />
      </div>
      <blockquote className="mt-5 flex-1 font-display text-[1.28rem] font-medium italic leading-snug text-cream/90">
        “{testimonial.quote}”
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3.5 border-t border-cream/10 pt-5">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-champagne font-display text-sm font-semibold text-espresso">
          {testimonial.initials}
        </span>
        <span className="flex-1 leading-tight">
          <span className="block text-sm font-medium tracking-wide text-cream">
            {testimonial.name}
          </span>
          <span className="block text-xs font-light text-cream/55">{testimonial.context}</span>
        </span>
        <span className="rounded-full border border-cream/15 px-2.5 py-1 text-[0.6rem] font-medium uppercase tracking-[0.16em] text-cream/45">
          Sample
        </span>
      </figcaption>
    </figure>
  );
}

export function Reviews() {
  const rowA = TESTIMONIALS.slice(0, 3);
  const rowB = TESTIMONIALS.slice(3);
  const loopA = [...rowA, ...rowA, ...rowA, ...rowA];
  const loopB = [...rowB, ...rowB, ...rowB, ...rowB];

  return (
    <section id="reviews" className="relative scroll-mt-24 overflow-hidden bg-espresso py-24 sm:py-32">
      {/* ambient glows + watermark */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/4 h-[26rem] w-[26rem] rounded-full bg-ember/15 blur-3xl" />
        <div className="absolute bottom-[-30%] right-[-5%] h-[28rem] w-[28rem] rounded-full bg-champagne/10 blur-3xl" />
        <span className="absolute -top-10 right-6 select-none font-display text-[16rem] leading-none text-cream/[0.04]">
          ”
        </span>
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col items-start gap-10 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <div>
              <p className="flex items-center gap-3 text-[0.72rem] font-medium uppercase tracking-[0.34em] text-champagne">
                <span className="h-px w-10 bg-champagne/70" />
                Kind Words
              </p>
              <h2 className="mt-5 max-w-xl font-display text-[clamp(2.4rem,4.6vw,4rem)] font-medium leading-[1.02] text-cream">
                What guests whisper
                <span className="italic text-champagne"> on their way out.</span>
              </h2>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <div className="flex items-center gap-5 rounded-3xl border border-cream/10 bg-cream/[0.05] px-7 py-5 backdrop-blur-sm">
              <span className="font-display text-6xl font-semibold leading-none text-champagne">
                4.9
              </span>
              <span>
                <Stars rating={5} />
                <span className="mt-1.5 block text-xs font-light text-cream/60">
                  Placeholder aggregate rating
                </span>
              </span>
            </div>
          </Reveal>
        </div>
      </div>

      {/* marquee rows */}
      <Reveal delay={200} className="relative mt-14">
        <div className="space-y-6 [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
          <div className="flex w-max animate-marquee-slow gap-6 pr-6 hover:[animation-play-state:paused]">
            {loopA.map((t, i) => (
              <ReviewCard key={`a-${i}`} testimonial={t} />
            ))}
          </div>
          <div className="flex w-max animate-marquee-reverse gap-6 pr-6 hover:[animation-play-state:paused]">
            {loopB.map((t, i) => (
              <ReviewCard key={`b-${i}`} testimonial={t} />
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal delay={120}>
        <p
          className={cn(
            "relative mx-auto mt-12 flex max-w-2xl items-start justify-center gap-2.5 px-6",
            "text-center text-[0.82rem] font-light leading-relaxed text-cream/50"
          )}
        >
          <Asterisk className="mt-0.5 h-3.5 w-3.5 shrink-0 text-champagne/70" strokeWidth={2} />
          {REVIEWS_NOTE}
        </p>
      </Reveal>
    </section>
  );
}
