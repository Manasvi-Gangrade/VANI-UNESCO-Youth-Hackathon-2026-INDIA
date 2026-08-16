import { createFileRoute } from "@tanstack/react-router";

import problemImg from "@/assets/problem-illustration.jpg";
import { ColourBlockBanner, Reveal, SectionTint, StatCallout } from "@/components/vani/ui";
import { OrangeHalf, Squiggle, Sunburst } from "@/components/vani/Decor";

export const Route = createFileRoute("/the-problem")({
  head: () => ({
    meta: [
      { title: "The Problem — Why MIL isn't working | Project VANI" },
      {
        name: "description",
        content:
          "The policy-to-practice gap, the AI shift, the creator gap and the language gap: why media literacy is failing young people right now.",
      },
      { property: "og:title", content: "The Problem — Project VANI" },
      {
        property: "og:description",
        content:
          "88% of UNESCO Member States recognise MIL in policy. Only 17% have a stand-alone one.",
      },
    ],
  }),
  component: Problem,
});

const SECTIONS = [
  {
    title: "The policy-to-practice gap",
    body: "88% of UNESCO's 194 Member States recognise Media and Information Literacy somewhere in policy, but only 17% have a stand-alone MIL policy. Even where it exists on paper, most classrooms still test rote definitions — 'what is misinformation?' — instead of testing behaviour in the place behaviour actually happens: a feed, at speed, with a share button one thumb-width away.",
    stat: "88% recognise MIL in policy. Only 17% have a stand-alone one.",
    tone: "sunny" as const,
  },
  {
    title: "The AI / deepfake shift",
    body: "The generative AI market is projected to grow roughly 560% between 2025 and 2031. Meanwhile deepfake-detection tools that look excellent in benchmarks lose 45–50% of their accuracy once they meet compressed, re-uploaded, real-world media. The defence is degrading exactly as the attack is scaling.",
    stat: "Deepfake detectors lose 45–50% accuracy outside lab conditions.",
    tone: "tangerine" as const,
  },
  {
    title: "The creator gap",
    body: "UNESCO's Behind the Screens study found that 62% of digital content creators do not fact-check before publishing, and 42% judge whether something is trustworthy by how many likes and shares it already has. The people young audiences trust most are, structurally, the least verified layer of the information system.",
    stat: "62% of creators don't fact-check. 42% judge trust by likes alone.",
    tone: "teal" as const,
  },
  {
    title: "The language gap",
    body: "UNESCO's Global Roadmap on Multilingualism describes moderation systems heavily skewed toward high-resource languages. In 2022, researchers documented Facebook approving ads containing ethnic-violence content in Swahili in Kenya — content that would almost certainly have been caught in English. Regional-language spaces are where the harm lands and where the watchers aren't looking.",
    stat: "Safety systems watch some languages far more closely than others.",
    tone: "forest" as const,
  },
];

function Problem() {
  return (
    <>
      <div className="relative overflow-hidden border-b-[3px] border-foreground bg-sunny">
        <Sunburst className="right-[6%] top-6 h-16 w-16" />
        <OrangeHalf className="left-[6%] bottom-0 h-10 w-20" delay={0.8} />
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <ColourBlockBanner tone="tangerine" size="lg">
            So, why isn’t MIL working the way it should?
          </ColourBlockBanner>
        </div>
      </div>

      <SectionTint>
        <Reveal>
          <img
            src={problemImg}
            alt="A young person holding a phone surrounded by suspicious headlines"
            loading="lazy"
            width={1024}
            height={768}
            className="mx-auto w-full max-w-3xl rounded-3xl border-[3px] border-foreground shadow-pop"
          />
        </Reveal>
      </SectionTint>

      {SECTIONS.map((s, i) => (
        <SectionTint key={s.title} tinted={i % 2 === 1}>
          <div className="relative">
            {i === 1 && <Squiggle className="right-2 -top-8 h-8 w-24 opacity-70" />}
            <Reveal>
              <h2 className="font-display text-2xl sm:text-4xl">{s.title}</h2>
              <p className="mt-4 max-w-3xl text-base leading-relaxed sm:text-lg">{s.body}</p>
            </Reveal>
            <div className="mt-6 max-w-2xl">
              <StatCallout tone={s.tone}>{s.stat}</StatCallout>
            </div>
          </div>
        </SectionTint>
      ))}

      <SectionTint>
        <Reveal>
          <div className="rounded-3xl border-[4px] border-grape bg-card p-7 shadow-pop sm:p-10">
            <p className="font-display text-xl leading-snug sm:text-3xl">
              Youth in regional-language digital spaces are being tested on definitions from a
              textbook, while the real danger they face is audio-visual, AI-generated, and often in
              a language no safety system is watching closely enough.
            </p>
          </div>
        </Reveal>
      </SectionTint>
    </>
  );
}
