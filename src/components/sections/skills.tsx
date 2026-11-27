import { BarChart3, Calculator, Database, FileText } from "lucide-react";
import { FadeIn, RevealText, SpotlightCard } from "@/components/motion";

const GROUPS = [
  {
    icon: Calculator, title: "Financial analysis", span: "lg:col-span-2", dark: true,
    items: [["Financial statement analysis", "Isoline"], ["Piotroski · Altman · Beneish", "Isoline"], ["DCF & valuation multiples", "Isoline"], ["Yield, duration & bond pricing", "YieldLens"], ["XIRR, SIP & fund analytics", "IndiaFin"]],
  },
  {
    icon: BarChart3, title: "Reporting & BI", items: [["Power BI dashboards", "Springer"], ["Tableau", ""], ["Plotly · Streamlit", "IndiaFin"], ["KPI design", "Springer"]],
  },
  {
    icon: Database, title: "Data", items: [["SQL: CTEs, window functions", ""], ["Python: Pandas, NumPy", ""], ["Advanced Excel", ""], ["R", ""]],
  },
  {
    icon: FileText, title: "Business analysis", span: "lg:col-span-2",
    items: [["Requirements & BRDs", "Springer"], ["Data validation & root cause", "Springer"], ["Budgeting & reconciliation", "ZEPHYR ’26"], ["Process & gap mapping", "Springer"]],
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
          <FadeIn delay={0.15}><p className="max-w-sm text-ink-2">Each skill is tagged with the project or role where I used it.</p></FadeIn>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {GROUPS.map((g, gi) => {
            const dark = "dark" in g && g.dark;
            return (
              <FadeIn key={g.title} delay={gi * 0.08} className={"span" in g ? g.span : ""}>
                <SpotlightCard dark={dark} className="h-full p-7 sm:p-8">
                  <div className="flex items-center gap-3">
                    <span className={`grid size-10 place-items-center rounded-xl ${dark ? "bg-accent text-white" : "bg-accent-soft text-accent-ink"}`}><g.icon className="size-5" /></span>
                    <h3 className={`text-xl font-semibold tracking-[-0.02em] ${dark ? "text-white" : ""}`}>{g.title}</h3>
                  </div>
                  <ul className={`mt-7 ${"span" in g ? "grid gap-x-10 sm:grid-cols-2" : ""}`}>
                    {g.items.map(([s, proof]) => (
                      <li key={s} className={`flex items-center justify-between gap-4 border-b py-3 text-[15px] ${dark ? "border-graphite-line text-bone" : "border-line text-ink-2"}`}>
                        <span>{s}</span>
                        {proof && <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${dark ? "bg-graphite-2 text-accent" : "bg-bg text-accent-ink"}`}>{proof}</span>}
                      </li>
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
