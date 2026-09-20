import { useState, useEffect } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Radio,
  AlertTriangle,
  Info,
  CloudRain,
  Table,
  FileWarning,
  FileCheck,
  CheckCircle2,
  Lock,
} from "lucide-react";
import { type Post, type Lang } from "@/data/feed";

interface SimulatorMediaProps {
  post: Post;
  lang: Lang;
  frozen: boolean;
}

// Web Audio Sound Effects
export function playSound(type: "freeze" | "correct" | "wrong" | "click") {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    const now = ctx.currentTime;

    if (type === "freeze") {
      osc.type = "sine";
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(110, now + 0.35);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
      osc.start(now);
      osc.stop(now + 0.35);
    } else if (type === "correct") {
      osc.type = "triangle";
      osc.frequency.setValueAtTime(523.25, now);
      osc.frequency.setValueAtTime(659.25, now + 0.08);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
      osc.start(now);
      osc.stop(now + 0.3);
    } else if (type === "wrong") {
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(160, now);
      osc.frequency.linearRampToValueAtTime(110, now + 0.25);
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
      osc.start(now);
      osc.stop(now + 0.25);
    } else if (type === "click") {
      osc.type = "sine";
      osc.frequency.setValueAtTime(800, now);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
      osc.start(now);
      osc.stop(now + 0.05);
    }
  } catch {
    // AudioContext blocked
  }
}

