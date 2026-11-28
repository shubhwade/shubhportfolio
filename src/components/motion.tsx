import * as React from "react";
import { motion, useAnimationFrame, useInView, useMotionValue, useScroll, useSpring, useTransform, useReducedMotion, useVelocity, type Variants } from "motion/react";
import { cn } from "@/lib/utils";

/* Word-by-word reveal with blur, for headlines */
export function RevealText({ text, className, delay = 0, as = "span" }: { text: string; className?: string; delay?: number; as?: "span" | "h1" | "h2" }) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  const Tag = motion[as];
  const container: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: delay } } };
  const word: Variants = {
    hidden: { y: "110%", opacity: 0, filter: "blur(8px)" },
    show: { y: "0%", opacity: 1, filter: "blur(0px)", transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
  };
  return (
    <Tag className={className} variants={container} initial={reduce ? "show" : "hidden"} whileInView="show" viewport={{ once: true, margin: "-10% 0px" }} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom" aria-hidden>
          <motion.span className="inline-block" variants={word}>{w}</motion.span>
          {i < words.length - 1 && " "}
        </span>
      ))}
    </Tag>
  );
}

/* Fade-up on scroll */
export function FadeIn({ children, className, delay = 0, y = 24 }: { children: React.ReactNode; className?: string; delay?: number; y?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* Spring-driven number ticker */
export function NumberTicker({ value, decimals = 0, prefix = "", suffix = "", className }: { value: number; decimals?: number; prefix?: string; suffix?: string; className?: string }) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-5% 0px" });
  const reduce = useReducedMotion();
  const mv = useMotionValue(reduce ? value : 0);
  const spring = useSpring(mv, { damping: 40, stiffness: 90 });
  const text = useTransform(spring, (v) => prefix + v.toFixed(decimals) + suffix);
  React.useEffect(() => { if (inView) mv.set(value); }, [inView, mv, value]);
  return <motion.span ref={ref} className={cn("tabular", className)}>{text}</motion.span>;
}

/* Magnetic hover wrapper */
export function Magnetic({ children, strength = 0.35, className }: { children: React.ReactNode; strength?: number; className?: string }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const x = useSpring(0, { stiffness: 200, damping: 15, mass: 0.4 });
  const y = useSpring(0, { stiffness: 200, damping: 15, mass: 0.4 });
  const reduce = useReducedMotion();
  function move(e: React.MouseEvent) {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  }
  return (
    <motion.div ref={ref} className={cn("inline-flex", className)} style={{ x, y }} onMouseMove={move} onMouseLeave={() => { x.set(0); y.set(0); }}>
      {children}
    </motion.div>
  );
}

/* Card with a cursor-following spotlight */
export function SpotlightCard({ children, className, dark = false }: { children: React.ReactNode; className?: string; dark?: boolean }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [pos, setPos] = React.useState({ x: -400, y: -400 });
  return (
    <div
      ref={ref}
      onMouseMove={(e) => { const r = ref.current!.getBoundingClientRect(); setPos({ x: e.clientX - r.left, y: e.clientY - r.top }); }}
      onMouseLeave={() => setPos({ x: -400, y: -400 })}
      className={cn("group relative overflow-hidden rounded-3xl border transition-colors duration-500", dark ? "border-graphite-line bg-graphite" : "border-line bg-surface", className)}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: `radial-gradient(420px circle at ${pos.x}px ${pos.y}px, ${dark ? "rgba(255,91,31,.16)" : "rgba(255,91,31,.10)"}, transparent 60%)` }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
}

/* Infinite marquee */
export function Marquee({ children, className, duration = 40 }: { children: React.ReactNode; className?: string; duration?: number }) {
  return (
    <div className={cn("group flex overflow-hidden [--gap:3rem] [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]", className)} style={{ ["--duration" as string]: `${duration}s` }}>
      {[0, 1].map((k) => (
        <div key={k} aria-hidden={k === 1} className="flex shrink-0 animate-marquee items-center gap-[var(--gap)] pr-[var(--gap)] group-hover:[animation-play-state:paused]">
          {children}
        </div>
      ))}
    </div>
  );
}

/* Marquee whose speed and lean respond to scroll velocity */
export function VelocityMarquee({ children, baseVelocity = -2.2, className }: { children: React.ReactNode; baseVelocity?: number; className?: string }) {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { damping: 50, stiffness: 300 });
  const factor = useTransform(smooth, [-1500, 0, 1500], [-4, 0, 4], { clamp: false });
  const skew = useTransform(smooth, [-2000, 0, 2000], [6, 0, -6]);
  const base = useMotionValue(0);
  const dir = React.useRef(1);
  const x = useTransform(base, (v) => `${wrap(-50, 0, v)}%`);
  useAnimationFrame((_, delta) => {
    if (reduce) return;
    let move = dir.current * baseVelocity * (delta / 1000);
    const f = factor.get();
    if (f < 0) dir.current = -1; else if (f > 0) dir.current = 1;
    move += dir.current * move * f;
    base.set(base.get() + move);
  });
  return (
    <div className={cn("overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]", className)}>
      <motion.div className="flex w-max flex-nowrap" style={{ x, skewX: skew }}>
        <div className="flex shrink-0 items-center gap-12 pr-12">{children}</div>
        <div aria-hidden className="flex shrink-0 items-center gap-12 pr-12">{children}</div>
      </motion.div>
    </div>
  );
}

function wrap(min: number, max: number, v: number) {
  const r = max - min;
  return ((((v - min) % r) + r) % r) + min;
}

/* Soft trailing cursor ring for fine pointers; grows over interactive elements */
export function CursorRing() {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = React.useState(false);
  const [state, setState] = React.useState<"idle" | "link" | "hidden">("hidden");
  const x = useMotionValue(-100), y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 420, damping: 38, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 420, damping: 38, mass: 0.6 });

  React.useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine || reduce) return;
    setEnabled(true);
    const move = (e: PointerEvent) => {
      x.set(e.clientX); y.set(e.clientY);
      const t = e.target as HTMLElement | null;
      setState(t?.closest("a, button, [role='tab'], input, textarea") ? "link" : "idle");
    };
    const leave = () => setState("hidden");
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    return () => { window.removeEventListener("pointermove", move); document.documentElement.removeEventListener("pointerleave", leave); };
  }, [reduce, x, y]);

  if (!enabled) return null;
  const size = state === "link" ? 56 : 28;
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[60] rounded-full border border-ink/50 mix-blend-difference"
      style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%", borderColor: "#fff" }}
      animate={{ width: size, height: size, opacity: state === "hidden" ? 0 : state === "link" ? 0.9 : 0.55, backgroundColor: state === "link" ? "rgba(255,255,255,1)" : "rgba(255,255,255,0)" }}
      transition={{ type: "spring", stiffness: 300, damping: 26 }}
    />
  );
}
