import { useState, useEffect, useRef } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Radio,
  Search,
  AlertTriangle,
  CheckCircle2,
  ShieldAlert,
  Clock,
  Sparkles,
  Info,
} from "lucide-react";
import { type Post, type Lang } from "@/data/feed";

interface SimulatorMediaProps {
  post: Post;
  lang: Lang;
  frozen: boolean;
  highlightedTell?: number | null;
  onSelectTell?: (index: number) => void;
}

// Simple Web Audio Sound Effects
export function playSound(type: "freeze" | "correct" | "wrong" | "click") {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    const now = ctx.currentTime;

    if (type === "freeze") {
      // Sci-fi dramatic freeze sound
      osc.type = "sine";
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(110, now + 0.35);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
      osc.start(now);
      osc.stop(now + 0.35);
    } else if (type === "correct") {
      // Pleasant chime
      osc.type = "triangle";
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.setValueAtTime(659.25, now + 0.08); // E5
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
      osc.start(now);
      osc.stop(now + 0.3);
    } else if (type === "wrong") {
      // Low buzz
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(160, now);
      osc.frequency.linearRampToValueAtTime(110, now + 0.25);
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
      osc.start(now);
      osc.stop(now + 0.25);
    } else if (type === "click") {
      // Subtle pop
      osc.type = "sine";
      osc.frequency.setValueAtTime(800, now);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
      osc.start(now);
      osc.stop(now + 0.05);
    }
  } catch {
    // AudioContext blocked or not supported
  }
}