export function SimulatorMedia({ post, lang, frozen }: SimulatorMediaProps) {
  const t = (v?: Record<string, string>) => (v ? v[lang] ?? v.en ?? "" : "");

  // Voice Note State
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<1 | 1.5 | 2>(1);

  // Video State
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

      try {
        if ("speechSynthesis" in window) {
          window.speechSynthesis.cancel();
          const text =
            lang === "hi"
              ? "अपनी दवाइयाँ तुरंत बंद कर दें। यह नया घरेलू नुस्खा तीन दिन में पूरा असर करेगा।"
              : "Stop taking your prescribed tablets. This kitchen remedy clears it in three days.";
          const utterance = new SpeechSynthesisUtterance(text);
          utterance.rate = playbackSpeed * 0.95;
          utterance.pitch = 0.9;
          utterance.onend = () => setIsPlaying(false);
          window.speechSynthesis.speak(utterance);
        }
      } catch {
        /* ignore */
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

  // ====================================================
  // POST 3: VOICE NOTE (The Familiar Voice Clone)
  // ====================================================
  if (post.kind === "voice") {
    const bars = [
      40, 70, 55, 90, 80, 60, 45, 95, 75, 50, 85, 90, 65, 40, 80, 70, 55, 60, 40,
      35, 30, 25, 25, 20, // flat end tell
    ];

    return (
      <div className="mt-3 overflow-hidden rounded-2xl border-[3px] border-foreground bg-[#E7F8E8] p-4 text-foreground shadow-sm">
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

          <div className="relative flex-1">
            <div className="flex h-10 items-center gap-1">
              {bars.map((h, i) => {
                const percent = (i / bars.length) * 100;
                const active = percent <= audioProgress;
                const isTail = i >= bars.length - 6;
                return (
                  <div
                    key={i}
                    className={`w-1 rounded-full transition-all duration-150 ${
                      active ? "bg-forest" : "bg-forest/30"
                    } ${isTail && frozen ? "ring-2 ring-tangerine" : ""}`}
                    style={{
                      height: isPlaying ? `${Math.max(15, h * (0.8 + Math.random() * 0.4))}%` : `${h}%`,
                    }}
                  />
                );
              })}
            </div>
            <div
              className="absolute -bottom-1 text-[10px] font-mono font-bold text-forest"
              style={{ left: `${Math.min(audioProgress, 90)}%` }}
            >
              0:{String(Math.floor((audioProgress / 100) * 18)).padStart(2, "0")}
            </div>
          </div>

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

  // ====================================================
  // POST 5: VIDEO (Deepfake News Broadcast)
  // ====================================================
  if (post.kind === "video") {
    return (
      <div className="mt-3 overflow-hidden rounded-2xl border-[3px] border-foreground bg-black text-white shadow-pop">
        <div className="relative aspect-video w-full bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 flex flex-col justify-between p-3">
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

          <div className="my-auto flex flex-col items-center justify-center text-center">
            <div className="relative">
              <div className="h-24 w-24 rounded-full border-4 border-white/80 bg-gradient-to-b from-amber-200 to-amber-400 p-1 shadow-2xl animate-pulse">
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

        {frozen && (
          <div className="border-t-2 border-foreground bg-tangerine p-3 text-xs text-black font-bold">
            ⚠️ {t(post.media)}
          </div>
        )}
      </div>
    );
  }

  // ====================================================
  // POST 1: FORGED SCHOLARSHIP NOTICE (Mismatched Fonts)
  // ====================================================
  if (post.id === "p1") {
    return (
      <div className="mt-3 overflow-hidden rounded-2xl border-[3px] border-foreground bg-card text-foreground shadow-sm">
        <div className="flex items-center justify-between border-b-2 border-foreground bg-sunny/40 px-4 py-2 text-xs font-bold">
          <div className="flex items-center gap-2">
            <span className="text-sm">🏛️</span>
            <span className="font-display tracking-tight">DISTRICT SCHOLARSHIP PORTAL</span>
          </div>
          <span className="rounded-full border border-foreground bg-card px-2 py-0.5 text-[10px] font-black">
            NOTICE #2026/ED-44
          </span>
        </div>

        <div className="p-4 space-y-3">
          <div className="rounded-xl border-2 border-red-400 bg-red-50/70 p-3 text-center">
            <span className="text-xs font-bold text-red-600 block mb-1 uppercase tracking-wider">
              {lang === "hi" ? "अति आवश्यक सूचना" : "CRITICAL UPDATE"}
            </span>
            <p className="font-sans text-xs text-foreground/80">
              {lang === "hi"
                ? "सभी पंजीकृत उम्मीदवारों को सूचित किया जाता है कि पोर्टल की अंतिम तिथि बढ़ा दी गई है:"
                : "All candidates are notified that the submission window has been rescheduled to:"}
            </p>
            {/* The Mismatched Typography Tell */}
            <p
              className={`mt-2 font-mono text-sm font-black text-red-700 tracking-wider ${
                frozen ? "ring-2 ring-tangerine bg-sunny/40 p-1 rounded" : ""
              }`}
            >
              TONIGHT 11:59 PM (FINAL EXTENSION)
            </p>
          </div>

          <div className="flex items-center justify-between gap-2 rounded-xl border border-foreground/30 bg-secondary/50 p-2 text-[11px]">
            <span className="font-mono text-muted-foreground truncate">
              http://indore-edu-scholarships.org/apply-fast
            </span>
            <span className="rounded bg-tangerine/20 px-1.5 py-0.5 font-bold text-tangerine text-[9px] shrink-0">
              UNVERIFIED LINK
            </span>
          </div>
        </div>

        {frozen && (
          <div className="border-t-2 border-foreground bg-tangerine/20 p-3 text-xs font-bold text-foreground flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 shrink-0 text-tangerine" />
            <span>{t(post.media)}</span>
          </div>
        )}
      </div>
    );
  }

  // ====================================================
  // POST 6: FINANCIAL SCAM (₹5,000 via UPI PIN)
  // ====================================================
  if (post.id === "p6") {
    return (
      <div className="mt-3 overflow-hidden rounded-2xl border-[3px] border-foreground bg-card text-foreground shadow-sm">
        <div className="flex items-center justify-between border-b-2 border-foreground bg-tangerine/30 px-4 py-2 text-xs font-bold">
          <div className="flex items-center gap-2">
            <span className="text-sm">💰</span>
            <span className="font-display tracking-tight text-red-700">
              DIRECT BENEFIT TRANSFER PORTAL
            </span>
          </div>
          <span className="rounded-full bg-red-600 px-2 py-0.5 text-[10px] font-black text-white animate-pulse">
            200 SLOTS LEFT
          </span>
        </div>

        <div className="p-4 space-y-3">
          <div className="rounded-xl border-2 border-dashed border-red-500 bg-red-50 p-3 text-center">
            <span className="text-3xl">🏛️</span>
            <p className="font-display text-base font-black text-red-700 mt-1">
              ₹5,000 DIRECT STUDENT SUBSIDY
            </p>
            <p className="text-xs text-foreground/80 mt-1">
              {lang === "hi"
                ? "राशि प्राप्त करने हेतु अपना UPI पिन डालकर तुरंत वेरीफाई करें।"
                : "Enter your UPI PIN to authenticate account and receive instant payout."}
            </p>
          </div>

          <div
            className={`rounded-xl border-2 border-foreground p-2.5 text-center text-xs font-black ${
              frozen ? "bg-red-200 border-red-600 text-red-800" : "bg-sunny"
            }`}
          >
            {lang === "hi" ? "पैसे पाने के लिए कभी PIN नहीं लगता!" : "RULE: A UPI PIN NEVER RECEIVES MONEY!"}
          </div>
        </div>

        {frozen && (
          <div className="border-t-2 border-foreground bg-grape/20 p-3 text-xs font-bold text-foreground flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 shrink-0 text-grape" />
            <span>{t(post.media)}</span>
          </div>
        )}
      </div>
    );
  }

  // ====================================================
  // POST 8: RECYCLED RALLY PHOTO (Shadows & Foreign Signs)
  // ====================================================
  if (post.id === "p8") {
    return (
      <div className="mt-3 overflow-hidden rounded-2xl border-[3px] border-foreground bg-card shadow-sm">
        <div className="relative aspect-[16/10] w-full bg-slate-900 flex flex-col justify-between p-4 text-white">
          <div className="flex items-center justify-between">
            <span className="rounded-full bg-red-600 px-2 py-0.5 text-[10px] font-black uppercase">
              CLAIM: 2 LAKH LOCAL RALLY
            </span>
            <span className="rounded bg-black/60 px-2 py-0.5 font-mono text-[9px] text-amber-300">
              REVERSE IMAGE HIT: 2017
            </span>
          </div>

          {/* Simulated Crowd Visual with Forensic Pins */}
          <div className="my-auto text-center space-y-2">
            <div className="text-4xl">👥👥👥👥👥</div>
            <div className="flex justify-center gap-2">
              <span
                className={`rounded border px-2 py-0.5 text-[10px] font-bold ${
                  frozen ? "border-amber-400 bg-amber-400/30 text-amber-200" : "border-white/30 bg-black/40"
                }`}
              >
                🪧 Cyrillic European Signboards
              </span>
              <span
                className={`rounded border px-2 py-0.5 text-[10px] font-bold ${
                  frozen ? "border-amber-400 bg-amber-400/30 text-amber-200" : "border-white/30 bg-black/40"
                }`}
              >
                ☀️ Dual Shadow Directions
              </span>
            </div>
          </div>

          <div className="text-[10px] text-white/70 italic text-center">
            {t(post.media)}
          </div>
        </div>

        {frozen && (
          <div className="border-t-2 border-foreground bg-tangerine/20 p-3 text-xs font-bold text-foreground">
            ⚠️ {lang === "hi"
              ? "रिवर्स इमेज सर्च से पता चलता है कि यह 2018 की किसी यूरोपीय शहर की रैली की तस्वीर है।"
              : "Reverse image search reveals this same crowd photo was taken in Europe in 2017."}
          </div>
        )}
      </div>
    );
  }

  // ====================================================
  // POST 9: FAKE INTERNAL LEAK (Plain text memo)
  // ====================================================
  if (post.id === "p9") {
    return (
      <div className="mt-3 overflow-hidden rounded-2xl border-[3px] border-foreground bg-slate-950 text-emerald-400 font-mono p-4 shadow-sm text-xs space-y-2">
        <div className="flex items-center justify-between border-b border-emerald-800 pb-2 text-[10px]">
          <span className="font-bold flex items-center gap-1.5 text-red-400">
            <Lock className="h-3 w-3" />
            CONFIDENTIAL // NO PROVENANCE
          </span>
          <span className="text-emerald-600">RAW_MEMO.TXT</span>
        </div>

        <div className="space-y-1 py-1 text-[11px] leading-relaxed">
          <p className="text-red-400 font-bold">&gt;&gt; NOTICE: SCREENSHOT BEFORE DELETION</p>
          <p className="text-slate-300">
            &gt; &quot;Camera sensor logs indicate automated background diagnostics during overnight idle cycles.&quot;
          </p>
          <p className="text-slate-500 text-[10px] pt-1">
            [SENDER: UNKNOWN | RECIPIENT: UNKNOWN | LETTERHEAD: NONE | VERIFIABLE HASH: MISSING]
          </p>
        </div>

        {frozen && (
          <div className="border-t border-emerald-800 pt-2 text-[11px] text-amber-300 font-sans font-bold">
            ⚠️ {t(post.media)}
          </div>
        )}
      </div>
    );
  }

  // ====================================================
  // POST 2: GENUINE LIBRARY BOOKSHELF (Authentic Photo)
  // ====================================================
  if (post.id === "p2") {
    return (
      <div className="mt-3 overflow-hidden rounded-2xl border-[3px] border-foreground bg-card shadow-sm">
        <div className="relative aspect-[16/10] w-full bg-[#EBF7F2] flex flex-col items-center justify-center p-6 text-center">
          <div className="h-20 w-20 rounded-2xl border-[3px] border-foreground bg-sunny flex items-center justify-center text-3xl shadow-pop">
            📚
          </div>
          <p className="mt-3 font-display text-sm font-bold text-foreground">
            {t(post.media)}
          </p>
          <span className="mt-2 rounded-full border border-forest bg-forest/15 px-2.5 py-0.5 text-[10px] font-bold text-forest">
            EXIF VERIFIED: Shot on iPhone 13, Indore • Natural Morning Light
          </span>
        </div>
        <div className="border-t-2 border-foreground bg-teal/20 px-4 py-2 text-xs font-bold text-teal-foreground flex items-center justify-between">
          <span>✓ Genuine User Contribution</span>
          <span className="font-mono text-[10px]">RAW-CHECK PASSED</span>
        </div>
      </div>
    );
  }

  // ====================================================
  // POST 4: GENUINE METEOROLOGICAL ALERT
  // ====================================================
  if (post.id === "p4") {
    return (
      <div className="mt-3 overflow-hidden rounded-2xl border-[3px] border-foreground bg-[#FFF9E6] p-4 text-foreground shadow-sm space-y-2">
        <div className="flex items-center justify-between border-b-2 border-foreground/20 pb-2 text-xs font-bold">
          <div className="flex items-center gap-1.5 text-amber-800">
            <CloudRain className="h-4 w-4 text-amber-600" />
            <span>REGIONAL METEOROLOGICAL CENTRE</span>
          </div>
          <span className="rounded bg-amber-500/20 px-2 py-0.5 text-[10px] font-black text-amber-900">
            BULLETIN #IMD-2026-92
          </span>
        </div>
        <p className="text-xs font-bold text-amber-950 leading-relaxed">
          {lang === "hi"
            ? "ऑरेंज अलर्ट: भारी वर्षा की संभावना। समय: प्रातः 6:00 से 12:00 दोपहर।"
            : "ORANGE ALERT: Heavy rainfall expected. Window: 06:00 AM - 12:00 PM."}
        </p>
        <div className="flex items-center gap-2 pt-1 text-[10px] font-bold text-forest">
          <CheckCircle2 className="h-3.5 w-3.5" />
          <span>Official Gazette Reference & Timestamp Verified</span>
        </div>
      </div>
    );
  }

  // ====================================================
  // POST 7: GENUINE OPEN DATA CIVIC POST
  // ====================================================
  if (post.id === "p7") {
    return (
      <div className="mt-3 overflow-hidden rounded-2xl border-[3px] border-foreground bg-card p-4 text-foreground shadow-sm space-y-2">
        <div className="flex items-center justify-between border-b-2 border-foreground/20 pb-2 text-xs font-bold">
          <div className="flex items-center gap-1.5 text-teal">
            <Table className="h-4 w-4" />
            <span>MUNICIPAL CORP OPEN DATASET</span>
          </div>
          <span className="font-mono text-[10px] text-muted-foreground">WARD_DATA_V1.CSV</span>
        </div>
        <p className="text-xs text-foreground/80 font-medium">
          {lang === "hi"
            ? "वार्ड-स्तर की सफाई रिपोर्ट: पूर्ण डेटाशीट व गणना विधि ओपन रिपॉजिटरी पर संलग्न।"
            : "Ward sanitation metrics: Complete raw table & methodology attached for peer verification."}
        </p>
        <div className="flex items-center gap-2 pt-1 text-[10px] font-bold text-forest">
          <CheckCircle2 className="h-3.5 w-3.5" />
          <span>Transparent Methodology & Checkable Records</span>
        </div>
      </div>
    );
  }

  // ====================================================
  // POST 10: GENUINE SELF-CORRECTION
  // ====================================================
  if (post.id === "p10") {
    return (
      <div className="mt-3 overflow-hidden rounded-2xl border-[3px] border-foreground bg-[#F7F2FA] p-4 text-foreground shadow-sm space-y-2">
        <div className="flex items-center justify-between border-b-2 border-foreground/20 pb-2 text-xs font-bold text-grape">
          <span>PUBLIC CORRECTION & REVISION</span>
          <span className="font-mono text-[10px]">CORRECTION_THREAD</span>
        </div>
        <p className="text-xs text-foreground/80 leading-relaxed font-medium">
          {lang === "hi"
            ? "पूर्व पोस्ट में संशोधन: उद्धृत आँकड़ा पूरे राज्य का था। सही जिलावार आँकड़े थ्रेड में जोड़ दिए गए हैं।"
            : "Correction notice: Previous post cited state-level figures rather than district numbers. Accurate table linked."}
        </p>
        <div className="flex items-center gap-2 pt-1 text-[10px] font-bold text-grape">
          <CheckCircle2 className="h-3.5 w-3.5 text-forest" />
          <span>Verified Transparency • Rare Accountability Signal</span>
        </div>
      </div>
    );
  }

  // Fallback
  return (
    <div className="mt-3 rounded-2xl border-2 border-foreground/30 bg-secondary/40 p-4 text-sm font-medium italic text-muted-foreground">
      {t(post.media)}
    </div>
  );
}
