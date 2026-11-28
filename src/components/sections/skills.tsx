import { FadeIn, RevealText, SpotlightCard } from "@/components/motion";

const GROUPS = [
  {
    title: "Financial analysis", span: "lg:col-span-2", dark: true,
    items: [["Financial statement analysis", ""], ["Valuation ratios", ""], ["Piotroski · Altman · Beneish", ""], ["Reconciliation", ""], ["XIRR · CAGR", ""], ["Indian fixed income", ""]],
  },
  {
    title: "Reporting & visualisation", items: [["Power BI", ""], ["Tableau", ""], ["Plotly · Streamlit", ""], ["Excel dashboards", ""]],
  },
  {
    title: "Data analysis", items: [["SQL: CTEs, window functions", ""], ["Python: Pandas, NumPy, SciPy", ""], ["Advanced Excel", ""], ["R", ""]],
  },
  {
    title: "Analytical methods", span: "lg:col-span-2",
    items: [["Data cleaning & EDA", ""], ["KPI reporting", ""], ["Descriptive statistics", ""], ["Forecasting", ""], ["Root-cause analysis", ""], ["Process documentation", ""]],
  },
] as const;

export function Skills() {
  return (
    <section id="skills" className="pt-28 sm:pt-36">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-8">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <FadeIn><span className="label text-accent-ink">Skills</span></FadeIn>
            <RevealText as="h2" text="What I bring to the desk." className="mt-4 text-[clamp(38px,5.4vw,76px)] font-semibold leading-[.98] tracking-[-0.05em]" />
          </div>
          <FadeIn delay={0.15}><p className="max-w-sm text-ink-2">Finance first, tools second: from a raw annual report to a model to a dashboard someone actually opens.</p></FadeIn>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {GROUPS.map((g, gi) => {
            const dark = "dark" in g && g.dark;
            return (
              <FadeIn key={g.title} delay={gi * 0.08} className={"span" in g ? g.span : ""}>
                <SpotlightCard dark={dark} className="h-full p-7 sm:p-8">
                  <div className={`flex items-baseline justify-between gap-4 text-sm tabular ${dark ? "text-ash" : "text-muted"}`}>
                    <span>0{gi + 1}</span>
                  </div>
                  <h3 className={`mt-6 text-2xl font-semibold tracking-[-0.03em] ${dark ? "text-white" : ""}`}>{g.title}</h3>
                  <ul className={`mt-7 ${"span" in g ? "grid gap-x-10 sm:grid-cols-2" : ""}`}>
                    {g.items.map(([s]) => (
                      <li key={s} className={`border-b py-3 text-[15px] ${dark ? "border-graphite-line text-bone" : "border-line text-ink-2"}`}>{s}</li>
                    ))}
                  </ul>
                </SpotlightCard>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
