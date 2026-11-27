import * as React from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform, useReducedMotion } from "motion/react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Magnetic, NumberTicker, RevealText } from "@/components/motion";
import { RESUME } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

function Portrait() {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0), my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), { stiffness: 150, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-9, 9]), { stiffness: 150, damping: 18 });
  function move(e: React.MouseEvent<HTMLDivElement>) {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5); my.set((e.clientY - r.top) / r.height - 0.5);
  }
  const chips = [
    { k: "Isoline", v: <><NumberTicker value={16.7} decimals={1} />k+</>, s: "downloads", cls: "left-3 top-6 sm:-left-14 sm:top-10", d: 0.9 },
    { k: "Latest", v: "Springer", s: "Capital · Finance", cls: "right-3 top-[44%] sm:-right-12", d: 1.05 },
    { k: "CGPA", v: <NumberTicker value={9} decimals={1} />, s: "out of 10", cls: "left-3 top-[40%] sm:-left-10 sm:top-auto sm:bottom-28", d: 1.2 },
  ];
  return (
    <div className="relative mx-auto w-full max-w-[420px] [perspective:1200px]" onMouseMove={move} onMouseLeave={() => { mx.set(0); my.set(0); }}>
      <motion.div style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        initial={{ opacity: 0, y: 40, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 1.2, delay: 0.35, ease: EASE }}
        className="relative">
        <div className="relative overflow-hidden rounded-[32px] border border-line bg-surface p-2 shadow-[0_40px_80px_-40px_rgba(20,20,19,.45)]">
          <img src="assets/profile-photo.png" alt="Shubh Wade" width={402} height={384} className="aspect-[4/4.6] w-full rounded-[26px] object-cover object-[50%_28%]" />
          <div className="absolute inset-x-2 bottom-2 flex items-center justify-between rounded-b-[26px] bg-gradient-to-t from-ink/80 to-transparent px-5 pb-4 pt-16 text-bg">
            <div><div className="text-lg font-semibold tracking-tight">Shubh Wade</div><div className="text-sm text-bone/80">Mumbai, India</div></div>
            <span className="flex items-center gap-2 rounded-full bg-bg/15 px-3 py-1.5 text-xs font-medium backdrop-blur">
              <span className="relative flex size-2"><span className="absolute inline-flex size-full animate-ping-slow rounded-full bg-accent" /><span className="relative inline-flex size-2 rounded-full bg-accent" /></span>
              Available
            </span>
          </div>
        </div>
        {chips.map((c) => (
          <motion.div key={c.k} style={{ translateZ: 60 }}
            initial={{ opacity: 0, y: 16, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.9, delay: c.d, ease: EASE }}
            className={`absolute ${c.cls} rounded-2xl border border-line bg-surface/90 px-4 py-3 shadow-[0_20px_40px_-20px_rgba(20,20,19,.4)] backdrop-blur-xl`}>
            <motion.div animate={reduce ? {} : { y: [0, -6, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: c.d }}>
              <div className="label text-[10px] text-muted">{c.k}</div>
              <div className="mt-0.5 text-xl font-bold tracking-tight">{c.v}</div>
              <div className="text-xs text-muted">{c.s}</div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export function Hero() {
  const ref = React.useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const draw = useTransform(scrollYProgress, [0, 0.8], [0.25, 1]);
  const yText = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} id="top" className="relative overflow-hidden pt-32 pb-20 sm:pt-40 lg:pb-28">
      {/* scroll-drawn market line behind the hero */}
      <svg className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%] w-full" viewBox="0 0 1440 500" preserveAspectRatio="none" aria-hidden>
        <defs>
          <linearGradient id="heroFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ff5b1f" stopOpacity=".10" /><stop offset="1" stopColor="#ff5b1f" stopOpacity="0" /></linearGradient>
        </defs>
        <motion.path d="M0,440 C120,430 180,380 260,392 S400,330 480,340 S600,250 700,280 S860,200 940,214 S1080,120 1180,140 S1340,60 1440,40 L1440,500 L0,500 Z" fill="url(#heroFill)" style={{ opacity: fade }} />
        <motion.path d="M0,440 C120,430 180,380 260,392 S400,330 480,340 S600,250 700,280 S860,200 940,214 S1080,120 1180,140 S1340,60 1440,40"
          fill="none" stroke="#ff5b1f" strokeWidth={2} vectorEffect="non-scaling-stroke" style={{ pathLength: draw, opacity: fade }} />
      </svg>

      <div className="relative mx-auto grid max-w-[1240px] items-center gap-16 px-4 sm:px-8 lg:grid-cols-[1.35fr_1fr]">
        <motion.div style={{ y: yText }}>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE }}>
            <Badge className="gap-2 py-1.5 pl-2 pr-3.5">
              <span className="relative flex size-2"><span className="absolute inline-flex size-full animate-ping-slow rounded-full bg-accent" /><span className="relative inline-flex size-2 rounded-full bg-accent" /></span>
              Open to analyst internships · 2027
            </Badge>
          </motion.div>

          <h1 className="mt-7 text-[clamp(42px,6.1vw,90px)] font-semibold leading-[.95] tracking-[-0.05em]">
            <RevealText text="I turn financial" className="block" delay={0.1} />
            <RevealText text="statements into" className="block" delay={0.25} />
            <span className="block">
              <RevealText text="decisions." className="text-accent" delay={0.4} />
            </span>
          </h1>

          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.7, ease: EASE }}
            className="mt-8 max-w-[540px] text-lg leading-relaxed text-ink-2">
            I'm Shubh, a financial and business analyst in Mumbai. Most recently I was a <span className="font-semibold text-ink">Finance Intern at Springer Capital</span>. I also built <span className="font-semibold text-ink">Isoline</span>, an open-source analysis engine used over 16,000 times.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.85, ease: EASE }} className="mt-10 flex flex-wrap items-center gap-3">
            <Magnetic>
              <Button asChild size="lg" variant="accent">
                <a href="#work">See my work <ArrowDownRight className="transition-transform duration-300 group-hover/btn:rotate-[-45deg]" /></a>
              </Button>
            </Magnetic>
            <Button asChild size="lg" variant="outline">
              <a href={RESUME} target="_blank" rel="noopener">Download résumé <ArrowUpRight /></a>
            </Button>
          </motion.div>
        </motion.div>

        <Portrait />
      </div>
    </section>
  );
}
