import * as React from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { FadeIn, NumberTicker, RevealText } from "@/components/motion";

const ITEMS = [
  {
    when: "Aug – Oct 2026", org: "Springer Capital", role: "Finance Intern", meta: "Remote · United States",
    points: [
      "Built Power BI dashboards that tracked portfolio KPIs, fund performance and core investment metrics.",
      "Validated financial datasets and traced root causes, which cut reporting discrepancies across internal systems.",
      "Gathered requirements from finance and operations and wrote the BRDs for changes to investment workflows.",
    ],
    tags: ["Power BI", "Portfolio KPIs", "SQL", "BRDs"],
    fig: { node: "US", label: "Investment firm" },
  },
  {
    when: "2025 – 2026", org: "ZEPHYR ’26, TCET", role: "Joint Technical Secretary", meta: "Extracurricular · Mumbai",
    points: [
      "Built the official festival website and kept it running through the event.",
      "Handled all of the fest's finances, covering budgets, vendor payments and reconciliation across every team.",
    ],
    tags: ["Budgeting", "Reconciliation", "Web"],
    fig: { node: <><NumberTicker value={7} />k+</>, label: "Footfall" },
    link: { label: "zephyr-tech.in", href: "https://www.zephyr-tech.in/" },
  },
  {
    when: "2025", org: "MumbaiHacks", role: "FinTech track", meta: "Hackathon",
    points: ["Made Round 2 (offline) of India's largest agentic-AI hackathon."],
    tags: ["FinTech"],
    fig: { node: "R2", label: "Qualified" },
  },
];

export function Experience() {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return (
    <section id="experience" className="pt-28 sm:pt-36">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-8">
        <FadeIn><span className="label text-accent-ink">Experience</span></FadeIn>
        <RevealText as="h2" text="Where I've worked." className="mt-4 text-[clamp(38px,5.4vw,76px)] font-semibold leading-[.98] tracking-[-0.05em]" />

        <div ref={ref} className="relative mt-14 pl-8 sm:pl-14">
          <div className="absolute bottom-0 left-[7px] top-0 w-px bg-line sm:left-[11px]" />
          <motion.div className="absolute left-[7px] top-0 w-px origin-top bg-accent sm:left-[11px]" style={{ scaleY: fill, height: "100%" }} />
          {ITEMS.map((it) => (
            <FadeIn key={it.org} delay={0.05} className="relative pb-14 last:pb-0">
              <span className="absolute -left-8 top-2 grid size-[15px] place-items-center rounded-full border border-accent bg-bg sm:-left-14 sm:size-[23px]">
                <span className="size-[5px] rounded-full bg-accent sm:size-[7px]" />
              </span>
              <div className="grid gap-6 rounded-3xl border border-line bg-surface p-6 transition-shadow duration-500 hover:shadow-[0_30px_60px_-40px_rgba(20,20,19,.4)] sm:p-8 lg:grid-cols-[220px_1fr_auto]">
                <div>
                  <div className="text-sm font-medium text-muted tabular">{it.when}</div>
                  <div className="mt-1 text-sm text-muted">{it.meta}</div>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">{it.org}</h3>
                  <div className="mt-1 text-ink-2">{it.role}</div>
                  <ul className="mt-5 space-y-2.5">
                    {it.points.map((p) => (
                      <li key={p} className="flex gap-3 text-[15.5px] leading-relaxed text-ink-2"><span className="mt-[11px] h-px w-3 shrink-0 bg-accent" />{p}</li>
                    ))}
                  </ul>
                  <div className="mt-5 flex flex-wrap items-center gap-2">
                    {it.tags.map((t) => <Badge key={t}>{t}</Badge>)}
                    {it.link && (
                      <a href={it.link.href} target="_blank" rel="noopener" className="group ml-1 inline-flex items-center gap-1 text-sm font-semibold text-accent-ink">
                        {it.link.label}<ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>
                    )}
                  </div>
                </div>
                <div className="lg:text-right">
                  <div className="text-5xl font-semibold leading-none tracking-[-0.05em]">{it.fig.node}</div>
                  <div className="mt-2 text-sm text-muted">{it.fig.label}</div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
