import * as React from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Magnetic } from "@/components/motion";
import { EMAIL, GITHUB, LINKEDIN, RESUME } from "@/lib/utils";

export function Contact() {
  const ref = React.useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["-12%", "0%"]);
  const [copied, setCopied] = React.useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true); toast.success("Email copied", { description: EMAIL });
      setTimeout(() => setCopied(false), 2000);
    } catch { window.location.href = `mailto:${EMAIL}`; }
  }

  return (
    <section ref={ref} id="contact" className="px-3 pb-3 pt-28 sm:px-5 sm:pb-5 sm:pt-36">
      <div className="grain relative mx-auto max-w-[1400px] overflow-hidden rounded-[36px] bg-graphite text-bone">
        <div className="pointer-events-none absolute -right-40 -top-40 size-[520px] rounded-full bg-accent/25 blur-[120px]" />
        <div className="relative px-6 pb-8 pt-16 sm:px-12 sm:pt-24 lg:px-16">
          <span className="label text-accent">Contact</span>
          <motion.h2 style={{ x }} className="mt-6 whitespace-nowrap text-[clamp(64px,13vw,200px)] font-semibold leading-[.88] tracking-[-0.06em] text-white">
            Let's talk<span className="text-accent">.</span>
          </motion.h2>
          <div className="mt-12 grid items-end gap-10 lg:grid-cols-[1fr_auto]">
            <p className="max-w-md text-lg leading-relaxed text-bone/75">
              I'm looking for financial analyst, equity research and business analyst internships. I usually reply within a day.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Magnetic>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button size="lg" variant="accent" onClick={copy}>
                      {copied ? <Check /> : <Copy />}{EMAIL}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Click to copy</TooltipContent>
                </Tooltip>
              </Magnetic>
              <Button asChild size="lg" variant="dark"><a href={LINKEDIN} target="_blank" rel="noopener">LinkedIn <ArrowUpRight /></a></Button>
            </div>
          </div>
          <div className="mt-20 flex flex-wrap items-center justify-between gap-4 border-t border-graphite-line pt-6 text-sm text-ash">
            <span>© {new Date().getFullYear()} Shubh Wade · Mumbai</span>
            <nav aria-label="Elsewhere" className="flex gap-6">
              <a className="transition-colors hover:text-white" href={GITHUB} target="_blank" rel="noopener">GitHub</a>
              <a className="transition-colors hover:text-white" href="https://pypi.org/project/isoline/" target="_blank" rel="noopener">PyPI</a>
              <a className="transition-colors hover:text-white" href={RESUME} target="_blank" rel="noopener">Résumé</a>
              <a className="transition-colors hover:text-white" href={`mailto:${EMAIL}`}>Email</a>
            </nav>
          </div>
        </div>
      </div>
    </section>
  );
}
