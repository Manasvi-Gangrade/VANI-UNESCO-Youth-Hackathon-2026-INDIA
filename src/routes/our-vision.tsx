import { createFileRoute } from "@tanstack/react-router";
import { Languages, Layers, Leaf, ShieldCheck } from "lucide-react";

import { ColourBlockBanner, Reveal, SectionTint, StatCallout } from "@/components/vani/ui";
import { Clover, OrangeHalf, TealCircle } from "@/components/vani/Decor";

export const Route = createFileRoute("/our-vision")({
  head: () => ({
    meta: [
      { title: "Our Vision — Built once, meant for everyone | Project VANI" },
      {
        name: "description",
        content:
          "A modular content library so new languages are added by editing content, not rebuilding the app. Pilot in Hindi, Marathi and Tamil.",
      },
      { property: "og:title", content: "Our Vision — Project VANI" },
      {
        property: "og:description",
        content: "121 languages, 19,500 mother tongues — one codebase built to travel.",
      },
    ],
  }),
  component: Vision,
});

const BLOCKS = [
  {
    icon: <Languages className="h-7 w-7" />,
    title: "Pilot languages",
    text: "VANI launches in Hindi, Marathi and Tamil — chosen because they cover very different scripts, speech patterns and manipulation styles, which stress-tests the format properly.",
    cls: "bg-teal text-teal-foreground",
  },
  {
    icon: <Layers className="h-7 w-7" />,
    title: "Modular content library",
    text: "Every post, caption and reveal lives in a language content file, separate from the app logic. Adding Bhojpuri or Swahili means writing a new content library — not rebuilding a single screen.",
    cls: "bg-tangerine text-tangerine-foreground",
  },
  {
    icon: <Leaf className="h-7 w-7" />,
    title: "Sustainability",
    text: "Free-tier hosting, a single open-source codebase, no backend or user data to maintain. The running cost of keeping VANI alive for a year is effectively zero.",
    cls: "bg-forest text-forest-foreground",
  },
];

function Vision() {
  return (
    <>
      <div className="relative overflow-hidden border-b-[3px] border-foreground bg-sunny">
        <TealCircle className="left-[6%] top-6 h-14 w-14" />
        <OrangeHalf className="right-[10%] bottom-0 h-10 w-20" delay={0.7} />
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <ColourBlockBanner tone="tangerine" size="lg">
            Built once. Meant for everyone.
          </ColourBlockBanner>
        </div>
      </div>

      <SectionTint>
        <div className="max-w-3xl">
          <StatCallout tone="sunny" label="Scale of the problem">
            India alone is home to 121 languages spoken by 10,000+ people, and over 19,500 recorded
            mother tongues (Census of India).
          </StatCallout>
        </div>
      </SectionTint>

      <SectionTint tinted>
        <ColourBlockBanner tone="teal">How it scales</ColourBlockBanner>
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {BLOCKS.map((b, i) => (
            <Reveal key={b.title} delay={i * 90}>
              <div className="card-pop wiggle-on-hover h-full bg-card p-6">
                <span
                  className={`wiggle-target mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl border-[3px] border-foreground ${b.cls}`}
                >
                  {b.icon}
                </span>
                <h3 className="font-display text-xl">{b.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{b.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </SectionTint>

      <SectionTint>
        <div className="relative">
          <Clover className="right-[4%] -top-6 h-16 w-16" />
          <ColourBlockBanner tone="sunny">
            Where the “fake” content actually comes from
          </ColourBlockBanner>
          <Reveal>
            <div className="mt-8 rounded-3xl border-[4px] border-grape bg-card p-7 shadow-pop">
              <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl border-[3px] border-foreground bg-grape text-grape-foreground">
                <ShieldCheck className="h-6 w-6" />
              </span>
              <p className="leading-relaxed">
                Every synthetic post inside VANI is written and reviewed by our team. They are
                modelled on real, documented manipulation patterns — cloned voice urgency, fabricated
                broadcast framing, benevolent-scheme scams — but they never depict real people, real
                organisations or real events, and no real person’s likeness or voice is used without
                consent. The tells are real; the content is deliberately fictional and generic.
              </p>
            </div>
          </Reveal>
        </div>
      </SectionTint>
    </>
  );
}
