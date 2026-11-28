import * as React from "react";
import { motion, useScroll, useSpring, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { FadeIn, NumberTicker, RevealText } from "@/components/motion";

type Item = {
  when: string; org: string; role: string; meta: string; points: string[]; tags: string[];
  fig: { node: React.ReactNode; label: string }; link?: { label: string; href: string }; current?: boolean;
};

const ITEMS: Item[] = [
  {
    when: "Dec 2026 – Jan 2027", org: "Baroda BNP Paribas Mutual Fund", role: "Project Intern, Indian Fixed Income", meta: "Mumbai · Remote", current: true,
    points: [
      "Selected by the CIO (Fixed Income) for an 8-week research project on Indian fixed income markets.",
      "The final report will be presented to the full fixed income team.",
    ],
    tags: ["Fixed income", "G-Secs", "Research"],
    fig: { node: <><NumberTicker value={8} /> wks</>, label: "Research project" },
  },
  {
    when: "Sep – Nov 2026", org: "Kimatsu India", role: "Finance Intern", meta: "Mumbai · Remote",
    points: [
      "Maintained financial records and prepared reports for the Finance & Accounts team over three months.",
      "Assisted with compliance tasks under the reporting manager.",
    ],
    tags: ["Financial records", "Reporting", "Compliance"],
    fig: { node: <><NumberTicker value={3} /> mo</>, label: "Finance & Accounts" },
  },
  {
    when: "Jun – Aug 2026", org: "Springer Capital", role: "Finance Intern", meta: "United States · Remote",
    points: [
      "Organised and maintained financial and investment data and prepared reports for decision support.",
      "Helped with reconciliations, error checks and the review of discrepancies.",
      "Documented finance workflows and reporting processes, with regular progress updates in team meetings.",
    ],
    tags: ["Investment data", "Reconciliation", "Reporting"],
    fig: { node: "US", label: "Investment firm" },
  },
  {
    when: "2025 – 2026", org: "ZEPHYR ’26, TCET", role: "Joint Technical Secretary", meta: "Leadership · Mumbai",
    points: [
      "Managed coordination and all of the financial documentation for the festival.",
      "Built and deployed the festival website, which served 20,000+ visitors a day.",
    ],
    tags: ["Financial documentation", "Coordination", "Web"],
    fig: { node: <><NumberTicker value={7} />k+</>, label: "Footfall" },
    link: { label: "zephyr-tech.in", href: "https://www.zephyr-tech.in/" },
  },
  {
    when: "2025", org: "MumbaiHacks", role: "FinTech track", meta: "Hackathon",
    points: ["Qualified for Round 2 (offline) of India's largest agentic-AI hackathon."],
    tags: ["FinTech"],
    fig: { node: "R2", label: "Qualified" },
  },
];

const EASE = [0.16, 1, 0.3, 1] as const;

function Row({ it }: { it: Item }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className="relative pb-6 last:pb-0"
      initial={reduce ? false : "hidden"} whileInView="show" viewport={{ once: true, margin: "-12% 0px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
    >
      <motion.span
        variants={{ hidden: { scale: 0 }, show: { scale: 1, transition: { type: "spring", stiffness: 260, damping: 18 } } }}
        className="absolute -left-8 top-8 grid size-[15px] place-items-center rounded-full border border-accent bg-bg sm:-left-14 sm:size-[23px]"
      >
        <span className="relative size-[5px] rounded-full bg-accent sm:size-[7px]">
          {it.current && <span className="absolute -inset-1 animate-ping-slow rounded-full bg-accent/60" />}
        </span>
      </motion.span>

      <motion.div
        variants={{ hidden: { opacity: 0, y: 30, scale: 0.985 }, show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.9, ease: EASE } } }}
        className="group grid gap-6 rounded-3xl border border-line bg-surface p-6 transition-[box-shadow,border-color] duration-500 hover:border-ink/20 hover:shadow-[0_30px_60px_-40px_rgba(20,20,19,.4)] sm:p-8 lg:grid-cols-[220px_1fr_auto]"
      >
        <div>
          <div className="text-sm font-medium text-muted tabular">{it.when}</div>
          <div className="mt-1 text-sm text-muted">{it.meta}</div>
          {it.current && (
            <span className="mt-3 inline-flex items-center gap-2 rounded-full bg-ink px-3 py-1 text-xs font-medium text-bg">
              <span className="size-1.5 rounded-full bg-accent" />Current
            </span>
          )}
        </div>
        <div>
          <h3 className="text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">{it.org}</h3>
          <div className="mt-1 text-ink-2">{it.role}</div>
          <ul className="mt-5 space-y-2.5">
            {it.points.map((p) => (
              <motion.li
                key={p}
                variants={{ hidden: { opacity: 0, x: -12 }, show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE } } }}
                className="flex gap-3 text-[15.5px] leading-relaxed text-ink-2"
              >
                <span className="mt-[11px] h-px w-3 shrink-0 bg-accent transition-[width] duration-500 group-hover:w-5" />{p}
              </motion.li>
            ))}
          </ul>
          <div className="mt-5 flex flex-wrap items-center gap-2">
            {it.tags.map((t) => <Badge key={t}>{t}</Badge>)}
            {it.link && (
              <a href={it.link.href} target="_blank" rel="noopener" className="group/l ml-1 inline-flex items-center gap-1 text-sm font-semibold text-accent-ink">
                {it.link.label}<ArrowUpRight className="size-4 transition-transform duration-300 group-hover/l:translate-x-0.5 group-hover/l:-translate-y-0.5" />
              </a>
            )}
          </div>
        </div>
        <div className="lg:text-right">
          <div className="text-5xl font-semibold leading-none tracking-[-0.05em]">{it.fig.node}</div>
          <div className="mt-2 text-sm text-muted">{it.fig.label}</div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Experience() {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 90, damping: 28 });
  return (
    <section id="experience" className="pt-28 sm:pt-36">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <FadeIn><span className="label text-accent-ink">Experience</span></FadeIn>
            <RevealText as="h2" text="Where I've worked." className="mt-4 text-[clamp(38px,5.4vw,76px)] font-semibold leading-[.98] tracking-[-0.05em]" />
          </div>
          <FadeIn delay={0.15}><p className="max-w-sm text-ink-2">Three finance internships in 2026–27, covering investment operations, corporate finance and Indian fixed income.</p></FadeIn>
        </div>

        <div ref={ref} className="relative mt-14 pl-8 sm:pl-14">
          <div className="absolute bottom-0 left-[7px] top-0 w-px bg-line sm:left-[11px]" />
          <motion.div className="absolute left-[7px] top-0 h-full w-px origin-top bg-accent sm:left-[11px]" style={{ scaleY: fill }} />
          {ITEMS.map((it) => <Row key={it.org} it={it} />)}
        </div>
      </div>
    </section>
  );
}
