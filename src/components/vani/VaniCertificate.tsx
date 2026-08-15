import { useState } from "react";
import { Award, Download, Printer, Share2, ShieldCheck, Check, Sparkles, User } from "lucide-react";
import { type Lang } from "@/data/feed";

interface VaniCertificateProps {
  score: number;
  caughtFakes: number;
  totalFakes: number;
  bestStreak: number;
  lang: Lang;
}

export function VaniCertificate({
  score,
  caughtFakes,
  totalFakes,
  bestStreak,
  lang,
}: VaniCertificateProps) {
  const [name, setName] = useState("Manasvi Gangrade");
  const [copied, setCopied] = useState(false);

  // Generate deterministic certificate hash
  const certId = `VANI-2026-IND-${Math.abs((score * 7919) ^ 48271).toString(16).toUpperCase().padStart(6, "0")}`;
  const dateStr = new Date().toLocaleDateString(lang === "hi" ? "hi-IN" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const shareText =
    lang === "hi"
      ? `मैंने प्रोजेक्ट वाणी (VANI) पर UNESCO यूथ हैकाथॉन AI सिमुलेटर में ${score}/100 रेज़िलिएंस स्कोर हासिल किया! क्या आप डीपफ़ेक और जाली खबरों को पकड़ सकते हैं? अभी जाँचें: https://vani-verification-algorithmic-liter.vercel.app`
      : `I just achieved a ${score}/100 Resilience Score on Project VANI's AI Misinformation Simulator (UNESCO Youth Hackathon 2026)! Test your digital reflex here: https://vani-verification-algorithmic-liter.vercel.app`;

  function shareWhatsApp() {
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`, "_blank");
  }

  return (
    <div className="mt-12 space-y-6">
      {/* Name Input & Action Bar */}
      <div className="card-pop flex flex-col sm:flex-row items-center justify-between gap-4 bg-sunny p-5">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-foreground bg-card">
            <User className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <label className="block text-xs font-black uppercase text-foreground/80">
              {lang === "hi" ? "प्रमाणपत्र पर अपना नाम लिखें:" : "Name for your Official Certificate:"}
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              className="mt-0.5 rounded-lg border-2 border-foreground bg-card px-3 py-1 text-sm font-bold text-foreground focus:outline-none focus:ring-2 focus:ring-tangerine"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto justify-end">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 rounded-full border-[3px] border-foreground bg-card px-4 py-2 text-xs font-black shadow-pop transition hover:-translate-y-0.5 hover:bg-cream"
          >
            <Printer className="h-4 w-4" />
            {lang === "hi" ? "प्रिंट / PDF सेव करें" : "Print / Save PDF"}
          </button>
          <button
            onClick={shareWhatsApp}
            className="inline-flex items-center gap-1.5 rounded-full border-[3px] border-foreground bg-[#25D366] px-4 py-2 text-xs font-black text-white shadow-pop transition hover:-translate-y-0.5"
          >
            <Share2 className="h-4 w-4" />
            {lang === "hi" ? "व्हाट्सएप पर शेयर करें" : "Share on WhatsApp"}
          </button>
        </div>
      </div>

      {/* The Printable Certificate Frame */}
      <div
        id="vani-certificate"
        className="relative overflow-hidden rounded-3xl border-[6px] border-foreground bg-[#FFFDF7] p-8 sm:p-12 shadow-lift text-center"
      >
        {/* Subtle Watermark Badge */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.03]">
          <span className="font-display text-[18rem] font-black">VANI</span>
        </div>

        {/* Top Header */}
        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between border-b-[3px] border-foreground/30 pb-6 gap-4">
          <div className="flex items-center gap-3 text-left">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border-[3px] border-foreground bg-sunny text-2xl shadow-pop">
              🏛️
            </div>
            <div>
              <span className="rounded-full bg-foreground px-2.5 py-0.5 text-[9px] font-black uppercase text-sunny">
                UNESCO YOUTH HACKATHON 2026 INDIA
              </span>
              <p className="font-display text-lg font-bold tracking-tight text-foreground">
                Project VANI Certification Board
              </p>
            </div>
          </div>
          <div className="text-center sm:text-right">
            <span className="font-mono text-xs font-bold text-foreground/60 block">CERTIFICATE ID</span>
            <span className="font-mono text-sm font-black text-foreground">{certId}</span>
          </div>
        </div>

        {/* Main Certificate Title */}
        <div className="relative z-10 my-8 space-y-3">
          <span className="inline-flex items-center gap-1.5 rounded-full border-2 border-foreground bg-tangerine/20 px-3 py-1 text-xs font-black uppercase text-foreground">
            <Sparkles className="h-3.5 w-3.5 text-tangerine" />
            VERIFIED MEDIA & INFORMATION LITERACY CREDENTIAL
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight">
            Certificate of Algorithmic Resilience
          </h2>
          <p className="text-sm sm:text-base font-semibold text-foreground/75 italic">
            This officially certifies that
          </p>
          <div className="inline-block border-b-[3px] border-foreground px-6 pb-2">
            <h3 className="font-display text-2xl sm:text-4xl font-black text-tangerine tracking-wide">
              {name || "Participant"}
            </h3>
          </div>
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-foreground/85 font-medium pt-2">
            has successfully completed the <strong>VANI Behavioral Media Simulation</strong>, demonstrating critical impulse delay, audio deepfake detection, and synthetic manipulation forensic skills with a verified score of:
          </p>
        </div>

        {/* Big Score Medal & Stats */}
        <div className="relative z-10 my-6 flex flex-wrap items-center justify-center gap-6">
          <div className="flex items-center gap-3 rounded-2xl border-[3px] border-foreground bg-sunny px-6 py-3 shadow-pop">
            <Award className="h-8 w-8 text-foreground" />
            <div className="text-left">
              <span className="font-display text-3xl font-black">{score}/100</span>
              <span className="block text-[10px] font-black uppercase text-foreground/70">
                RESILIENCE SCORE
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border-[3px] border-foreground bg-teal/20 px-6 py-3 shadow-pop">
            <ShieldCheck className="h-8 w-8 text-teal" />
            <div className="text-left">
              <span className="font-display text-2xl font-black">{caughtFakes}/{totalFakes}</span>
              <span className="block text-[10px] font-black uppercase text-foreground/70">
                FAKES CAUGHT
              </span>
            </div>
          </div>
        </div>

        {/* Signatures & Issue Date */}
        <div className="relative z-10 mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 border-t-[3px] border-foreground/30 pt-6 text-center sm:text-left items-end">
          <div>
            <p className="font-mono text-xs font-bold text-foreground/60">DATE OF ISSUE</p>
            <p className="font-display text-sm font-bold text-foreground">{dateStr}</p>
            <p className="text-[10px] text-muted-foreground">Peer Verified • India Track</p>
          </div>

          <div className="text-center">
            <div className="font-display italic text-lg text-foreground/80 mb-1">Manasvi Gangrade</div>
            <div className="mx-auto h-0.5 w-32 bg-foreground/40" />
            <p className="mt-1 text-xs font-bold text-foreground">Manasvi Gangrade</p>
            <p className="text-[10px] text-muted-foreground">Team Lead, Project VANI</p>
          </div>

          <div className="text-center sm:text-right">
            <div className="font-display italic text-lg text-foreground/80 mb-1">Suhani Sharma</div>
            <div className="ml-auto mr-auto sm:ml-auto sm:mr-0 h-0.5 w-32 bg-foreground/40" />
            <p className="mt-1 text-xs font-bold text-foreground">Suhani Sharma</p>
            <p className="text-[10px] text-muted-foreground">Co-Lead, Concept & Content</p>
          </div>
        </div>
      </div>
    </div>
  );
}
