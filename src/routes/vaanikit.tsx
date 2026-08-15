import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Download,
  Printer,
  Package,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Mic,
  Tv,
  BadgeCheck,
  Clock,
  Users,
  BookOpen,
  ArrowRight,
} from "lucide-react";
import { PageHeader } from "@/components/vani/PageHeader";

export const Route = createFileRoute("/vaanikit")({
  component: VaaniKitPage,
});

const FLASHCARDS = [
  {
    num: "01",
    en: { title: "Pause on the Spike", body: "If a post triggers sudden rage, panic, or instant vindication, halt. That emotional surge is the payload. Wait 10 seconds before your thumb moves." },
    hi: { title: "उभार पर रुकें", body: "अगर कोई पोस्ट अचानक गुस्सा, डर या 'मैं सही था' का भाव जगाए — वही असली हथियार है। अंगूठा चलाने से पहले दस सेकंड रुकें।" },
    tag: "Reflex Habit",
    color: "bg-sunny text-sunny-foreground",
  },
  {
    num: "02",
    en: { title: "Name the Source Out Loud", body: "Ask: 'Who exactly created this, and how would they know?' If you cannot answer both, you don't have news — you have hearsay with graphics." },
    hi: { title: "स्रोत का नाम बोलकर कहें", body: "यह कह कौन रहा है, और उसे पता कैसे चला? दोनों का जवाब न हो तो यह जानकारी नहीं, ग्राफ़िक्स वाली अफ़वाह है।" },
    tag: "Source Check",
    color: "bg-tangerine text-tangerine-foreground",
  },
  {
    num: "03",
    en: { title: "Listen to the Tail", body: "In voice notes, the last second of each sentence betrays synthetic cloning: flat monotone cadence, zero natural breath, no room acoustics." },
    hi: { title: "अंत सुनें", body: "वॉइस नोट में हर वाक्य का आख़िरी क्षण क्लोनिंग खोल देता है: एक जैसा गिरता सुर, न साँस, न कमरे की गूँज।" },
    tag: "Audio Forensics",
    color: "bg-teal text-teal-foreground",
  },
  {
    num: "04",
    en: { title: "Reverse-Search the Visual", body: "Long-press or reverse-search breaking photos. The vast majority of viral disaster images are 5+ years old and from entirely different regions." },
    hi: { title: "तस्वीर उलट कर खोजें", body: "लॉन्ग-प्रेस कर इमेज से खोजें। ज़्यादातर 'ताज़ा' तस्वीरें बरसों पुरानी और किसी और जगह की होती हैं।" },
    tag: "Visual Verification",
    color: "bg-grape text-grape-foreground",
  },
  {
    num: "05",
    en: { title: "Forward the Tell, Not the Clip", body: "When you catch a fake, forward the specific forensic reason why it is fabricated. Forwarding the original to 'warn' others only amplifies spread." },
    hi: { title: "पहचान भेजें, क्लिप नहीं", body: "जब नकली पकड़ लें, तो ग्रुप में वजह भेजें कि यह फ़र्ज़ी क्यों है। चेतावनी के नाम पर फ़र्ज़ी क्लिप भेजना उसे और फैलाता है।" },
    tag: "Harm Reduction",
    color: "bg-forest text-forest-foreground",
  },
  {
    num: "06",
    en: { title: "Money Never Requires a PIN", body: "Entering a UPI PIN or banking credential ONLY transfers money out. No legitimate scholarship, grant, or government relief ever asks for a PIN to receive." },
    hi: { title: "पैसे पाने के लिए पिन नहीं चाहिए", body: "UPI पिन या बैंकिंग पासवर्ड डालने से पैसा केवल कटता है। कोई भी सरकारी योजना या अनुदान पैसे देने के लिए पिन नहीं माँगता।" },
    tag: "Financial Defense",
    color: "bg-sunny text-sunny-foreground",
  },
];

const WORKSHOP_STEPS = [
  {
    time: "00 — 10 MIN",
    phase: "Icebreaker",
    title: "The 'Urgent WhatsApp' Live Simulation",
    desc: "Facilitator reads an urgent fabricated audio note pretending to be a panicked family member. Ask the room who would forward right away before checking. Reveal how fear hijacks logic in under 3 seconds.",
  },
  {
    time: "10 — 25 MIN",
    phase: "Dissection",
    title: "Forensics Pair-Play: Scammer vs Auditor",
    desc: "Split into pairs. One player crafts an emotional manipulation hook (welfare grant, viral panic, local curfew), while the second audits for the 3 tells: voice cadence tail, domain URL oddities, and missing authority.",
  },
  {
    time: "25 — 35 MIN",
    phase: "Benchmark",
    title: "Oral Resilience Score Challenge",
    desc: "Test participants with 5 rapid scenarios. Score participants based on pause duration, source interrogation, and avoidance of reflex shares. Target benchmark: 8/10 resilience score.",
  },
  {
    time: "35 — 45 MIN",
    phase: "Action",
    title: "Community Anchor Pledge & Card Distribution",
    desc: "Every attendee receives the printed pocket cards and commits to being the designated 'Verification Anchor' for their family WhatsApp groups.",
  },
];

