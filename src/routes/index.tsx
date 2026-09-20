import { createFileRoute } from "@tanstack/react-router";
import {
  Users,
  AlertTriangle,
  Sparkles,
  Play,
  Globe2,
  HelpCircle,
  Video,
  Github,
  Link2,
  FileText,
  ExternalLink,
} from "lucide-react";

import heroImg from "@/assets/hero-vani.jpg";
import {
  Carousel,
  ColourBlockBanner,
  IconCard,
  PillButton,
  Reveal,
  SectionTint,
} from "@/components/vani/ui";
import { Clover, OrangeHalf, Squiggle, Sunburst, TealCircle } from "@/components/vani/Decor";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Project VANI — Scroll smart. Spot the fake before you share." },
      {
        name: "description",
        content:
          "A youth-led Media and Information Literacy project: a playable feed that freezes you the moment you're about to share a fake.",
      },
      { property: "og:title", content: "Project VANI — Scroll smart, spot the fake" },
      {
        property: "og:description",
        content:
          "Verification & Algorithmic Literacy Network Initiative — a playable MIL simulator built for the UNESCO Youth Hackathon.",
      },
    ],
  }),
  component: Home,
});

const CARDS = [
  {
    to: "/who-we-are",
    tone: "teal" as const,
    icon: <Users className="h-7 w-7" />,
    title: "Who We Are",
    description: "Two friends, one uncomfortable confession, and the idea it turned into.",
  },
  {
    to: "/the-problem",
    tone: "tangerine" as const,
    icon: <AlertTriangle className="h-7 w-7" />,
    title: "The Problem",
    description: "Why media literacy on paper isn't surviving contact with real feeds.",
  },
  {
    to: "/meet-vani",
    tone: "forest" as const,
    icon: <Sparkles className="h-7 w-7" />,
    title: (
      <>
        Meet <span className="notranslate" translate="no">VANI</span>
      </>
    ),
    description: "The feed that quietly makes you sharper every time you touch it.",
  },
  {
    to: "/simulator",
    tone: "sunny" as const,
    icon: <Play className="h-7 w-7" />,
    title: "Try the Simulator",
    description: "Scroll a fake feed. Get caught. Learn the tell. Get your score.",
    featured: true,
  },
  {
    to: "/our-vision",
    tone: "grape" as const,
    icon: <Globe2 className="h-7 w-7" />,
    title: "Our Vision",
    description: "Built once, translated endlessly — 121 languages is the starting line.",
  },
  {
    to: "/faq",
    tone: "teal" as const,
    icon: <HelpCircle className="h-7 w-7" />,
    title: "You Might Be Wondering",
    description: "The three questions everyone asks us, answered straight.",
  },
];

const STATS = [
  {
    big: "88% / 17%",
    text: "of UNESCO Member States recognise MIL in policy — but only 17% have a stand-alone one.",
    cls: "bg-sunny text-sunny-foreground",
  },
  {
    big: "62%",
    text: "of digital content creators don't fact-check before publishing.",
    cls: "bg-tangerine text-tangerine-foreground",
  },
  {
    big: "121",
    text: "languages are spoken by 10,000+ people in India alone.",
    cls: "bg-teal text-teal-foreground",
  },
  {
    big: "45–50%",
    text: "accuracy drop for deepfake-detection tools outside lab conditions.",
    cls: "bg-forest text-forest-foreground",
  },
  {
    big: "560%",
    text: "projected growth of the generative AI market between 2025 and 2031.",
    cls: "bg-grape text-grape-foreground",
  },
];

const DELIVERABLES = [
  {
    icon: <Video className="h-6 w-6" />,
    title: "Pitch Video",
    note: "3-minute presentation & project walk-through.",
    url: "https://drive.google.com/drive/folders/1eEURK2jyGT6DxL23uoxSBw0S9a-epPkA?usp=sharing",
  },
  {
    icon: <Github className="h-6 w-6" />,
    title: "MVP POC Code Repo",
    note: (
      <>
        Open GitHub repository for <span className="notranslate" translate="no">Project VANI</span>.
      </>
    ),
    url: "https://github.com/Manasvi-Gangrade/VANI-UNESCO-Youth-Hackathon-2026-INDIA",
  },
  {
    icon: <Link2 className="h-6 w-6" />,
    title: "Live Deployed URL",
    note: "Vercel production build & simulator.",
    url: "https://vani-verification-algorithmic-liter.vercel.app",
  },
  {
    icon: <FileText className="h-6 w-6" />,
    title: "Research Paper",
    note: (
      <>
        ResearchGate publication on <span className="notranslate" translate="no">VANI</span> simulation framework.
      </>
    ),
    url: "https://www.researchgate.net/publication/412304955_VANI_A_Behavioural_Simulation_Framework_for_Multilingual_Media_and_Information_Literacy_in_the_Age_of_Generative_AI",
  },
  {
    icon: <ExternalLink className="h-6 w-6" />,
    title: "Additional Deliverables",
    note: "Technical implementation, MVP video & assets drive.",
    url: "https://drive.google.com/drive/folders/1qHS26BenA5j-EFgkCyowmilLbKb28bNh?usp=sharing",
  },
];

