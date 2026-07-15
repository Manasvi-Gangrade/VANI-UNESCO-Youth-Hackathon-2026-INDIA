import { createFileRoute } from "@tanstack/react-router";
import {
  FileText,
  Video,
  Github,
  Link2,
  ExternalLink,
  ShieldAlert,
  Award,
  Users,
  Target,
  Globe,
  BookOpen,
  Sparkles,
  Layers,
  HelpCircle,
  CheckCircle2,
} from "lucide-react";

import { ColourBlockBanner, PillButton, Reveal, SectionTint } from "@/components/vani/ui";
import { Clover, Sunburst, TealCircle } from "@/components/vani/Decor";

export const Route = createFileRoute("/proposal")({
  head: () => ({
    meta: [
      { title: "UNESCO Youth Hackathon Proposal 2026 — Project VANI" },
      {
        name: "description",
        content:
          "Official UNESCO Youth Hackathon 2026 proposal: Play Your Part — Youth Designing the Future of Media and Information Literacy.",
      },
    ],
  }),
  component: ProposalPage,
});

const DELIVERABLES = [
  {
    icon: <Video className="h-5 w-5" />,
    title: "Video Presentation",
    url: "https://drive.google.com/drive/folders/1eEURK2jyGT6DxL23uoxSBw0S9a-epPkA?usp=sharing",
  },
  {
    icon: <Github className="h-5 w-5" />,
    title: "MVP POC GitHub Repo",
    url: "https://github.com/Manasvi-Gangrade/VANI-UNESCO-Youth-Hackathon-2026-INDIA",
  },
  {
    icon: <Link2 className="h-5 w-5" />,
    title: "Deployed Live Application",
    url: "https://vani-verification-algorithmic-liter.vercel.app",
  },
  {
    icon: <FileText className="h-5 w-5" />,
    title: "Research Paper on ResearchGate",
    url: "https://www.researchgate.net/publication/412304955_VANI_A_Behavioural_Simulation_Framework_for_Multilingual_Media_and_Information_Literacy_in_the_Age_of_Generative_AI",
  },
  {
    icon: <ExternalLink className="h-5 w-5" />,
    title: "Additional Deliverables & Assets",
    url: "https://drive.google.com/drive/folders/1qHS26BenA5j-EFgkCyowmilLbKb28bNh?usp=sharing",
  },
];

const DATA_POINTS = [
  {
    stat: "88% vs 17%",
    label: "UNESCO Closing the Gaps (2025)",
    desc: "88% of countries recognise MIL in policy, but only 17% have adopted a stand-alone dedicated policy.",
  },
  {
    stat: "62%",
    label: "UNESCO Behind the Screens (2024)",
    desc: "62% of digital content creators surveyed across 45 countries do not fact-check before posting.",
  },
  {
    stat: "45–50%",
    label: "NIST Research / UNESCO (2025–2026)",
    desc: "Deepfake-detection tools lose 45–50% accuracy once deployed outside lab conditions onto real internet feeds.",
  },
  {
    stat: "Skewed",
    label: "UNESCO Multilingualism Roadmap",
    desc: "Content moderation systems remain disproportionately optimised for high-resource Western languages, leaving regional Indian dialects in a blind spot.",
  },
];

const JUDGING_CRITERIA = [
  {
    criteria: "Consistency with Theme",
    detail: "Directly tackles the policy-to-practice gap in MIL that UNESCO's own research identifies.",
    tone: "bg-sunny",
  },
  {
    criteria: "Clarity of Presentation",
    detail: "One clear concept, explained through a simple, familiar app experience.",
    tone: "bg-teal",
  },
  {
    criteria: "Innovation & Creativity",
    detail: "Shifts MIL from passive quizzes to active, behaviour-based simulation.",
    tone: "bg-tangerine",
  },
  {
    criteria: "Feasibility & Sustainability",
    detail: "Free-tier, open-source, single codebase build that any team can maintain and scale.",
    tone: "bg-forest",
  },
  {
    criteria: "Impact & Inclusion",
    detail: "Targets underserved regional-language youth left out of both traditional MIL and current moderation systems.",
    tone: "bg-grape text-white",
  },
];

