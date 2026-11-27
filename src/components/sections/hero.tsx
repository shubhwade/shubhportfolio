import * as React from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Magnetic, RevealText } from "@/components/motion";
import { RESUME } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

/* Smooth closed path through points (Catmull-Rom to Bézier) */
function closedPath(pts: [number, number][]) {
  const n = pts.length;
  let d = `M${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}`;
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n], p1 = pts[i], p2 = pts[(i + 1) % n], p3 = pts[(i + 2) % n];
    const c1x = p1[0] + (p2[0] - p0[0]) / 6, c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6, c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C${c1x.toFixed(1)},${c1y.toFixed(1)} ${c2x.toFixed(1)},${c2y.toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`;
  }
  return d + "Z";
}

/* Topographic contour field: a quiet nod to Isoline */
function Contours() {
  const reduce = useReducedMotion();
  const paths = React.useMemo(() => {
    const out: string[] = [];
    for (let k = 0; k < 18; k++) {
      const pts: [number, number][] = [];
      const base = 34 + k * 30;
      for (let i = 0; i < 48; i++) {
        const t = (i / 48) * Math.PI * 2;
        const r = base * (1 + 0.13 * Math.sin(3 * t + k * 0.45) + 0.07 * Math.sin(5 * t - k * 0.3) + 0.04 * Math.cos(2 * t + k));
        pts.push([500 + r * Math.cos(t) * 1.12, 500 + r * Math.sin(t)]);
      }
      out.push(closedPath(pts));
    }
    return out;
  }, []);

  return (
    <motion.svg
      viewBox="0 0 1000 1000" aria-hidden
      className="pointer-events-none absolute -right-[22%] top-1/2 h-[150%] w-auto -translate-y-1/2 sm:-right-[8%] lg:right-[-4%] lg:h-[135%]"
      style={{ maskImage: "radial-gradient(closest-side, #000 55%, transparent 100%)", WebkitMaskImage: "radial-gradient(closest-side, #000 55%, transparent 100%)" }}
      animate={reduce ? {} : { rotate: 360 }}
      transition={{ duration: 260, repeat: Infinity, ease: "linear" }}
    >
      {paths.map((d, i) => (
        <motion.path
          key={i} d={d} fill="none"
          stroke="#141413" strokeOpacity={i % 4 === 0 ? 0.16 : 0.075} strokeWidth={i % 4 === 0 ? 1.2 : 1}
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: reduce ? 1 : 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2.4, delay: 0.2 + i * 0.07, ease: EASE }}
        />
      ))}
      <motion.circle cx={500} cy={500} r={4} fill="#141413" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.6, duration: 0.6, ease: EASE }} />
    </motion.svg>
  );
}

export function Hero() {
  const ref = React.useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yText = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const yBg = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} id="top" className="relative flex min-h-[92svh] flex-col overflow-hidden pt-32 sm:pt-36">
      <motion.div className="absolute inset-0" style={{ y: yBg, opacity: fade }}>
        <Contours />
      </motion.div>

      <motion.div style={{ y: yText }} className="relative mx-auto flex w-full max-w-[1240px] flex-1 flex-col justify-center px-4 pb-16 sm:px-8">
        <motion.p
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: EASE }}
          className="flex items-center gap-3 text-sm font-medium text-ink-2"
        >
          <span className="h-px w-8 bg-ink/40" />
          Shubh Wade · Financial Analyst, Mumbai
        </motion.p>

        <h1 className="mt-8 max-w-[15ch] text-[clamp(44px,6.6vw,100px)] font-semibold leading-[.98] tracking-[-0.05em]">
          <RevealText text="I turn financial statements" className="block" delay={0.15} />
          <RevealText text="into decisions." className="block text-[#a29e96]" delay={0.4} />
        </h1>

        <div className="mt-12 flex flex-col gap-10 sm:mt-14 lg:flex-row lg:items-end lg:justify-between">
          <motion.p
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.75, ease: EASE }}
            className="max-w-[460px] text-[17px] leading-relaxed text-ink-2"
          >
            Most recently a Finance Intern at Springer Capital. I also built Isoline, an open-source financial statement engine with more than 16,000 downloads.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.9, ease: EASE }}
            className="flex flex-wrap items-center gap-3"
          >
            <Magnetic strength={0.25}>
              <Button asChild size="lg" className="pl-7 pr-2 hover:bg-ink hover:text-bg">
                <a href="#work">
                  View selected work
                  <span className="ml-2 grid size-9 place-items-center rounded-full bg-bg text-ink transition-transform duration-500 ease-out-expo group-hover/btn:translate-x-1">
                    <ArrowRight className="size-4" />
                  </span>
                </a>
              </Button>
            </Magnetic>
            <Button asChild size="lg" variant="ghost" className="px-5">
              <a href={RESUME} target="_blank" rel="noopener">
                Résumé <ArrowUpRight className="transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
              </a>
            </Button>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.2 }}
        className="relative mx-auto w-full max-w-[1240px] px-4 sm:px-8"
      >
        <div className="mb-10 flex items-center justify-between border-t border-line py-5 text-sm text-muted sm:mb-14">
          <span>Equity research · Valuation · Financial reporting</span>
          <span className="hidden items-center gap-3 sm:flex">
            Scroll
            <span className="relative h-8 w-px overflow-hidden bg-line">
              <motion.span className="absolute inset-x-0 top-0 h-3 bg-ink" animate={{ y: [-12, 32] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }} />
            </span>
          </span>
        </div>
      </motion.div>
    </section>
  );
}
