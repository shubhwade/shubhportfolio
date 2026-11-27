import { ArrowUpRight } from "lucide-react";
import { FadeIn, RevealText } from "@/components/motion";
import { cn } from "@/lib/utils";

const CREDS = [
  { from: "Yale University · Coursera", title: "Financial Markets", sub: "Taught by Robert Shiller", href: "https://www.coursera.org/account/accomplishments/verify/HM8W2TTFJTYB" },
  { from: "365 Careers · Udemy", title: "Data Science Bootcamp", sub: "Statistics, Python, machine learning", href: "https://www.udemy.com/certificate/UC-f2181c0d-f29d-46eb-be6a-f9b7754cdcc2/" },
  { from: "Mumbai University · TCET", title: "B.E. Information Technology", sub: "CGPA 9.0 / 10 · 2024–28" },
  { from: "HackerRank", title: "SQL (Advanced) · R", sub: "Certified" },
];

export function Credentials() {
  return (
    <section id="credentials" className="pt-28 sm:pt-36">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-8">
        <FadeIn><span className="label text-accent-ink">Credentials</span></FadeIn>
        <RevealText as="h2" text="Education & certifications." className="mt-4 text-[clamp(38px,5.4vw,76px)] font-semibold leading-[.98] tracking-[-0.05em]" />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CREDS.map((c, i) => {
            const Tag = c.href ? "a" : "div";
            return (
              <FadeIn key={c.title} delay={i * 0.07}>
                <Tag
                  {...(c.href ? { href: c.href, target: "_blank", rel: "noopener" } : {})}
                  className={cn("group relative flex h-full min-h-[230px] flex-col overflow-hidden rounded-3xl border border-line bg-surface p-6 transition-all duration-500 ease-out-expo",
                    c.href && "hover:-translate-y-1.5 hover:border-ink hover:bg-ink hover:text-bg hover:shadow-[0_30px_60px_-30px_rgba(20,20,19,.6)]")}
                >
                  <div className="flex items-start justify-between">
                    <span className={cn("text-sm text-muted tabular transition-colors duration-500", c.href && "group-hover:text-ash")}>0{i + 1}</span>
                    {c.href && <ArrowUpRight className="size-5 text-muted transition-all duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-bg" />}
                  </div>
                  <div className="pt-12">
                    <div className={cn("text-xs font-medium text-muted transition-colors duration-500", c.href && "group-hover:text-ash")}>{c.from}</div>
                    <h3 className="mt-2 text-xl font-semibold leading-tight tracking-[-0.02em]">{c.title}</h3>
                    <p className={cn("mt-1.5 text-sm text-muted transition-colors duration-500", c.href && "group-hover:text-bone/70")}>{c.sub}</p>
                    {c.href && <span className="mt-4 inline-block text-sm font-medium underline decoration-line underline-offset-4 transition-colors duration-500 group-hover:decoration-ash">Verify credential</span>}
                  </div>
                </Tag>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