export function SimulatorMedia({
  post,
  lang,
  frozen,
  highlightedTell,
  onSelectTell,
}: SimulatorMediaProps) {
  const t = (v?: Record<string, string>) => (v ? v[lang] ?? v.en ?? "" : "");

  // Voice Note State
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<1 | 1.5 | 2>(1);

  // Video State
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  // Speech synthesis for Voice Note
  useEffect(() => {
    let timer: number | undefined;
    if (isPlaying) {
      const interval = 100 / (18 * playbackSpeed);
      timer = window.setInterval(() => {
        setAudioProgress((p) => {
          if (p >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return p + 1;
        });
      }, 100);

      // Play synthesized tone/voice if supported
      try {
        if ("speechSynthesis" in window) {
          window.speechSynthesis.cancel();
          const utterance = new SpeechSynthesisUtterance(
            lang === "hi"
              ? "अपनी दवाइयाँ तुरंत बंद कर दें। यह नया घरेलू उपाय तीन दिन में असर करेगा।"
              : "Stop taking your prescribed medicine. This home remedy clears it in three days."
          );
          utterance.rate = playbackSpeed * 0.95;
          utterance.pitch = 0.9;
          utterance.onend = () => setIsPlaying(false);
          window.speechSynthesis.speak(utterance);
        }
      } catch {
        /* Speech synthesis unavailable */
      }
    } else {
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    }
    return () => {
      if (timer) window.clearInterval(timer);
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [isPlaying, playbackSpeed, lang]);

  // Handle Voice Note kind (Post 3 etc)
  if (post.kind === "voice") {
    const bars = [
      40, 70, 55, 90, 80, 60, 45, 95, 75, 50, 85, 90, 65, 40, 80, 70, 55, 60, 40,
      35, 30, 25, 25, 20, // flattening at the end!
    ];

    return (
      <div className="mt-3 overflow-hidden rounded-2xl border-[3px] border-foreground bg-[#E7F8E8] p-4 text-foreground shadow-sm">
        {/* WhatsApp style header */}
        <div className="flex items-center justify-between border-b-2 border-foreground/20 pb-2.5 text-xs">
          <div className="flex items-center gap-1.5 font-bold text-forest">
            <Radio className="h-3.5 w-3.5 animate-pulse" />
            <span>
              {lang === "hi" ? "फॉरवर्डेड ऑडियो नोट" : "Forwarded Voice Note"} (0:18)
            </span>
          </div>
          <span className="rounded-full bg-forest/20 px-2 py-0.5 text-[10px] font-black text-forest">
            {lang === "hi" ? "कई बार फॉरवर्ड किया गया" : "Forwarded many times"}
          </span>
        </div>

        {/* Player UI */}
        <div className="mt-3 flex items-center gap-3">
          <button
            onClick={() => {
              playSound("click");
              setIsPlaying(!isPlaying);
            }}
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-[3px] border-foreground bg-forest text-white shadow-pop transition hover:scale-105 active:scale-95"
            aria-label={isPlaying ? "Pause audio" : "Play audio"}
          >
            {isPlaying ? <Pause className="h-5 w-5 fill-white" /> : <Play className="ml-0.5 h-5 w-5 fill-white" />}
          </button>

          {/* Equalizer Waveform */}
          <div className="relative flex-1">
            <div className="flex h-10 items-center gap-1">
              {bars.map((h, i) => {
                const percent = (i / bars.length) * 100;
                const active = percent <= audioProgress;
                const isTail = i >= bars.length - 6; // last 6 bars are the robotic flat tail
                return (
                  <div
                    key={i}
                    className={`w-1 rounded-full transition-all duration-150 ${
                      active ? "bg-forest" : "bg-forest/30"
                    } ${isTail && frozen ? "ring-2 ring-tangerine" : ""}`}
                    style={{
                      height: isPlaying ? `${Math.max(15, (h * (0.8 + Math.random() * 0.4)))}%` : `${h}%`,
                    }}
                  />
                );
              })}
            </div>
            {/* Scrubber indicator */}
            <div
              className="absolute -bottom-1 text-[10px] font-mono font-bold text-forest"
              style={{ left: `${Math.min(audioProgress, 90)}%` }}
            >
              0:{String(Math.floor((audioProgress / 100) * 18)).padStart(2, "0")}
            </div>
          </div>

          {/* Speed Toggle */}
          <button
            onClick={() => {
              playSound("click");
              setPlaybackSpeed(playbackSpeed === 1 ? 1.5 : playbackSpeed === 1.5 ? 2 : 1);
            }}
            className="rounded-full border-2 border-foreground bg-card px-2 py-1 text-xs font-black text-foreground hover:bg-sunny"
          >
            {playbackSpeed}x
          </button>
        </div>

        {/* Clue Callout on Freeze */}
        {frozen && (
          <div className="mt-3 flex items-start gap-2 rounded-xl border-2 border-tangerine bg-tangerine/15 p-2.5 text-xs text-foreground animate-pulse">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-tangerine" />
            <div>
              <strong className="block text-tangerine font-black">
                {lang === "hi" ? "आवाज़ की जांच (FORENSIC TELL):" : "FORENSIC AUDIO TELL:"}
              </strong>
              <span>
                {lang === "hi"
                  ? "आखिरी 5 वेवफॉर्म बिल्कुल सपाट हैं — असली इंसान बोलते वक्त सांस छोड़ता है, जबकि AI क्लोन एक ही टोन पर खत्म होता है।"
                  : "Notice the final waveform bars drop into a flat monotone cadence with zero ambient room reverb or breath pause."}
              </span>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Handle Video / Deepfake kind (Post 5 etc)
  if (post.kind === "video") {
    return (
      <div className="mt-3 overflow-hidden rounded-2xl border-[3px] border-foreground bg-black text-white shadow-pop">
        {/* News Studio Shell */}
        <div className="relative aspect-video w-full bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 flex flex-col justify-between p-3">
          {/* Top Bar: LIVE Indicator */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 rounded-md bg-red-600 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-white shadow-sm">
                <span className="h-2 w-2 rounded-full bg-white animate-ping" />
                LIVE
              </span>
              <span className="rounded-md bg-black/60 px-2 py-0.5 text-[10px] font-mono font-bold text-white/90 backdrop-blur-sm">
                ● 24.8K Watching
              </span>
            </div>
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="rounded-full bg-black/60 p-1.5 text-white/80 hover:text-white"
              aria-label="Toggle mute"
            >
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </button>
          </div>

          {/* Synthetic Anchor Avatar Representation */}
          <div className="my-auto flex flex-col items-center justify-center text-center">
            <div className="relative">
              <div
                className={`h-24 w-24 rounded-full border-4 border-white/80 bg-gradient-to-b from-amber-200 to-amber-400 p-1 shadow-2xl ${
                  isVideoPlaying ? "animate-pulse" : ""
                }`}
              >
                {/* Simulated Anchor Face silhouette */}
                <div className="flex h-full w-full items-center justify-center rounded-full bg-slate-800 font-display text-2xl font-bold text-amber-200">
                  🎙️
                </div>
              </div>
              {frozen && (
                <div className="absolute -bottom-2 -right-2 rounded-full border-2 border-black bg-tangerine px-2 py-0.5 text-[9px] font-black text-black">
                  LIP-SYNC LAG
                </div>
              )}
            </div>
            <p className="mt-2 text-xs font-bold text-amber-300">
              {lang === "hi" ? "राष्ट्रीय प्रसारण • विशेष साक्षात्कार" : "NATIONAL NETWORK • SPECIAL BROADCAST"}
            </p>
          </div>

          {/* Breaking News Bottom Ticker */}
          <div className="overflow-hidden rounded-lg border-2 border-red-500 bg-red-700/90 text-white backdrop-blur-md">
            <div className="flex items-center">
              <span className="shrink-0 bg-yellow-400 px-2.5 py-1 text-[11px] font-black uppercase tracking-tight text-black">
                BREAKING
              </span>
              <div className="marquee truncate px-2.5 py-1 text-xs font-bold tracking-wide">
                {lang === "hi"
                  ? "बड़ी खबर: राज्य परीक्षा रद्द होने की खबर का दावा • कोई सरकारी पुष्टि नहीं"
                  : "ALLEGED EXAM CANCELLATION CLIP CIRCULATING • NO OFFICIAL GAZETTE"}
              </div>
            </div>
          </div>
        </div>

        {/* Tell Spotlight on Freeze */}
        {frozen && (
          <div className="border-t-2 border-foreground bg-tangerine p-3 text-xs text-black font-bold">
            ⚠️ {t(post.media)}
          </div>
        )}
      </div>
    );
  }

  // Handle Forged Notice / Scheme Screenshot (Post 1, Post 6)
  if (post.kind === "screenshot" || (post.fake && post.category.en.toLowerCase().includes("scam"))) {
    return (
      <div className="mt-3 overflow-hidden rounded-2xl border-[3px] border-foreground bg-card text-foreground shadow-sm">
        {/* Fake Official Seal Header */}
        <div className="flex items-center justify-between border-b-2 border-foreground bg-sunny/40 px-4 py-2 text-xs font-bold">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-full border border-foreground bg-white text-xs">
              🏛️
            </div>
            <span className="font-display tracking-tight">
              {lang === "hi" ? "सार्वजनिक सूचना • जन कल्याण पोर्टल" : "PUBLIC NOTICE • SCHEME PORTAL"}
            </span>
          </div>
          <span className="rounded-full border border-foreground bg-card px-2 py-0.5 text-[10px] font-black">
            REF: 2026/ED-982
          </span>
        </div>

        {/* Notice Body */}
        <div className="p-4 space-y-3">
          {/* Mismatched visual banner */}
          <div className="rounded-xl border-2 border-dashed border-red-500 bg-red-50 p-3 text-center">
            <p className="font-display text-sm font-black uppercase tracking-wide text-red-700">
              {lang === "hi" ? "⚡ अंतिम अवसर • आज रात 11:59 बजे समाप्त" : "⚡ FINAL DEADLINE • CLOSING TONIGHT 11:59 PM"}
            </p>
            <p className="mt-1 text-xs font-bold text-foreground/80">
              {lang === "hi"
                ? "पात्र छात्र तुरंत दिए गए लिंक पर पंजीकरण करें व UPI से सत्यापन पूर्ण करें।"
                : "Eligible candidates must register immediately via link and complete UPI verification."}
            </p>
          </div>

          {/* Suspicious URL button */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 rounded-xl border-2 border-foreground bg-secondary/70 p-2.5 text-xs">
            <span className="font-mono text-muted-foreground truncate">
              https://portal-scholarship-urgent.claim-benefit.xyz
            </span>
            <span className="rounded-md border border-red-600 bg-red-600 px-2 py-1 font-bold text-white text-[10px] shrink-0">
              {lang === "hi" ? "नकली डोमेन (.xyz)" : "SUSPICIOUS DOMAIN"}
            </span>
          </div>
        </div>

        {/* Tell Spotlight on Freeze */}
        {frozen && (
          <div className="border-t-2 border-foreground bg-grape/20 p-3 text-xs font-bold text-foreground flex items-center gap-2">
            <Info className="h-4 w-4 shrink-0 text-grape" />
            <span>{t(post.media)}</span>
          </div>
        )}
      </div>
    );
  }

  // Handle Photo / General Image (Post 2, Post 8)
  if (post.kind === "photo") {
    const isGenuine = !post.fake;
    return (
      <div className="mt-3 overflow-hidden rounded-2xl border-[3px] border-foreground bg-card shadow-sm">
        <div className="relative aspect-[16/10] w-full bg-secondary/80 flex flex-col items-center justify-center p-6 text-center">
          {/* Simulated Image Visual Representation */}
          <div className="h-20 w-20 rounded-2xl border-[3px] border-foreground bg-sunny flex items-center justify-center text-3xl shadow-pop">
            {isGenuine ? "📚" : "🌊"}
          </div>
          <p className="mt-3 font-display text-sm font-bold text-foreground">
            {t(post.media)}
          </p>
          <div className="mt-2 flex items-center gap-2">
            <span className="rounded-full border border-foreground bg-card px-2.5 py-0.5 text-[10px] font-bold text-foreground/70">
              {isGenuine ? "ISO 200 • 1/500s" : "RECYCLED MEDIA DETECTED"}
            </span>
          </div>
        </div>

        {/* Forensic metadata badge */}
        <div
          className={`border-t-2 border-foreground px-4 py-2 text-xs font-bold flex items-center justify-between ${
            isGenuine ? "bg-teal/20 text-teal-foreground" : "bg-tangerine/20 text-tangerine-foreground"
          }`}
        >
          <span>
            {isGenuine
              ? (lang === "hi" ? "✓ मूल तस्वीर (सत्यापित EXIF डेटा)" : "✓ Original Photograph (Verified EXIF)")
              : (lang === "hi" ? "⚠️ रिवर्स इमेज सर्च: 2018 की पुरानी तस्वीर" : "⚠️ Reverse Search: Matched 2018 Archive")}
          </span>
          <span className="font-mono text-[10px]">
            {isGenuine ? "RAW-CHECK OK" : "HASH-MATCH FOUND"}
          </span>
        </div>
      </div>
    );
  }

  // Fallback for clean text posts (Post 4, Post 7, Post 10)
  return (
    <div className="mt-3 rounded-2xl border-2 border-foreground/30 bg-secondary/40 p-4 text-sm font-medium italic text-muted-foreground">
      {t(post.media)}
    </div>
  );
}
