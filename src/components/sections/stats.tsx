import { FadeIn, Marquee, NumberTicker } from "@/components/motion";

const STATS = [
  { v: 16.7, d: 1, s: "k+", label: "Isoline downloads on PyPI" },
  { v: 5, d: 0, s: "", label: "Live finance products" },
  { v: 7, d: 0, s: "k+", label: "ZEPHYR ’26 footfall" },
  { v: 9.0, d: 1, s: "", label: "CGPA out of 10" },
];

const TOOLS = ["Financial statements", "DCF", "Power BI", "SQL", "Piotroski F", "Python", "Altman Z″", "Excel", "Beneish M", "Tableau", "XIRR", "Duration", "Pandas", "BRDs"];

export function Stats() {
  return (
    <section aria-label="Highlights" className="relative">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-8">
        <div className="grid grid-cols-2 overflow-hidden rounded-3xl border border-line bg-surface lg:grid-cols-4">
          {STATS.map((s, i) => (
            <FadeIn key={s.label} delay={i * 0.08} className={`p-6 sm:p-8 ${i % 2 ? "border-l border-line" : ""} ${i > 1 ? "border-t border-line lg:border-t-0" : ""} ${i === 2 ? "lg:border-l" : ""}`}>
              <div className="text-[clamp(40px,4.6vw,64px)] font-semibold leading-none tracking-[-0.05em]">
                <NumberTicker value={s.v} decimals={s.d} suffix={s.s} />
              </div>
              <div className="mt-3 text-sm text-muted">{s.label}</div>
            </FadeIn>
          ))}
        </div>
      </div>
      <div className="mt-16 sm:mt-20">
        <Marquee duration={45}>
          {TOOLS.map((t) => (
            <span key={t} className="flex items-center gap-12 text-[clamp(28px,3.6vw,48px)] font-semibold tracking-[-0.04em] text-ink/85">
              {t}<span className="size-2.5 rotate-45 bg-accent" />
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
