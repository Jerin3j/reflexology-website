import { MARQUEE_ITEMS } from "@/data/site";

export function Marquee() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div
      className="relative overflow-hidden border-y border-espresso/20 bg-espresso py-4"
      aria-label="Studio highlights"
    >
      <div className="flex w-max animate-marquee items-center gap-10 hover:[animation-play-state:paused]">
        {items.map((item, i) => (
          <span key={i} className="flex items-center gap-10">
            <span className="whitespace-nowrap text-[0.78rem] font-medium uppercase tracking-[0.32em] text-champagne">
              {item}
            </span>
            <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-ember" />
          </span>
        ))}
      </div>
    </div>
  );
}
