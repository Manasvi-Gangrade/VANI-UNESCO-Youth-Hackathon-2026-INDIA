import { createFileRoute } from "@tanstack/react-router";
import { UserRound } from "lucide-react";

import { ChatBubble, ColourBlockBanner, Reveal, SectionTint } from "@/components/vani/ui";
import { Clover, TealCircle } from "@/components/vani/Decor";

export const Route = createFileRoute("/who-we-are")({
  head: () => ({
    meta: [
      { title: "Who We Are — Project VANI" },
      {
        name: "description",
        content:
          "Meet the two-person team behind Project VANI and the late-night conversation that started it.",
      },
      { property: "og:title", content: "Who We Are — Project VANI" },
      {
        property: "og:description",
        content: "Two friends admitted they'd fallen for the exact thing they were meant to catch.",
      },
    ],
  }),
  component: WhoWeAre,
});

const TEAM = [
  {
    name: "Manasvi Gangrade",
    role: "Team Lead",
    blurb: "Research, strategy, and overall project direction.",
    featured: true,
    tone: "bg-sunny",
  },
  {
    name: "Suhani Sharma",
    role: "Co-Lead",
    blurb: "Concept development, content design, and presentation.",
    featured: false,
    tone: "bg-teal",
  },
];

const CHAT = [
  {
    side: "left" as const,
    name: "Suhani",
    text: "Okay wait, be honest — when's the last time you actually double-checked something before forwarding it to the family group?",
  },
  {
    side: "right" as const,
    name: "Manasvi",
    text: "...never, if I'm being fully honest. If it looks urgent enough, I just send it.",
  },
  {
    side: "left" as const,
    name: "Suhani",
    text: "Exactly. And we're the ones who are supposed to know better.",
  },
  {
    side: "right" as const,
    name: "Manasvi",
    text: "So the problem isn't that people don't know what misinformation is. It's that nobody's ever tested us in the moment it actually matters.",
  },
  {
    side: "left" as const,
    name: "Suhani",
    text: "That's it. That's the whole project right there.",
  },
];

function WhoWeAre() {
  return (
    <>
      <div className="relative overflow-hidden border-b-[3px] border-foreground bg-sunny">
        <TealCircle className="right-[8%] top-6 h-14 w-14" />
        <Clover className="left-[4%] bottom-2 h-16 w-16" delay={1} />
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <ColourBlockBanner tone="tangerine" size="lg">
            Who We Are
          </ColourBlockBanner>
        </div>
      </div>

      <SectionTint>
        <div className="grid gap-6 sm:grid-cols-2">
          {TEAM.map((m, i) => (
            <Reveal key={m.name} delay={i * 100}>
              <div
                className={`card-pop flex h-full items-center gap-5 bg-card p-6 ${m.featured ? "border-grape" : ""}`}
              >
                <div
                  className={`flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl border-[3px] border-foreground ${m.tone}`}
                >
                  <UserRound className="h-12 w-12 opacity-70" />
                </div>
                <div>
                  <h3 className="font-display text-xl">{m.name}</h3>
                  <p className="text-sm font-black tracking-wide uppercase text-tangerine">
                    {m.role}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">{m.blurb}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </SectionTint>

      <SectionTint tinted>
        <ColourBlockBanner tone="teal">Where this idea actually came from</ColourBlockBanner>
        <div className="mt-8 space-y-5 rounded-3xl border-[3px] border-foreground bg-cream p-5 shadow-pop sm:p-8">
          {CHAT.map((c, i) => (
            <Reveal key={c.text} delay={i * 110}>
              <ChatBubble side={c.side} name={c.name}>
                {c.text}
              </ChatBubble>
            </Reveal>
          ))}
        </div>
        <Reveal delay={200}>
          <p className="mt-8 font-display text-lg leading-snug sm:text-2xl">
            VANI didn’t start as a hackathon idea. It started as two friends admitting, out loud,
            that they’d fallen for the exact thing they were supposed to be immune to — and deciding
            that if it could happen to them, it was happening to everyone.
          </p>
        </Reveal>
      </SectionTint>
    </>
  );
}
