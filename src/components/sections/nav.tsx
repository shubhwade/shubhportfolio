import * as React from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { ArrowUpRight, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { cn, RESUME } from "@/lib/utils";

const LINKS = [
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "credentials", label: "Credentials" },
  { id: "contact", label: "Contact" },
];

export function Nav() {
  const [active, setActive] = React.useState("");
  const [hover, setHover] = React.useState<string | null>(null);
  const [scrolled, setScrolled] = React.useState(false);
  const { scrollY, scrollYProgress } = useScroll();
  const [hidden, setHidden] = React.useState(false);
  useMotionValueEvent(scrollY, "change", (v) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(v > 24);
    setHidden(v > 400 && v > prev + 2);
    if (v < prev - 2) setHidden(false);
  });

  React.useEffect(() => {
    const els = LINKS.map((l) => document.getElementById(l.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const shown = hover ?? active;

  return (
    <motion.header animate={{ y: hidden ? -110 : 0 }} transition={{ type: "spring", stiffness: 260, damping: 32 }} className="fixed inset-x-0 top-0 z-40 px-3 pt-3 sm:px-5 sm:pt-4">
      <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-3">
        <a href="#top" className={cn("flex h-12 items-center gap-2.5 rounded-full border px-2 pr-4 transition-all duration-500", scrolled ? "border-line bg-surface/80 backdrop-blur-xl shadow-[0_8px_30px_-16px_rgba(20,20,19,.35)]" : "border-transparent")}>
          <span className="grid size-8 place-items-center rounded-full bg-ink text-[13px] font-bold tracking-tight text-bg">SW</span>
          <span className="text-[15px] font-semibold tracking-tight">Shubh Wade</span>
        </a>

        <nav
          aria-label="Sections"
          onMouseLeave={() => setHover(null)}
          className={cn("relative hidden h-12 items-center rounded-full border px-1.5 transition-all duration-500 md:flex", scrolled ? "border-line bg-surface/80 backdrop-blur-xl shadow-[0_8px_30px_-16px_rgba(20,20,19,.35)]" : "border-line/70 bg-surface/40 backdrop-blur")}
        >
          {LINKS.map((l) => (
            <a key={l.id} href={`#${l.id}`} onMouseEnter={() => setHover(l.id)}
              className={cn("relative z-10 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300", shown === l.id ? "text-bg" : "text-ink-2 hover:text-ink")}>
              {shown === l.id && (
                <motion.span layoutId="nav-pill" className="absolute inset-0 -z-10 rounded-full bg-ink" transition={{ type: "spring", stiffness: 380, damping: 32 }} />
              )}
              {l.label}
            </a>
          ))}
          <motion.span className="absolute inset-x-5 -bottom-px h-px origin-left bg-accent" style={{ scaleX: scrollYProgress }} />
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild size="sm" variant={scrolled ? "default" : "outline"} className="hidden h-12 px-5 sm:inline-flex">
            <a href={RESUME} target="_blank" rel="noopener">Résumé <ArrowUpRight className="transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" /></a>
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="size-12 md:hidden" aria-label="Open menu"><Menu /></Button>
            </SheetTrigger>
            <SheetContent>
              <SheetTitle className="label text-muted">Menu</SheetTitle>
              <ul className="mt-6 space-y-1">
                {LINKS.map((l, i) => (
                  <li key={l.id}>
                    <SheetClose asChild>
                      <a href={`#${l.id}`} className="flex items-baseline gap-4 border-b border-line py-3 text-3xl font-semibold tracking-tight">
                        <span className="text-xs font-medium text-muted tabular">0{i + 1}</span>{l.label}
                      </a>
                    </SheetClose>
                  </li>
                ))}
              </ul>
              <Button asChild className="mt-6 w-full"><a href={RESUME} target="_blank" rel="noopener">Download résumé</a></Button>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}
