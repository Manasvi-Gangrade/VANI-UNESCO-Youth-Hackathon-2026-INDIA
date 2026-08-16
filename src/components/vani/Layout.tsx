import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { Menu, X } from "lucide-react";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/who-we-are", label: "Who We Are" },
  { to: "/the-problem", label: "The Problem" },
  { to: "/meet-vani", label: "Meet VANI" },
  { to: "/simulator", label: "Simulator" },
  { to: "/our-vision", label: "Our Vision" },
  { to: "/faq", label: "FAQ" },
];

function NavLinks({ onClick }: { onClick?: () => void }) {
  return (
    <>
      {NAV.map((n) => (
        <Link
          key={n.to}
          to={n.to}
          onClick={onClick}
          activeOptions={{ exact: n.to === "/" }}
          className="rounded-full border-[3px] border-transparent px-4 py-2 text-sm font-bold transition-all duration-200 hover:-translate-y-0.5 hover:border-foreground hover:bg-sunny"
          activeProps={{ className: "border-foreground bg-tangerine" }}
        >
          {n.label}
        </Link>
      ))}
    </>
  );
}

export function SiteLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-50 border-b-[3px] border-foreground bg-sunny">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <Link to="/" className="font-display text-2xl tracking-tight">
            VANI<span className="text-grape">.</span>
          </Link>
          <nav className="hidden items-center gap-1 lg:flex">
            <NavLinks />
          </nav>
          <button
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border-[3px] border-foreground bg-card lg:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        {open && (
          <nav className="flex flex-col gap-1 border-t-[3px] border-foreground bg-cream px-4 py-3 lg:hidden">
            <NavLinks onClick={() => setOpen(false)} />
          </nav>
        )}
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t-[3px] border-foreground bg-forest text-forest-foreground">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-10 sm:px-6">
          <p className="font-display text-2xl">Project VANI</p>
          <p className="max-w-xl text-sm opacity-90">
            Verification &amp; Algorithmic Literacy Network Initiative — a youth-built Media and
            Information Literacy prototype for the UNESCO Youth Hackathon.
          </p>
          <p className="text-xs opacity-70">
            Built by Manasvi Gangrade &amp; Suhani Sharma. All simulated posts are fictional and
            team-created.
          </p>
        </div>
      </footer>
    </div>
  );
}