function ProposalPage() {
  return (
    <>
      {/* Header Banner */}
      <div className="relative overflow-hidden border-b-[3px] border-foreground bg-sunny">
        <TealCircle className="right-[8%] top-6 h-14 w-14" />
        <Clover className="left-[4%] bottom-2 h-16 w-16" delay={1} />
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <p className="mb-3 inline-block rounded-full border-[3px] border-foreground bg-card px-4 py-1 text-xs font-black tracking-[0.2em] uppercase">
            UNESCO YOUTH HACKATHON 2026
          </p>
          <ColourBlockBanner tone="tangerine" size="lg">
            Play Your Part: Youth Designing the Future of Media and Information Literacy
          </ColourBlockBanner>
          <p className="mt-4 font-display text-xl sm:text-2xl">
            Project VANI — Verification &amp; Algorithmic Literacy Network Initiative
          </p>
        </div>
      </div>

      {/* Team & Links Quick Ribbon */}
      <SectionTint>
        <div className="grid gap-6 md:grid-cols-2">
          {/* Team Box */}
          <div className="rounded-3xl border-[3px] border-foreground bg-card p-6 shadow-pop">
            <h3 className="flex items-center gap-2 font-display text-xl text-tangerine">
              <Users className="h-5 w-5" /> Team Members
            </h3>
            <div className="mt-4 space-y-4">
              <div className="rounded-2xl border-[2px] border-foreground bg-sunny/30 p-4">
                <p className="font-display text-lg">Manasvi Gangrade — <span className="text-tangerine uppercase text-xs font-black">Team Lead</span></p>
                <p className="mt-1 text-sm italic text-muted-foreground">
                  “Heyyaaa I am Manasvi, and I contributed to the strategy, and overall project direction, Development and Designing.”
                </p>
              </div>
              <div className="rounded-2xl border-[2px] border-foreground bg-teal/20 p-4">
                <p className="font-display text-lg">Suhani Sharma — <span className="text-teal uppercase text-xs font-black">Co-Lead</span></p>
                <p className="mt-1 text-sm italic text-muted-foreground">
                  “Hello ! I am Suhani and I worked with Concept development, content design, and presentation.”
                </p>
              </div>
            </div>
          </div>

          {/* Quick Deliverables */}
          <div className="rounded-3xl border-[3px] border-foreground bg-card p-6 shadow-pop">
            <h3 className="flex items-center gap-2 font-display text-xl text-teal">
              <Link2 className="h-5 w-5" /> Deliverables &amp; Links
            </h3>
            <div className="mt-4 space-y-2.5">
              {DELIVERABLES.map((d) => (
                <a
                  key={d.title}
                  href={d.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between rounded-xl border-[2px] border-foreground bg-background p-3 transition-transform hover:-translate-y-0.5"
                >
                  <span className="flex items-center gap-2 text-sm font-bold">
                    {d.icon} {d.title}
                  </span>
                  <ExternalLink className="h-4 w-4 text-muted-foreground" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </SectionTint>

      {/* Opening Hook Question */}
      <SectionTint tinted>
        <Reveal>
          <div className="rounded-3xl border-[4px] border-grape bg-cream p-6 shadow-pop sm:p-10">
            <p className="font-display text-xs font-black tracking-[0.2em] uppercase text-tangerine">
              A Question, Before Anything Else
            </p>
            <h2 className="mt-2 font-display text-2xl leading-snug sm:text-3xl">
              “Quick honest question: the last time something online made you pause — a video, a voice note, a ‘breaking news’ post — how did you decide whether to trust it?”
            </h2>
            <p className="mt-4 text-base leading-relaxed sm:text-lg">
              Chances are, you didn’t check a source. You felt something, and you scrolled on. That single, split-second moment — not the classroom, not the textbook — is where most of us actually learn, or fail to learn, media literacy. <strong>Project VANI starts exactly there.</strong>
            </p>
          </div>
        </Reveal>
      </SectionTint>

      {/* Problem Statement */}
      <SectionTint>
        <ColourBlockBanner tone="tangerine">Problem Statement: Why MIL Isn't Working</ColourBlockBanner>
        <div className="mt-6 space-y-6 text-base leading-relaxed sm:text-lg">
          <p>
            Media and Information Literacy (MIL) has become one of the most urgent life skills of our generation — right up there with reading and arithmetic. Nearly every government in the world has said, on paper, that it matters. So why do so many of us still fall for a fake voice note from a “relative,” or share a video before checking if it’s even real?
          </p>
          <p className="font-bold text-foreground">
            The honest answer: because the way MIL is taught was built for a world that no longer exists.
          </p>
          
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border-[3px] border-foreground bg-sunny p-5 shadow-pop">
              <p className="font-display text-3xl">88% vs 17%</p>
              <p className="mt-2 text-sm">
                88% of UNESCO Member States recognise MIL in policy — but only 17% have a standalone MIL policy. (UNESCO, Closing the Gaps, 2025)
              </p>
            </div>
            <div className="rounded-2xl border-[3px] border-foreground bg-teal p-5 shadow-pop">
              <p className="font-display text-3xl">+560% AI Growth</p>
              <p className="mt-2 text-sm">
                Generative AI market projected to grow 560% by 2031 while deepfake tools lose 45–50% accuracy outside labs. (NIST / UNESCO 2025)
              </p>
            </div>
          </div>

          <div className="space-y-4 rounded-2xl border-[3px] border-foreground bg-card p-6 shadow-pop">
            <h4 className="font-display text-xl text-tangerine">The New Reality</h4>
            <ul className="space-y-3 text-sm sm:text-base">
              <li className="flex items-start gap-3">
                <ShieldAlert className="h-5 w-5 shrink-0 text-tangerine mt-1" />
                <div>
                  <strong>Creators are the new gatekeepers:</strong> UNESCO's 2024 Behind the Screens study found 62% of digital creators don't fact-check before posting, and 42% judge trust purely by likes and shares.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Globe className="h-5 w-5 shrink-0 text-teal mt-1" />
                <div>
                  <strong>Regional language blind spot:</strong> Content-moderation systems remain heavily skewed toward Western languages. Swahili and Indian regional languages are frequently left undefended.
                </div>
              </li>
            </ul>
          </div>
        </div>
      </SectionTint>

      {/* Objectives & Target Audience */}
      <SectionTint tinted>
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Objectives */}
          <div>
            <ColourBlockBanner tone="teal">Project Objectives</ColourBlockBanner>
            <div className="mt-6 space-y-3">
              {[
                "Shift MIL evaluation from rote, text-based testing to real, behaviour-based learning.",
                "Build youth resilience against AI-generated (synthetic) misinformation in audio-visual formats.",
                "Close the regional-language gap by delivering MIL training natively in Indian regional dialects (Hindi, Marathi, Tamil).",
                "Create a low-cost, open-source model that any educator or youth organisation can adopt.",
              ].map((obj, i) => (
                <div key={i} className="flex items-start gap-3 rounded-2xl border-[2px] border-foreground bg-card p-4 shadow-pop">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-teal mt-0.5" />
                  <p className="text-sm font-bold sm:text-base">{obj}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Target Audience */}
          <div>
            <ColourBlockBanner tone="sunny">Target Audience</ColourBlockBanner>
            <div className="mt-6 space-y-4">
              <div className="rounded-2xl border-[3px] border-foreground bg-card p-5 shadow-pop">
                <p className="font-display text-lg text-tangerine">Primary</p>
                <p className="mt-1 text-sm">Regional-language youth aged 18–30 in India, starting with Hindi, Marathi, and Tamil-speaking communities.</p>
              </div>
              <div className="rounded-2xl border-[3px] border-foreground bg-card p-5 shadow-pop">
                <p className="font-display text-lg text-teal">Secondary</p>
                <p className="mt-1 text-sm">Educators, community leaders, and youth organisations who lack tools to teach MIL beyond textbook definitions.</p>
              </div>
              <div className="rounded-2xl border-[3px] border-foreground bg-card p-5 shadow-pop">
                <p className="font-display text-lg text-grape">Long-term</p>
                <p className="mt-1 text-sm">Regional and indigenous-language youth communities globally, following the same modular model.</p>
              </div>
            </div>
          </div>
        </div>
      </SectionTint>

      {/* The 5 Core Components */}
      <SectionTint>
        <ColourBlockBanner tone="grape">The Five Core Components of VANI</ColourBlockBanner>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "1. VaaniFeed", desc: "A scrolling interface built to feel indistinguishable from daily social apps in regional languages.", tone: "bg-sunny" },
            { title: "2. The Freeze", desc: "The feed gently pauses the instant a user tries to like or share synthetic misinformation — no shame, just a calm pause.", tone: "bg-tangerine text-white" },
            { title: "3. The Reveal", desc: "Breaks down in plain language exactly what gave the content away (lip sync, voice pitch, timestamp mismatch).", tone: "bg-teal text-white" },
            { title: "4. Resilience Score", desc: "A simple, shareable score quantifying critical thinking and decision accuracy.", tone: "bg-forest text-white" },
            { title: "5. VaaniKit", desc: "An offline-friendly downloadable playbook allowing educators to host workshops without internet.", tone: "bg-grape text-white" },
          ].map((c) => (
            <div key={c.title} className={`rounded-2xl border-[3px] border-foreground p-5 shadow-pop ${c.tone}`}>
              <h4 className="font-display text-xl">{c.title}</h4>
              <p className="mt-2 text-sm leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </SectionTint>

      {/* Three Characters Lineup */}
      <SectionTint tinted>
        <ColourBlockBanner tone="tangerine">Meet the Three Antagonist Characters</ColourBlockBanner>
        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          <div className="rounded-2xl border-[3px] border-foreground bg-card p-5 shadow-pop">
            <h4 className="font-display text-lg text-tangerine">The Familiar Voice</h4>
            <p className="mt-2 text-xs text-muted-foreground">Cloned voice note sounding like a relative asking for urgent money or links.</p>
          </div>
          <div className="rounded-2xl border-[3px] border-foreground bg-card p-5 shadow-pop">
            <h4 className="font-display text-lg text-teal">The Breaking Newsreader</h4>
            <p className="mt-2 text-xs text-muted-foreground">Polished, professional news anchor clip reporting fabricated events.</p>
          </div>
          <div className="rounded-2xl border-[3px] border-foreground bg-card p-5 shadow-pop">
            <h4 className="font-display text-lg text-grape">The Kind Official</h4>
            <p className="mt-2 text-xs text-muted-foreground">Fabricated scheme announcement offering instant money for sharing.</p>
          </div>
        </div>
      </SectionTint>

      {/* Judging Criteria Table */}
      <SectionTint>
        <ColourBlockBanner tone="sunny">Alignment with UNESCO Judging Criteria</ColourBlockBanner>
        <div className="mt-8 overflow-hidden rounded-2xl border-[3px] border-foreground shadow-pop">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-[3px] border-foreground bg-sunny p-4 font-display text-lg">
                <th className="p-4 border-r-[3px] border-foreground">Judging Criteria</th>
                <th className="p-4">Project VANI Alignment</th>
              </tr>
            </thead>
            <tbody>
              {JUDGING_CRITERIA.map((j, idx) => (
                <tr key={j.criteria} className={idx % 2 === 0 ? "bg-card" : "bg-cream"}>
                  <td className="p-4 font-display font-bold border-r-[3px] border-foreground border-t-[2px] border-foreground">
                    {j.criteria}
                  </td>
                  <td className="p-4 text-sm sm:text-base border-t-[2px] border-foreground">
                    {j.detail}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionTint>
    </>
  );
}