function Home() {
  return (
    <>
      <section className="relative overflow-hidden border-b-[3px] border-foreground bg-sunny">
        <TealCircle className="left-[4%] top-10 h-16 w-16 opacity-90" />
        <Clover className="right-[6%] top-8 h-20 w-20" delay={1.2} />
        <OrangeHalf className="bottom-6 left-[18%] h-10 w-20" delay={0.6} />
        <Sunburst className="right-[12%] bottom-10 h-16 w-16" delay={1.8} />
        <Squiggle className="left-[42%] top-4 h-8 w-28 opacity-70" delay={0.9} />

        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="relative z-10">
            <Reveal>
              <p className="mb-3 inline-block rounded-full border-[3px] border-foreground bg-card px-4 py-1 text-xs font-black tracking-[0.2em] uppercase">
                UNESCO Youth Hackathon · MIL
              </p>
              <h1 className="font-display text-5xl leading-[0.95] sm:text-7xl notranslate" translate="no">
                Project VANI
              </h1>
              <p className="mt-3 font-display text-xl sm:text-2xl">
                Verification &amp; Algorithmic Literacy Network Initiative
              </p>
              <p className="mt-4 max-w-xl text-base italic sm:text-lg">
                <span className="notranslate" translate="no">“Vani”</span> means voice. This project exists so no young person’s voice — in any language
                — is left undefended against a lie that was never even human to begin with.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <PillButton to="/simulator" tone="grape">
                  <Play className="h-5 w-5" /> Try the Simulator
                </PillButton>
                <PillButton to="/proposal" tone="sunny">
                  Read Full Proposal
                </PillButton>
                <PillButton to="/meet-vani" tone="cream">
                  <span className="notranslate" translate="no">Meet VANI</span>
                </PillButton>
              </div>
            </Reveal>
          </div>
          <Reveal delay={120}>
            <img
              src={heroImg}
              alt="Two young people surrounded by floating social media posts"
              width={1280}
              height={960}
              className="w-full rounded-3xl border-[3px] border-foreground shadow-pop"
            />
          </Reveal>
        </div>
      </section>

      <SectionTint>
        <Reveal>
          <div className="rounded-3xl border-[4px] border-grape bg-card p-7 shadow-pop sm:p-10">
            <p className="font-display text-2xl leading-snug sm:text-4xl">
              The last time something online made you pause — how did you actually decide whether to
              trust it?
            </p>
            <p className="mt-3 text-base text-muted-foreground sm:text-lg">
              Chances are, you didn't check a source. You felt something, and you scrolled on. That single, split-second moment — not the classroom, not the textbook — is where most of us actually learn, or fail to learn, media literacy. <span className="notranslate font-bold" translate="no">Project VANI</span> starts exactly there.
            </p>
          </div>
        </Reveal>
      </SectionTint>

      <SectionTint tinted>
        <ColourBlockBanner tone="sunny">Start Anywhere</ColourBlockBanner>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CARDS.map((c, i) => (
            <Reveal key={c.to} delay={i * 70}>
              <IconCard {...c} />
            </Reveal>
          ))}
        </div>
      </SectionTint>

      <SectionTint>
        <ColourBlockBanner>Facts &amp; Figures</ColourBlockBanner>
        <div className="mt-8">
          <Carousel>
            {STATS.map((s) => (
              <div
                key={s.big}
                className={`h-full rounded-2xl border-[3px] border-foreground p-6 shadow-pop ${s.cls}`}
              >
                <p className="font-display text-3xl">{s.big}</p>
                <p className="mt-2 text-sm leading-snug">{s.text}</p>
              </div>
            ))}
          </Carousel>
        </div>
      </SectionTint>

      <SectionTint tinted>
        <ColourBlockBanner>What Are We Delivering?</ColourBlockBanner>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {DELIVERABLES.map((d, i) => (
            <Reveal key={d.title} delay={i * 70}>
              <a
                href={d.url}
                target="_blank"
                rel="noreferrer"
                className="card-pop wiggle-on-hover flex h-full items-start gap-4 bg-card p-6 transition-transform hover:-translate-y-1"
              >
                <span className="wiggle-target inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border-[3px] border-foreground bg-teal text-teal-foreground">
                  {d.icon}
                </span>
                <div>
                  <h3 className="font-display text-lg underline-offset-4 hover:underline">{d.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{d.note}</p>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </SectionTint>
    </>
  );
}