function VaaniKitPage() {
  const [lang, setLang] = useState<"en" | "hi">("en");

  return (
    <div className="mx-auto max-w-6xl space-y-12 px-4 py-8 sm:px-6">
      <PageHeader
        badge="OFFLINE MIL PLAYBOOK"
        badgeTone="sunny"
        title="VaaniKit: The Offline Educator & Youth Toolkit"
        subtitle="Bring the VANI behavioral reflex loop into community halls, colleges, and rural classrooms — no internet connection required."
      />

      {/* Action Bar */}
      <div className="card-pop flex flex-col items-center justify-between gap-4 bg-sunny p-6 sm:flex-row">
        <div className="space-y-1 text-center sm:text-left">
          <div className="flex items-center justify-center gap-2 font-display text-2xl font-bold sm:justify-start">
            <Package className="h-7 w-7 text-foreground" />
            <span>Download Official VaaniKit Playbook</span>
          </div>
          <p className="text-sm font-semibold text-foreground/80">
            UNESCO Youth Hackathon 2026 Edition • 2-Page High-Res Printable PDF (Vector A4)
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href="/VaaniKit.pdf"
            download="VaaniKit-UNESCO-Playbook.pdf"
            className="inline-flex items-center gap-2 rounded-full border-[3px] border-foreground bg-card px-5 py-3 text-sm font-black shadow-pop transition hover:-translate-y-0.5 hover:bg-cream"
          >
            <Download className="h-4 w-4" />
            Download PDF
          </a>
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 rounded-full border-[3px] border-foreground bg-tangerine px-5 py-3 text-sm font-black text-foreground shadow-pop transition hover:-translate-y-0.5 hover:bg-sunny"
          >
            <Printer className="h-4 w-4" />
            Print Playbook
          </button>
        </div>
      </div>

      {/* Section 1: The Core Philosophy */}
      <div className="grid gap-6 md:grid-cols-3">
        <div className="card-pop space-y-3 bg-card p-6">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border-[3px] border-foreground bg-teal text-teal-foreground">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-bold">1. Impulse Over Fact</h3>
          <p className="text-sm text-foreground/85">
            Traditional MIL teaches fact-checking libraries that take 10 minutes. VaaniKit teaches the <strong>10-second reflex freeze</strong> — stopping the thumb before the forward is sent.
          </p>
        </div>

        <div className="card-pop space-y-3 bg-card p-6">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border-[3px] border-foreground bg-tangerine text-tangerine-foreground">
            <Users className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-bold">2. The Ripple Multiplier</h3>
          <p className="text-sm text-foreground/85">
            One trained youth becomes the shield for their whole family. When an elderly relative forwards a fake scheme, the trained youth replies with the tell, not shame.
          </p>
        </div>

        <div className="card-pop space-y-3 bg-card p-6">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border-[3px] border-foreground bg-grape text-grape-foreground">
            <Sparkles className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-bold">3. Zero Connectivity Barrier</h3>
          <p className="text-sm text-foreground/85">
            Designed specifically for tier-2/tier-3 classrooms and grassroots centres where live cloud servers or high-speed Wi-Fi may be intermittent or unavailable.
          </p>
        </div>
      </div>

      {/* Section 2: The 6 Golden Flashcards */}
      <div className="space-y-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <span className="rounded-full border-2 border-foreground bg-sunny px-3 py-1 text-xs font-black uppercase">
              Classroom Posters
            </span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight">The 6 Golden Verification Flashcards</h2>
            <p className="text-sm text-foreground/75">
              Printable rules to pin on classroom boards, youth clubs, and community hubs.
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-full border-[3px] border-foreground bg-card p-1">
            <button
              onClick={() => setLang("en")}
              className={`rounded-full px-4 py-1.5 text-xs font-black transition ${
                lang === "en" ? "bg-sunny text-foreground" : "text-foreground/70"
              }`}
            >
              English
            </button>
            <button
              onClick={() => setLang("hi")}
              className={`rounded-full px-4 py-1.5 text-xs font-black transition ${
                lang === "hi" ? "bg-sunny text-foreground" : "text-foreground/70"
              }`}
            >
              हिंदी (Hindi)
            </button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {FLASHCARDS.map((card) => {
            const content = lang === "hi" ? card.hi : card.en;
            return (
              <div key={card.num} className="card-pop flex flex-col justify-between bg-card p-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-display text-2xl font-black text-foreground/40">#{card.num}</span>
                    <span className={`rounded-full border-2 border-foreground px-2.5 py-0.5 text-xs font-bold ${card.color}`}>
                      {card.tag}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold">{content.title}</h3>
                  <p className="text-sm leading-relaxed text-foreground/85">{content.body}</p>
                </div>
                <div className="mt-6 flex items-center gap-2 border-t-2 border-border pt-4 text-xs font-bold text-foreground/60">
                  <CheckCircle2 className="h-4 w-4 text-forest" />
                  <span>VANI Verified Rule</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Section 3: The 3 Archetypes Dissected */}
      <div className="space-y-6">
        <div>
          <span className="rounded-full border-2 border-foreground bg-tangerine px-3 py-1 text-xs font-black uppercase">
            Threat Landscape
          </span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight">The 3 Synthetic Villains</h2>
          <p className="text-sm text-foreground/75">
            How to teach youth to spot generative AI manipulation before they get fooled.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="card-pop space-y-4 bg-teal/10 p-6 border-[3px] border-foreground">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl border-[3px] border-foreground bg-teal p-3 text-teal-foreground">
                <Mic className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold">The Familiar Voice</h3>
                <span className="text-xs font-bold text-teal">Voice Cloning / Deepfake</span>
              </div>
            </div>
            <p className="text-sm text-foreground/85">
              Urgent request for money or a verification code sounding just like a brother, friend, or employer.
            </p>
            <div className="rounded-xl border-2 border-foreground bg-card p-3 text-xs shadow-sm">
              <strong className="text-teal font-bold block mb-1">THE TELL:</strong>
              Listen to the tail of each sentence. Clones lack natural breath drops and room reverberation.
            </div>
          </div>

          <div className="card-pop space-y-4 bg-tangerine/10 p-6 border-[3px] border-foreground">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl border-[3px] border-foreground bg-tangerine p-3 text-tangerine-foreground">
                <Tv className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold">The Breaking Anchor</h3>
                <span className="text-xs font-bold text-tangerine">Synthetic News Desk</span>
              </div>
            </div>
            <p className="text-sm text-foreground/85">
              Glossy newsroom setup reporting an alleged curfew, bank collapse, or examination cancellation.
            </p>
            <div className="rounded-xl border-2 border-foreground bg-card p-3 text-xs shadow-sm">
              <strong className="text-tangerine font-bold block mb-1">THE TELL:</strong>
              Unnatural mouth borders, synchronisation lags with teeth, and missing national broadcaster names.
            </div>
          </div>

          <div className="card-pop space-y-4 bg-grape/10 p-6 border-[3px] border-foreground">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl border-[3px] border-foreground bg-grape p-3 text-grape-foreground">
                <BadgeCheck className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold">The Kind Official</h3>
                <span className="text-xs font-bold text-grape">Phishing Exploitation</span>
              </div>
            </div>
            <p className="text-sm text-foreground/85">
              A seemingly benevolent announcement about ₹50,000 youth grants, free laptops, or instant loans.
            </p>
            <div className="rounded-xl border-2 border-foreground bg-card p-3 text-xs">
              <strong className="text-grape font-bold block mb-1">THE TELL:</strong>
              Government seals combined with unofficial web domains (.xyz, .tk) and requests for advance fee / UPI PIN.
            </div>
          </div>
        </div>
      </div>

      {/* Section 4: 45-Minute Offline Workshop Guide */}
      <div className="card-pop space-y-6 bg-card p-6 sm:p-8">
        <div className="flex flex-col justify-between gap-4 border-b-2 border-border pb-6 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-tangerine" />
              <span className="text-xs font-black uppercase text-tangerine">Educator Lesson Plan</span>
            </div>
            <h2 className="mt-1 font-display text-2xl font-bold sm:text-3xl">45-Minute Offline Classroom Blueprint</h2>
          </div>
          <span className="rounded-full border-[3px] border-foreground bg-sunny px-4 py-1.5 text-xs font-black">
            Ready to Teach
          </span>
        </div>

        <div className="grid gap-4">
          {WORKSHOP_STEPS.map((step, idx) => (
            <div
              key={step.time}
              className="flex flex-col gap-4 rounded-2xl border-2 border-foreground bg-background/50 p-4 transition hover:bg-background sm:flex-row sm:items-center"
            >
              <div className="flex items-center gap-3 sm:w-48 sm:flex-col sm:items-start sm:gap-1">
                <span className="font-display text-sm font-bold text-foreground/60">{step.time}</span>
                <span className="rounded-full border border-foreground bg-card px-2 py-0.5 text-xs font-black text-foreground">
                  {step.phase}
                </span>
              </div>
              <div className="flex-1 space-y-1">
                <h4 className="text-base font-bold text-foreground">{step.title}</h4>
                <p className="text-sm text-foreground/80">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action Footer */}
      <div className="card-pop flex flex-col items-center justify-between gap-6 bg-tangerine p-8 text-center text-foreground sm:flex-row sm:text-left">
        <div className="space-y-2">
          <h3 className="font-display text-2xl font-black">Ready to test the digital simulator?</h3>
          <p className="max-w-xl text-sm font-semibold text-foreground/85">
            Experience the live 5-stage VANI loop directly in your browser with multilingual scenarios in Hindi, Marathi, and Tamil.
          </p>
        </div>
        <a
          href="/simulator"
          className="inline-flex items-center gap-2 rounded-full border-[3px] border-foreground bg-sunny px-6 py-3 text-sm font-black text-foreground shadow-pop transition hover:-translate-y-0.5 hover:bg-cream"
        >
          <span>Launch Simulator</span>
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
