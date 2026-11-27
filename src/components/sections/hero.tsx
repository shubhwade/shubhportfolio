import * as React from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Magnetic, RevealText } from "@/components/motion";
import { RESUME } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

function Portrait() {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, delay: 0.3, ease: EASE }}
      className="mx-auto w-full max-w-[380px] lg:ml-auto lg:mr-0"
    >
      <div className="overflow-hidden rounded-[28px] bg-surface">
        <motion.img
          src="assets/profile-photo.png" alt="Shubh Wade" width={402} height={384}
          initial={{ scale: 1.12 }} animate={{ scale: 1 }} transition={{ duration: 1.6, delay: 0.3, ease: EASE }}
          className="aspect-[4/5] w-full object-cover object-[50%_25%] grayscale-[15%]"
        />
      </div>
      <figcaption className="mt-4 flex items-center justify-between border-t border-line pt-4 text-sm">
        <span className="font-medium">Shubh Wade</span>
        <span className="flex items-center gap-2 text-ink-2">
          <span className="relative flex size-2"><span className="absolute inline-flex size-full animate-ping-slow rounded-full bg-accent" /><span className="relative inline-flex size-2 rounded-full bg-accent" /></span>
          Mumbai, available 2027
        </span>
      </figcaption>
    </motion.figure>
  );
}

export function Hero() {
  const ref = React.useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
    const yText = useTransform(scrollYProgress, [0, 1], [0, -60]);
  
  return (
    <section ref={ref} id="top" className="relative overflow-hidden pt-32 pb-20 sm:pt-44 lg:pb-32">

      <div className="relative mx-auto grid max-w-[1240px] items-center gap-16 px-4 sm:px-8 lg:grid-cols-[1.4fr_1fr]">
        <motion.div style={{ y: yText }}>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE }}>
            <Badge className="gap-2 py-1.5 pl-2 pr-3.5">
              <span className="relative flex size-2"><span className="absolute inline-flex size-full animate-ping-slow rounded-full bg-accent" /><span className="relative inline-flex size-2 rounded-full bg-accent" /></span>
              Open to analyst internships · 2027
            </Badge>
          </motion.div>

          <h1 className="mt-7 text-[clamp(40px,5.3vw,78px)] font-semibold leading-[1] tracking-[-0.045em]">
            <RevealText text="I turn financial" className="block" delay={0.1} />
            <RevealText text="statements into" className="block" delay={0.25} />
            <span className="block">
              <RevealText text="decisions." className="text-accent" delay={0.4} />
            </span>
          </h1>

          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.7, ease: EASE }}
            className="mt-7 max-w-[520px] text-[17px] leading-relaxed text-ink-2">
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
