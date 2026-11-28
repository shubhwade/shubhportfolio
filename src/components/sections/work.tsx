import * as React from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RevealText, FadeIn } from "@/components/motion";
import { Candles, CycleGauge, Heatmap, ScoreDials, YieldCurve } from "@/components/viz";

type Project = {
  name: string; sector: string; blurb: string; metric: string; metricLabel: string;
  tags: string[]; links: { label: string; href: string; primary?: boolean }[]; Viz: React.FC;
};

const PROJECTS: Project[] = [
  {
    name: "Isoline", sector: "Equity research · Open source",
    blurb: "A Python package and six-command CLI that analyses the financial statements of any listed stock: valuation (P/E, P/B, EV/EBITDA), financial health (Piotroski F-score, Altman Z-score) and earnings quality (Beneish M-score). It adds peer comparison, sector screening, rule-based analyst briefs and an MCP server for AI tools.",
    metric: "17.5k+", metricLabel: "downloads · 25+ releases", tags: ["Python", "Financial statements", "Valuation", "Open source"],
    links: [{ label: "Visit site", href: "https://isolinee.vercel.app", primary: true }, { label: "PyPI", href: "https://pypi.org/project/isoline/" }, { label: "GitHub", href: "https://github.com/shubhwade/isoline" }],
    Viz: ScoreDials,
  },
  {
    name: "IndiaFin Intelligence", sector: "Indian markets",
    blurb: "One dashboard for Indian markets, built on AMFI, RBI DBIE and NSE data. It covers mutual fund heatmaps, a NAV explorer, a SIP simulator with an XIRR engine, the G-Sec yield curve and how RBI rate cycles have moved the Nifty.",
    metric: "5", metricLabel: "analytics modules", tags: ["Plotly", "Streamlit", "XIRR", "Mutual funds"],
    links: [{ label: "Open app", href: "https://indiafin-intelligence.streamlit.app/", primary: true }],
    Viz: Heatmap,
  },
  {
    name: "YieldLens", sector: "Fixed income",
    blurb: "Bond analytics for investors who don't have a Bloomberg terminal. It handles pricing, yield and duration maths, strategy backtests and AI-assisted credit research, all on free public data from FRED and Alpha Vantage.",
    metric: "₹0", metricLabel: "data cost", tags: ["Next.js", "Flask", "Duration", "Backtesting"],
    links: [{ label: "Open app", href: "https://yieldtest-eight.vercel.app/", primary: true }],
    Viz: YieldCurve,
  },
  {
    name: "Economic Verdict", sector: "Macro research",
    blurb: "Reads inflation, growth, rates and currency data, then gives a clear call on where the cycle is, so the macro context is ready before an equity decision.",
    metric: "1", metricLabel: "clear verdict on the cycle", tags: ["Macro", "AI", "Streamlit"],
    links: [{ label: "Open app", href: "https://economic-verdict-2tsd8beh2g8tnx8skhqhy3.streamlit.app/", primary: true }],
    Viz: CycleGauge,
  },
  {
    name: "LearnVestX", sector: "Investor education",
    blurb: "A trading simulator for Indian equities. Learners get ₹1,00,000 in virtual capital, trade 15+ NSE stocks, track their P&L and work through 30+ lessons and challenges.",
    metric: "₹1L", metricLabel: "virtual capital per learner", tags: ["Next.js", "PostgreSQL", "Prisma", "Recharts"],
    links: [{ label: "Open app", href: "https://learnvestx.vercel.app/", primary: true }],
    Viz: Candles,
  },
];

function ProjectCard({ p, i, n, progress }: { p: Project; i: number; n: number; progress: MotionValue<number> }) {
  const target = 1 - (n - 1 - i) * 0.035;
  const scale = useTransform(progress, [i / n, 1], [1, target]);
  const dim = useTransform(progress, [i / n, (i + 1) / n], [0, i === n - 1 ? 0 : 0.35]);
  const Viz = p.Viz;
  return (
    <div className={i === n - 1 ? "md:sticky" : "md:sticky md:h-[72vh] md:min-h-[580px]"} style={{ top: `calc(96px + ${i * 18}px)` }}>
      <motion.article style={{ scale }} className="grain relative mb-6 origin-top overflow-hidden rounded-[32px] border border-graphite-line bg-graphite text-bone shadow-[0_40px_80px_-50px_rgba(20,20,19,.8)] md:mb-0">
        <motion.div className="pointer-events-none absolute inset-0 z-10 bg-black" style={{ opacity: dim }} />
        <div className="grid gap-0 lg:grid-cols-[1fr_1.1fr]">
          <div className="flex flex-col p-7 sm:p-10">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-ash tabular">0{i + 1} / 0{n}</span>
              <Badge variant="dark">{p.sector}</Badge>
            </div>
            <h3 className="mt-6 text-[clamp(36px,4.2vw,58px)] font-semibold leading-[.98] tracking-[-0.045em] text-white">{p.name}</h3>
            <p className="mt-5 max-w-[48ch] text-[15.5px] leading-relaxed text-bone/75">{p.blurb}</p>
            <div className="mt-8 flex items-end gap-4 border-t border-graphite-line pt-6">
              <span className="text-[clamp(40px,4vw,56px)] font-semibold leading-none tracking-[-0.05em] text-accent tabular">{p.metric}</span>
              <span className="pb-1.5 text-sm text-ash">{p.metricLabel}</span>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {p.tags.map((t) => <span key={t} className="rounded-full border border-graphite-line px-3 py-1 text-xs text-bone/70">{t}</span>)}
            </div>
            <div className="mt-8 flex flex-wrap gap-2.5 lg:mt-auto lg:pt-8">
              {p.links.map((l) => (
                <Button key={l.label} asChild size="sm" variant={l.primary ? "accent" : "dark"}>
                  <a href={l.href} target="_blank" rel="noopener">{l.label}<ArrowUpRight className="transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" /></a>
                </Button>
              ))}
            </div>
          </div>
          <div className="relative m-3 mt-0 flex min-h-[230px] items-center justify-center overflow-hidden rounded-[24px] border border-graphite-line bg-graphite-2 p-6 sm:p-10 lg:m-3 lg:min-h-[460px]">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_70%_20%,rgba(255,91,31,.10),transparent_70%)]" />
            <div className="relative h-full max-h-[300px] w-full"><Viz /></div>
          </div>
        </div>
      </motion.article>
    </div>
  );
}

export function Work() {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  return (
    <section id="work" className="pt-28 sm:pt-36">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-8">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <FadeIn><span className="label text-accent-ink">Selected work</span></FadeIn>
            <RevealText as="h2" text="Finance tools I've built." className="mt-4 text-[clamp(38px,5.4vw,76px)] font-semibold leading-[.98] tracking-[-0.05em]" />
          </div>
          <FadeIn delay={0.15}><p className="max-w-sm text-ink-2">Each one started as a question I had as an analyst. All five are live, so you can open one and try it.</p></FadeIn>
        </div>
        <div ref={ref}>
          {PROJECTS.map((p, i) => <ProjectCard key={p.name} p={p} i={i} n={PROJECTS.length} progress={scrollYProgress} />)}
        </div>
      </div>
    </section>
  );
}
