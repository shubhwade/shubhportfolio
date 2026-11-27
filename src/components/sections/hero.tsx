import * as React from "react";
import { animate, motion, useMotionTemplate, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Magnetic, RevealText } from "@/components/motion";
import { RESUME } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

const CELL = 56;

/* Graph-paper grid: faint lines, a cursor-following highlight and a few cells that breathe */
function GridBackground({ mx, my }: { mx: MotionValue<number>; my: MotionValue<number> }) {
  const reduce = useReducedMotion();
  const grid = {
    backgroundImage: "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
    backgroundSize: `${CELL}px ${CELL}px`,
  } as const;
  const spot = useMotionTemplate`radial-gradient(240px circle at ${mx}px ${my}px, #000 0%, transparent 100%)`;
  const cells = React.useMemo(
    () => Array.from({ length: 14 }, (_, i) => ({ c: 3 + ((i * 7) % 22), r: 1 + ((i * 5) % 11), d: (i * 0.73) % 6, t: 5 + (i % 4) })),
    [],
  );
  const fade = "radial-gradient(ellipse 90% 80% at 60% 35%, #000 30%, transparent 85%)";
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <div className="absolute inset-0 text-ink/[0.06]" style={{ ...grid, maskImage: fade, WebkitMaskImage: fade }} />
      <motion.div className="absolute inset-0 text-ink/[0.16]" style={{ ...grid, maskImage: spot, WebkitMaskImage: spot }} />
      <div className="absolute inset-0" style={{ maskImage: fade, WebkitMaskImage: fade }}>
        {cells.map((c, i) => (
          <motion.span
            key={i}
            className="absolute bg-ink"
            style={{ left: c.c * CELL + 1, top: c.r * CELL + 1, width: CELL - 1, height: CELL - 1 }}
            initial={{ opacity: 0 }}
            animate={reduce ? { opacity: 0.03 } : { opacity: [0, 0.045, 0] }}
            transition={{ duration: c.t, delay: c.d, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>
    </div>
  );
}

/* Grey phrase; a textured orange fill follows the cursor through the letters */
function TexturedReveal({ text, delay }: { text: string; delay: number }) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(-200), y = useMotionValue(60);
  const r = useSpring(0, { stiffness: 140, damping: 20 });
  const sx = useSpring(x, { stiffness: 300, damping: 30 }), sy = useSpring(y, { stiffness: 300, damping: 30 });
  const mask = useMotionTemplate`radial-gradient(${r}px circle at ${sx}px ${sy}px, #000 55%, transparent 100%)`;
  const words = text.split(" ");

  // One slow sweep after the headline lands, so visitors notice there's something here
  React.useEffect(() => {
    if (reduce || !ref.current) return;
    const el = ref.current;
    const t = setTimeout(() => {
      const w = el.offsetWidth, h = el.offsetHeight;
      y.set(h * 0.55); x.jump(-40);
      r.set(Math.max(90, h * 0.9));
      animate(x, w + 40, { duration: 1.8, ease: [0.45, 0, 0.2, 1] }).then(() => r.set(0));
    }, (delay + 1.1) * 1000);
    return () => clearTimeout(t);
  }, [delay, r, reduce, x, y]);

  function move(e: React.PointerEvent) {
    const b = ref.current!.getBoundingClientRect();
    x.set(e.clientX - b.left); y.set(e.clientY - b.top);
  }

  return (
    <span
      ref={ref}
      className="relative block w-fit cursor-crosshair"
      onPointerMove={move}
      onPointerEnter={(e) => { move(e); r.set(Math.max(110, (ref.current?.offsetHeight ?? 100) * 1.05)); }}
      onPointerLeave={() => r.set(0)}
    >
      <RevealText text={text} className="block text-[#a29e96]" delay={delay} />
      <motion.span aria-hidden className="textured-orange pointer-events-none absolute inset-0 block" style={{ maskImage: mask, WebkitMaskImage: mask }}>
        {words.map((w, i) => (
          <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
            <span className="inline-block">{w}</span>
            {i < words.length - 1 && "\u00a0"}
          </span>
        ))}
      </motion.span>
    </span>
  );
}

export function Hero() {
  const ref = React.useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yText = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const yBg = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const mx = useMotionValue(-999), my = useMotionValue(-999);
  function track(e: React.PointerEvent<HTMLElement>) {
    const b = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - b.left); my.set(e.clientY - b.top - yBg.get());
  }

  return (
    <section ref={ref} id="top" onPointerMove={track} onPointerLeave={() => { mx.set(-999); my.set(-999); }} className="relative flex min-h-[92svh] flex-col overflow-hidden pt-24 sm:pt-28">
      <motion.div className="absolute inset-0" style={{ y: yBg, opacity: fade }}>
        <GridBackground mx={mx} my={my} />
      </motion.div>

      <div className="relative mx-auto grid w-full max-w-[1240px] flex-1 content-start items-start gap-14 px-4 pb-16 pt-4 sm:px-8 lg:grid-cols-[1.15fr_1fr] lg:gap-20 lg:pt-6">
        <motion.div style={{ y: yText }} className="lg:pt-1">
          <motion.p
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: EASE }}
            className="flex items-center gap-3 text-sm font-medium text-ink-2"
          >
            <span className="h-px w-8 bg-ink/40" />
            Shubh Wade · Financial Analyst, Mumbai
          </motion.p>

          <h1 className="mt-8 max-w-[15ch] text-[clamp(44px,6.2vw,96px)] font-semibold leading-[.98] tracking-[-0.05em]">
            <RevealText text="I turn financial statements" className="block" delay={0.15} />
            <TexturedReveal text="into decisions." delay={0.4} />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.75, ease: EASE }}
            className="mt-12 max-w-[460px] text-[17px] leading-relaxed text-ink-2 sm:mt-14"
          >
            Most recently a Finance Intern at Springer Capital. I also built Isoline, an open-source financial statement engine with more than 16,000 downloads.
          </motion.p>
        </motion.div>

        <div className="mx-auto w-full max-w-[380px] lg:mx-0 lg:w-[min(360px,max(300px,calc((100svh-236px)*0.709)))] lg:max-w-none lg:justify-self-center">
          <motion.figure
            initial={{ clipPath: "inset(100% 0% 0% 0% round 28px)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0% round 28px)" }}
            transition={{ duration: 1.3, delay: 0.35, ease: EASE }}
            className="relative overflow-hidden rounded-[28px] bg-surface shadow-[0_40px_80px_-40px_rgba(20,20,19,.45)]"
          >
            <motion.img
              src="assets/shubh-portrait.webp" alt="Shubh Wade" width={908} height={1280} decoding="async" fetchPriority="high"
              initial={{ scale: 1.18 }} animate={{ scale: 1 }} transition={{ duration: 1.8, delay: 0.35, ease: EASE }}
              className="aspect-[908/1280] w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 rounded-[28px] ring-1 ring-inset ring-ink/10" />
          </motion.figure>

          <motion.div
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.9, ease: EASE }}
            className="mt-5 grid grid-cols-[1fr_auto] items-center gap-3"
          >
            <Magnetic strength={0.2} className="w-full">
              <Button asChild className="h-12 w-full justify-between pl-5 pr-1.5 hover:bg-ink hover:text-bg">
                <a href="#work">
                  View my work
                  <span className="grid size-9 place-items-center rounded-full bg-bg text-ink transition-transform duration-500 ease-out-expo group-hover/btn:translate-x-1">
                    <ArrowRight className="size-4" />
                  </span>
                </a>
              </Button>
            </Magnetic>
            <Button asChild variant="outline" className="h-12 px-4">
              <a href={RESUME} target="_blank" rel="noopener">
                Résumé <ArrowUpRight className="transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
              </a>
            </Button>
          </motion.div>
        </div>
      </div>

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
