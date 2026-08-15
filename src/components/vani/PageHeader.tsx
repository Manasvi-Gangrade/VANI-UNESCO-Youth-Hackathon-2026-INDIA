import { type ReactNode } from "react";
import { Clover, Sunburst, TealCircle } from "./Decor";

interface PageHeaderProps {
  title: ReactNode;
  subtitle?: ReactNode;
  badge?: string;
  badgeTone?: "sunny" | "tangerine" | "teal" | "forest" | "grape";
}

const badgeTones = {
  sunny: "bg-sunny text-sunny-foreground",
  tangerine: "bg-tangerine text-tangerine-foreground",
  teal: "bg-teal text-teal-foreground",
  forest: "bg-forest text-forest-foreground",
  grape: "bg-grape text-grape-foreground",
};

export function PageHeader({
  title,
  subtitle,
  badge,
  badgeTone = "sunny",
}: PageHeaderProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl border-[3px] border-foreground bg-sunny p-6 sm:p-10 shadow-pop">
      <TealCircle className="right-4 top-4 h-16 w-16 opacity-70" />
      <Clover className="right-16 bottom-2 h-14 w-14 opacity-60" delay={0.8} />
      <div className="relative z-10 max-w-3xl space-y-4">
        {badge && (
          <span
            className={`inline-block rounded-full border-2 border-foreground px-3.5 py-1 text-xs font-black uppercase tracking-wider ${badgeTones[badgeTone]}`}
          >
            {badge}
          </span>
        )}
        <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-foreground">
          {title}
        </h1>
        {subtitle && (
          <p className="text-base sm:text-lg leading-relaxed text-foreground/85 font-medium">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
