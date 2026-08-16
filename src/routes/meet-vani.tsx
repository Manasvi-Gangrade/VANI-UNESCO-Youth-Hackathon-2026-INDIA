import { createFileRoute } from "@tanstack/react-router";
import { Smartphone, Snowflake, Eye, Trophy, Package, Mic, Tv, BadgeCheck } from "lucide-react";

import vaniImg from "@/assets/vani-illustration.jpg";
import { ColourBlockBanner, IconCard, PillButton, Reveal, SectionTint } from "@/components/vani/ui";
import { Clover, Sunburst, TealCircle } from "@/components/vani/Decor";

export const Route = createFileRoute("/meet-vani")({
  head: () => ({
    meta: [
      { title: "Meet VANI — The feed that trains you back | Project VANI" },
      {
        name: "description",
        content:
          "VaaniFeed, The Freeze, The Reveal, Resilience Score and VaaniKit: the five parts of the VANI loop, plus the line-up of fakes you'll meet.",
      },
      { property: "og:title", content: "Meet VANI" },
      {
        property: "og:description",
        content: "A familiar thumb-scrolling feed, quietly designed to make you sharper.",
      },
    ],
  }),
  component: MeetVani,
});

const MOMENTS = [
  { t: "7:42 PM", text: "Riya, 19, Indore, opens VaaniFeed on the bus home. Same thumb, same speed." },
  {
    t: "7:44 PM",
    text: "A clip: a familiar-sounding voice warning that a local scholarship deadline moved to tonight. Her thumb goes for Share.",
  },
  {
    t: "7:45 PM",
    text: "The screen softens and stills. “Wait — look again. Notice anything?” The voice flattens at the end of every sentence. Cloned.",
  },
  {
    t: "7:52 PM",
    text: "She's still scrolling. But now she's checking the audio tail on everything — and she forwards the tell, not the clip, to her family group.",
  },
];

const FEATURES = [
  {
    tone: "sunny" as const,
    icon: <Smartphone className="h-7 w-7" />,
    title: "VaaniFeed",
    description: "The entry point — a feed that looks and moves exactly like the one you already use.",
  },
  {
    tone: "tangerine" as const,
    icon: <Snowflake className="h-7 w-7" />,
    title: "The Freeze",
    description: "The trap — the instant you like or share a fake, everything gently stops.",
  },
  {
    tone: "teal" as const,
    icon: <Eye className="h-7 w-7" />,
    title: "The Reveal",
    description: "The lesson — the exact tell you missed, named in one sentence you'll remember.",
  },
  {
    tone: "forest" as const,
    icon: <Trophy className="h-7 w-7" />,
    title: "Resilience Score",
    description: "The motivation — a score out of 10 that turns caution into something worth beating.",
  },
  {
    tone: "grape" as const,
    icon: <Package className="h-7 w-7" />,
    title: "VaaniKit",
    description: "The ripple effect — a shareable toolkit so one player teaches a whole group.",
  },
];

const VILLAINS = [
  {
    icon: <Mic className="h-8 w-8" />,
    name: "The Familiar Voice",
    tag: "Cloned voice note",
    text: "Sounds exactly like someone you'd never question. Urgency first, details never. Listen for the flat, breathless tail at the end of each line.",
    cls: "bg-teal text-teal-foreground",
  },
  {
    icon: <Tv className="h-8 w-8" />,
    name: "The Breaking Newsreader",
    tag: "Fake news clip",
    text: "Studio desk, ticker, confident anchor — every visual cue of authority, and no outlet you can actually name. Watch the lips against the audio.",
    cls: "bg-tangerine text-tangerine-foreground",
  },
  {
    icon: <BadgeCheck className="h-8 w-8" />,
    name: "The Kind Official",
    tag: "Fake government scheme",
    text: "Free money, generous deadline, one small form. Official-looking seal, unofficial-looking link. Kindness is the bait.",
    cls: "bg-forest text-forest-foreground",
  },
];

function MeetVani() {
  return (
    <>
      <div className="relative overflow-hidden border-b-[3px] border-foreground bg-sunny">
        <TealCircle className="right-[10%] top-8 h-14 w-14" />
        <Clover className="left-[5%] bottom-0 h-16 w-16" delay={1.1} />
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <ColourBlockBanner tone="tangerine" size="lg">
            Meet VANI
          </ColourBlockBanner>
        </div>
      </div>

      <SectionTint>
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <p className="text-lg leading-relaxed sm:text-xl">
              Picture the app you already use every day — that fast, familiar, thumb-scrolling feed.
              Now imagine that feed is quietly designed to make you sharper every time you touch it.
              That’s VANI.
            </p>
            <div className="mt-6 rounded-2xl border-[3px] border-foreground bg-secondary p-5 shadow-pop">
              <p className="text-sm sm:text-base">
                In UNESCO’s own format terms, VANI is an <strong>Application/Website</strong> at its
                core, a <strong>Game</strong> in how it’s experienced, and an{" "}
                <strong>Educational Toolkit</strong> in what it leaves behind.
              </p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <img
              src={vaniImg}
              alt="A phone showing a feed frozen mid-scroll"
              loading="lazy"
              width={1024}
              height={768}
              className="w-full rounded-3xl border-[3px] border-foreground shadow-pop"
            />
          </Reveal>
        </div>
      </SectionTint>

      <SectionTint tinted>
        <ColourBlockBanner tone="teal">A day in the life</ColourBlockBanner>
        <div className="mx-auto mt-8 max-w-md rounded-[2.25rem] border-[6px] border-foreground bg-card p-4 shadow-pop">
          <div className="mx-auto mb-4 h-2 w-20 rounded-full bg-foreground/30" />
          <div className="space-y-4">
            {MOMENTS.map((m, i) => (
              <Reveal key={m.t} delay={i * 110}>
                <div className="rounded-2xl border-[3px] border-foreground bg-secondary p-4">
                  <p className="text-xs font-black tracking-widest text-tangerine">{m.t}</p>
                  <p className="mt-1 text-sm">{m.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </SectionTint>

      <SectionTint>
        <ColourBlockBanner>How the loop works</ColourBlockBanner>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={i * 70}>
              <IconCard {...f} />
            </Reveal>
          ))}
        </div>
      </SectionTint>

      <SectionTint tinted>
        <ColourBlockBanner tone="sunny">Meet the Line-Up</ColourBlockBanner>
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {VILLAINS.map((v, i) => (
            <Reveal key={v.name} delay={i * 90}>
              <div className="card-pop wiggle-on-hover h-full overflow-hidden bg-card">
                <div className={`flex items-center gap-3 border-b-[3px] border-foreground p-5 ${v.cls}`}>
                  <span className="wiggle-target">{v.icon}</span>
                  <div>
                    <p className="font-display text-lg">{v.name}</p>
                    <p className="text-xs font-black tracking-widest uppercase opacity-80">
                      {v.tag}
                    </p>
                  </div>
                </div>
                <p className="p-5 text-sm text-muted-foreground">{v.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </SectionTint>

      <SectionTint>
        <div className="relative text-center">
          <Sunburst className="left-[8%] -top-4 h-14 w-14" />
          <Reveal>
            <PillButton to="/simulator" tone="grape" className="text-lg sm:text-2xl">
              Try the Simulator Yourself →
            </PillButton>
          </Reveal>
        </div>
      </SectionTint>
    </>
  );
}
