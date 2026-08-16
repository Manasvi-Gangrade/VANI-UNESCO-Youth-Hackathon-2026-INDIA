import { createFileRoute } from "@tanstack/react-router";

import { Accordion, ColourBlockBanner, PillButton, Reveal, SectionTint } from "@/components/vani/ui";
import { Squiggle, Sunburst, TealCircle } from "@/components/vani/Decor";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "You Might Be Wondering — FAQ | Project VANI" },
      {
        name: "description",
        content:
          "Isn't this just another anti-misinformation app? Can two people build it? Why would it work? Straight answers.",
      },
      { property: "og:title", content: "You Might Be Wondering — Project VANI" },
      {
        property: "og:description",
        content: "The three questions everyone asks about Project VANI, answered honestly.",
      },
    ],
  }),
  component: Faq,
});

const ITEMS = [
  {
    q: "Isn’t this just another anti-misinformation app?",
    a: "Fair question. Most tools tell you what's fake after you've already seen it. VANI catches you in the moment you're about to act on it — that's a completely different, and much harder, problem to solve.",
  },
  {
    q: "Can two people really build this in time?",
    a: "Not the whole vision — not yet. But the core loop (feed, freeze, reveal, score) is a small, well-scoped build we can prototype quickly, and we're treating it as version one of something meant to grow.",
  },
  {
    q: "Why should this work when awareness campaigns haven’t?",
    a: "Because it doesn't ask anyone to sit through a lecture. It meets people inside the exact habit — scrolling — that got them into trouble in the first place.",
  },
];

function Faq() {
  return (
    <>
      <div className="relative overflow-hidden border-b-[3px] border-foreground bg-sunny">
        <Sunburst className="right-[8%] top-4 h-16 w-16" />
        <TealCircle className="left-[5%] bottom-2 h-12 w-12" delay={0.9} />
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <ColourBlockBanner tone="tangerine" size="lg">
            You Might Be Wondering...
          </ColourBlockBanner>
        </div>
      </div>

      <SectionTint>
        <div className="relative mx-auto max-w-3xl">
          <Squiggle className="-top-8 right-0 h-8 w-24 opacity-70" />
          <Accordion items={ITEMS} />
        </div>
      </SectionTint>

      <SectionTint tinted>
        <Reveal>
          <div className="text-center">
            <p className="font-display text-2xl sm:text-3xl">Still curious? Just play it.</p>
            <div className="mt-6">
              <PillButton to="/simulator" tone="grape" className="text-lg">
                Try the Simulator →
              </PillButton>
            </div>
          </div>
        </Reveal>
      </SectionTint>
    </>
  );
}
