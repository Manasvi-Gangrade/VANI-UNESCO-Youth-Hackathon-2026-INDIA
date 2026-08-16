import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";

export type Tone = "sunny" | "tangerine" | "teal" | "forest" | "grape";

const toneBg: Record<Tone, string> = {
  sunny: "bg-sunny text-sunny-foreground",
  tangerine: "bg-tangerine text-tangerine-foreground",
  teal: "bg-teal text-teal-foreground",
  forest: "bg-forest text-forest-foreground",
  grape: "bg-grape text-grape-foreground",
};

export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${className} ${shown ? "rise-in" : "opacity-0"}`}
      style={shown ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}

export function ColourBlockBanner({
  children,
  tone = "tangerine",
  size = "md",
  className = "",
}: {
  children: ReactNode;
  tone?: Tone;
  size?: "md" | "lg";
  className?: string;
}) {
  return (
    <Reveal className={className}>
      <div
        className={`inline-block max-w-full rounded-2xl border-[3px] border-foreground px-5 py-3 shadow-pop sm:px-7 sm:py-4 ${toneBg[tone]}`}
      >
        <h2
          className={`font-display text-foreground ${size === "lg" ? "text-2xl sm:text-4xl" : "text-xl sm:text-3xl"}`}
        >
          {children}
        </h2>
      </div>
    </Reveal>
  );
}

export function IconCard({
  to,
  tone,
  icon,
  title,
  description,
  featured = false,
}: {
  to?: string;
  tone: Tone;
  icon: ReactNode;
  title: string;
  description: string;
  featured?: boolean;
}) {
  const inner = (
    <div
      className={`card-pop wiggle-on-hover group relative flex h-full flex-col gap-3 bg-card p-6 ${
        featured ? "border-grape pulse-glow" : ""
      }`}
    >
      <span
        className={`wiggle-target inline-flex h-14 w-14 items-center justify-center rounded-2xl border-[3px] border-foreground ${toneBg[tone]}`}
      >
        {icon}
      </span>
      <h3 className="font-display text-xl">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
      {featured && (
        <span className="mt-auto inline-flex w-fit rounded-full bg-grape px-3 py-1 text-xs font-bold text-grape-foreground">
          Interactive centrepiece
        </span>
      )}
    </div>
  );

  return to ? (
    <Link to={to} className="block h-full">
      {inner}
    </Link>
  ) : (
    inner
  );
}

export function StatCallout({
  children,
  tone = "sunny",
  label,
}: {
  children: ReactNode;
  tone?: Tone;
  label?: string;
}) {
  return (
    <Reveal>
      <div className={`rounded-2xl border-[3px] border-foreground p-6 shadow-pop ${toneBg[tone]}`}>
        {label && (
          <p className="mb-2 text-xs font-black tracking-[0.18em] uppercase opacity-80">{label}</p>
        )}
        <p className="font-display text-lg italic sm:text-2xl">{children}</p>
      </div>
    </Reveal>
  );
}

export function ChatBubble({
  side,
  name,
  children,
}: {
  side: "left" | "right";
  name: string;
  children: ReactNode;
}) {
  const isLeft = side === "left";
  return (
    <div className={`flex ${isLeft ? "justify-start" : "justify-end"}`}>
      <div className={`max-w-[85%] sm:max-w-[70%] ${isLeft ? "text-left" : "text-right"}`}>
        <p className="mb-1 text-xs font-black tracking-wide uppercase text-muted-foreground">
          {name}
        </p>
        <div
          className={`rounded-2xl border-[3px] border-foreground px-4 py-3 text-left shadow-pop ${
            isLeft ? "bg-card" : "bg-sunny text-sunny-foreground"
          }`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export function Carousel({ children }: { children: ReactNode[] }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const scrollBy = (dir: number) => {
    ref.current?.scrollBy({ left: dir * 320, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div
        ref={ref}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {children.map((c, i) => (
          <div key={i} className="w-[270px] shrink-0 snap-start sm:w-[320px]">
            {c}
          </div>
        ))}
      </div>
      <div className="mt-2 flex gap-2">
        <button
          onClick={() => scrollBy(-1)}
          aria-label="Previous stats"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border-[3px] border-foreground bg-card transition-transform hover:-translate-y-0.5 active:translate-y-0"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={() => scrollBy(1)}
          aria-label="Next stats"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border-[3px] border-foreground bg-card transition-transform hover:-translate-y-0.5 active:translate-y-0"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

export function Accordion({
  items,
}: {
  items: { q: string; a: string }[];
}) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="space-y-4">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <Reveal key={item.q} delay={i * 80}>
            <div className="card-pop overflow-hidden bg-card">
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              >
                <span className="font-display text-lg sm:text-xl">{item.q}</span>
                <ChevronDown
                  className={`h-6 w-6 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                />
              </button>
              <div
                className="grid transition-[grid-template-rows] duration-300 ease-out"
                style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
              >
                <div className="overflow-hidden">
                  <p className="px-5 pb-5 text-muted-foreground">{item.a}</p>
                </div>
              </div>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}

export function PillButton({
  to,
  href,
  onClick,
  tone = "tangerine",
  children,
  className = "",
  type = "button",
}: {
  to?: string;
  href?: string;
  onClick?: () => void;
  tone?: Tone | "cream";
  children: ReactNode;
  className?: string;
  type?: "button" | "submit";
}) {
  const cls = `inline-flex items-center justify-center gap-2 rounded-full border-[3px] border-foreground px-6 py-3 font-display text-base shadow-pop transition-transform duration-200 hover:-translate-y-1 active:translate-y-0 ${
    tone === "cream" ? "bg-card text-foreground" : toneBg[tone]
  } ${className}`;

  if (to) return <Link to={to} className={cls}>{children}</Link>;
  if (href)
    return (
      <a href={href} className={cls}>
        {children}
      </a>
    );
  return (
    <button type={type} onClick={onClick} className={cls}>
      {children}
    </button>
  );
}

export function SectionTint({
  children,
  tinted = false,
  className = "",
}: {
  children: ReactNode;
  tinted?: boolean;
  className?: string;
}) {
  return (
    <section className={`${tinted ? "bg-secondary/60" : ""} ${className}`}>
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">{children}</div>
    </section>
  );
}
