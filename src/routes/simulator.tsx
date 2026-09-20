import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Heart,
  Share2,
  ChevronDown,
  ShieldCheck,
  AlertTriangle,
  Mic,
  Image as ImageIcon,
  Play,
  FileText,
  Camera,
  RotateCcw,
  Sparkles,
  Timer,
  Flame,
  Search,
  Copy,
  Check,
  Trophy,
  Keyboard,
} from "lucide-react";

import { POSTS, TOOLKIT, UI, type Lang, type Post } from "@/data/feed";
import { ColourBlockBanner, PillButton, Reveal, SectionTint } from "@/components/vani/ui";
import { Clover, OrangeHalf, Squiggle, Sunburst, TealCircle } from "@/components/vani/Decor";
import { SimulatorMedia, playSound } from "@/components/vani/SimulatorMedia";
import { VaniCertificate } from "@/components/vani/VaniCertificate";

export const Route = createFileRoute("/simulator")({
  head: () => ({
    meta: [
      { title: "VaaniFeed — scroll a real feed, catch a real fake | Project VANI" },
      {
        name: "description",
        content:
          "Scroll VaaniFeed in Hindi or English. Like or share something manipulated and the feed freezes, names the tell, and builds your Resilience Score.",
      },
      { property: "og:title", content: "VaaniFeed — the feed that trains you back" },
      {
        property: "og:description",
        content: "Ten posts. Some are manipulated. Your thumb decides — VANI shows you why.",
      },
    ],
  }),
  component: SimulatorPage,
});

type Action = "like" | "share" | "skip" | "timeout";
type Result = {
  id: string;
  correct: boolean;
  action: Action;
  fake: boolean;
  ms: number;
  hinted: boolean;
  category: Record<string, string>;
};

const TURN_SECONDS = 18;
const BEST_KEY = "vani.best.v1";

const toneBg: Record<Post["avatarTone"], string> = {
  sunny: "bg-sunny text-sunny-foreground",
  tangerine: "bg-tangerine text-tangerine-foreground",
  teal: "bg-teal text-teal-foreground",
  forest: "bg-forest text-forest-foreground",
  grape: "bg-grape text-grape-foreground",
};

const kindIcon: Record<Post["kind"], typeof Mic> = {
  text: FileText,
  photo: ImageIcon,
  voice: Mic,
  video: Play,
  screenshot: Camera,
};

const T = {
  hint: { en: "Ask VANI", hi: "वाणी से पूछें", mr: "वाणीला विचारा", ta: "வாணியைக் கேளுங்கள்" },
  hintUsed: { en: "VANI whispered", hi: "वाणी ने इशारा किया", mr: "वाणीने इशारा दिला", ta: "வாணி குறிப்பு கொடுத்தது" },
  streak: { en: "streak", hi: "लगातार", mr: "सलग", ta: "தொடர்" },
  timeUp: {
    en: "Time ran out — the feed moved on without you.",
    hi: "समय खत्म — फ़ीड आपके बिना आगे बढ़ गई।",
    mr: "वेळ संपली — फीड पुढे गेली.",
    ta: "நேரம் முடிந்தது — ஃபீட் நகர்ந்துவிட்டது.",
  },
  best: { en: "Personal best", hi: "अब तक का सर्वश्रेष्ठ", mr: "वैयक्तिक सर्वोत्तम", ta: "சிறந்த சாதனை" },
  copy: { en: "Copy my result", hi: "नतीजा कॉपी करें", mr: "निकाल कॉपी करा", ta: "முடிவை நகலெடுக்கவும்" },
  copied: { en: "Copied", hi: "कॉपी हो गया", mr: "कॉपी झाले", ta: "நகலெடுக்கப்பட்டது" },
  reaction: { en: "Average decision time", hi: "औसत निर्णय समय", mr: "सरासरी वेळ", ta: "சராசரி முடிவு நேரம்" },
  bestStreak: { en: "Longest clean streak", hi: "सबसे लंबी सही लड़ी", mr: "सर्वात मोठी अचूक मालिका", ta: "நீண்ட சரியான தொடர்" },
  breakdown: {
    en: "Where you stood, category by category",
    hi: "श्रेणी-दर-श्रेणी आपका प्रदर्शन",
    mr: "प्रवर्गानुसार तुमची कामगिरी",
    ta: "பிரிவு வாரியாக உங்கள் செயல்பாடு",
  },
  review: { en: "Worth a second look", hi: "दोबारा देखने लायक", mr: "पुन्हा पाहण्यासारखे", ta: "மீண்டும் பார்க்க வேண்டியவை" },
  keys: {
    en: "Keys: L like · S share · J scroll past · H ask VANI",
    hi: "कीज़: L पसंद · S शेयर · J आगे · H वाणी",
    mr: "किलीज: L लाईक · S शेअर · J पुढे · H वाणी",
    ta: "விசைகள்: L விருப்பம் · S பகிர் · J தாண்டிச் செல் · H வாணி",
  },
} as const;

function fmt(n: number) {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : `${n}`;
}

function SimulatorPage() {
  const [lang, setLang] = useState<Lang>("en");
  const [stage, setStage] = useState<"intro" | "feed" | "score">("intro");
  const [index, setIndex] = useState(0);
  const [results, setResults] = useState<Result[]>([]);
  const [frozen, setFrozen] = useState<{ post: Post; correct: boolean; action: Action } | null>(
    null,
  );
  const [hinted, setHinted] = useState(false);
  const [left, setLeft] = useState(TURN_SECONDS);
  const [best, setBest] = useState<number | null>(null);
  const startedAt = useRef<number>(Date.now());

  const post = POSTS[index];
  const t = (v?: any) => (v ? v[lang] ?? v["en"] ?? "" : "");

  const streak = useMemo(() => {
    let s = 0;
    for (let i = results.length - 1; i >= 0; i--) {
      if (results[i]!.correct) s++;
      else break;
    }
    return s;
  }, [results]);

  const score = useMemo(() => {
    if (!results.length) return 0;
    const points = results.reduce((sum, r) => {
      if (!r.correct) return sum;
      const speed = r.ms < 6000 ? 1 : r.ms < 12000 ? 0.92 : 0.85;
      return sum + (r.hinted ? 0.6 : 1) * speed;
    }, 0);
    return Math.round((points / results.length) * 100);
  }, [results]);

  useEffect(() => {
    try {
      const v = window.localStorage.getItem(BEST_KEY);
      if (v) setBest(Number(v));
    } catch {
      /* storage unavailable */
    }
  }, []);

  useEffect(() => {
    if (stage !== "score" || !results.length) return;
    setBest((prev) => {
      const next = prev === null ? score : Math.max(prev, score);
      try {
        window.localStorage.setItem(BEST_KEY, String(next));
      } catch {
        /* storage unavailable */
      }
      return next;
    });
  }, [stage, score, results.length]);

  const act = useCallback(
    (action: Action) => {
      const current = POSTS[index];
      if (!current || frozen || stage !== "feed") return;
      const correct = action === "like" || action === "share" ? !current.fake : current.fake;
      
      // Sound feedback
      if (current.fake && (action === "like" || action === "share")) {
        playSound("freeze");
      } else if (correct) {
        playSound("correct");
      } else {
        playSound("wrong");
      }

      setResults((r) => [
        ...r,
        {
          id: current.id,
          correct,
          action,
          fake: current.fake,
          ms: Date.now() - startedAt.current,
          hinted,
          category: current.category,
        },
      ]);
      setFrozen({ post: current, correct, action });
    },
    [index, frozen, stage, hinted],
  );

  const next = useCallback(() => {
    playSound("click");
    setFrozen(null);
    setHinted(false);
    setLeft(TURN_SECONDS);
    startedAt.current = Date.now();
    if (index + 1 >= POSTS.length) setStage("score");
    else setIndex((i) => i + 1);
  }, [index]);

  // countdown pressure
  useEffect(() => {
    if (stage !== "feed" || frozen) return;
    const id = window.setInterval(() => {
      setLeft((s) => {
        if (s <= 1) {
          window.clearInterval(id);
          act("timeout");
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [stage, frozen, index, act]);

  // keyboard shortcuts
  useEffect(() => {
    if (stage !== "feed") return;
    const onKey = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if (frozen) {
        if (k === "enter" || k === " ") {
          e.preventDefault();
          next();
        }
        return;
      }
      if (k === "l") act("like");
      else if (k === "s") act("share");
      else if (k === "j") act("skip");
      else if (k === "h") setHinted(true);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [stage, frozen, act, next]);

  function restart() {
    setResults([]);
    setIndex(0);
    setFrozen(null);
    setHinted(false);
    setLeft(TURN_SECONDS);
    startedAt.current = Date.now();
    setStage("feed");
  }

  if (stage === "intro") {
    return (
      <div className="relative overflow-hidden">
        <TealCircle className="left-[-3rem] top-16 h-32 w-32 opacity-70" />
        <OrangeHalf className="right-4 top-40 h-16 w-28" delay={1.2} />
        <Squiggle className="bottom-24 left-10 h-12 w-32" delay={0.6} />
        <SectionTint>
          <div className="mx-auto max-w-2xl text-center">
            <Reveal>
              <p className="mb-4 inline-flex items-center gap-2 rounded-full border-[3px] border-foreground bg-card px-4 py-1.5 text-xs font-black tracking-[0.16em] uppercase">
                <Sparkles className="h-4 w-4" /> {t(UI.title)}
              </p>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="font-display text-4xl sm:text-6xl">
                {lang === "en"
                  ? "Ten posts. Your thumb. One honest mirror."
                  : "दस पोस्ट। आपका अंगूठा। एक ईमानदार आईना।"}
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground">
                {lang === "en"
                  ? "Scroll the way you always do. Like what feels true, share what feels urgent, scroll past what feels off. The moment you touch something manipulated, the feed stops and shows you the tell you missed."
                  : "जैसे हमेशा स्क्रॉल करते हैं, वैसे ही करें। जो सच लगे उसे पसंद करें, जो ज़रूरी लगे शेयर करें, जो खटके उसे छोड़ दें। जिस पल आप किसी छेड़छाड़ की गई चीज़ को छुएँगे, फ़ीड रुक जाएगी और वह निशानी दिखाएगी जो आप चूक गए।"}
              </p>
            </Reveal>

            <Reveal delay={200}>
              <div className="mx-auto mt-6 grid max-w-lg gap-3 sm:grid-cols-3">
                {[
                  {
                    icon: <Timer className="h-4 w-4" />,
                    l: { en: "18s per post", hi: "हर पोस्ट पर 18 सेकंड" },
                  },
                  {
                    icon: <Flame className="h-4 w-4" />,
                    l: { en: "Streaks count", hi: "लगातार सही मायने रखता है" },
                  },
                  {
                    icon: <Search className="h-4 w-4" />,
                    l: { en: "One VANI hint", hi: "एक वाणी इशारा" },
                  },
                ].map((f, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-center gap-2 rounded-full border-[3px] border-foreground bg-card px-3 py-2 text-xs font-bold"
                  >
                    {f.icon} {t(f.l)}
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={240}>
              <div className="mt-8 inline-block rounded-2xl border-[3px] border-foreground bg-card p-4 shadow-pop">
                <p className="mb-3 text-xs font-black tracking-[0.16em] uppercase text-muted-foreground">
                  {t(UI.langLabel)}
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {(["en", "hi", "mr", "ta"] as Lang[]).map((l) => (
                    <button
                      key={l}
                      onClick={() => setLang(l)}
                      className={`rounded-full border-[3px] border-foreground px-4 py-2 font-display transition-transform hover:-translate-y-0.5 ${
                        lang === l ? "bg-tangerine text-tangerine-foreground" : "bg-card"
                      }`}
                    >
                      {l === "en" ? "English" : l === "hi" ? "हिन्दी" : l === "mr" ? "मराठी" : "தமிழ்"}
                    </button>
                  ))}
                </div>
              </div>
            </Reveal>

            {best !== null && (
              <Reveal delay={280}>
                <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-sunny px-4 py-1.5 text-sm font-bold text-sunny-foreground">
                  <Trophy className="h-4 w-4" /> {t(T.best)}: {best}
                </p>
              </Reveal>
            )}

            <Reveal delay={320}>
              <div className="mt-8">
                <PillButton tone="grape" onClick={restart}>
                  {t(UI.start)}
                </PillButton>
              </div>
              <p className="mt-4 text-xs text-muted-foreground">
                {lang === "en"
                  ? "Nothing is stored beyond your own device. Every account, caption and clip here is written by us for teaching — no real person is shown."
                  : "आपके अपने डिवाइस के बाहर कुछ सेव नहीं होता। यहाँ के सभी अकाउंट, कैप्शन और क्लिप सिखाने के लिए हमने लिखे हैं — कोई असली व्यक्ति नहीं दिखाया गया।"}
              </p>
            </Reveal>
          </div>
        </SectionTint>
      </div>
    );
  }

  if (stage === "score")
    return <ScoreScreen lang={lang} score={score} best={best} results={results} onRestart={restart} />;

  if (!post) return null;
  const Kind = kindIcon[post.kind];
  const urgent = left <= 5;

  return (
    <div className="relative overflow-hidden">
      <Sunburst className="right-[-2rem] top-10 h-24 w-24 opacity-60" />
      <Clover className="bottom-16 left-[-2rem] h-24 w-24 opacity-50" delay={1.4} />

      <SectionTint>
        <div className="mx-auto max-w-xl">
          {/* progress + streak */}
          <div className="mb-4 flex items-center gap-3">
            <div className="h-3 flex-1 overflow-hidden rounded-full border-[3px] border-foreground bg-card">
              <div
                className="h-full bg-tangerine transition-[width] duration-500 ease-out"
                style={{ width: `${(results.length / POSTS.length) * 100}%` }}
              />
            </div>
            <span className="font-display text-sm">
              {index + 1}/{POSTS.length}
            </span>
            {streak >= 2 && (
              <span className="inline-flex items-center gap-1 rounded-full border-[3px] border-foreground bg-forest px-2.5 py-1 text-xs font-black text-forest-foreground">
                <Flame className="h-3.5 w-3.5" />
                {streak} {t(T.streak)}
              </span>
            )}
          </div>

          {/* timer */}
          <div className="mb-6 flex items-center gap-3">
            <Timer className={`h-4 w-4 ${urgent && !frozen ? "text-tangerine" : "text-muted-foreground"}`} />
            <div className="h-2 flex-1 overflow-hidden rounded-full border-2 border-foreground bg-card">
              <div
                className={`h-full transition-[width] duration-1000 ease-linear ${urgent ? "bg-tangerine" : "bg-teal"}`}
                style={{ width: `${(left / TURN_SECONDS) * 100}%` }}
              />
            </div>
            <span className="w-8 text-right font-display text-sm">{left}s</span>
          </div>

          <div
            className={`card-pop bg-card transition-all duration-500 ${
              frozen ? "scale-[0.99] saturate-50" : ""
            }`}
          >
            <div className="flex items-center gap-3 border-b-[3px] border-foreground px-5 py-4">
              <span
                className={`flex h-11 w-11 items-center justify-center rounded-full border-[3px] border-foreground font-display ${toneBg[post.avatarTone]}`}
              >
                {post.name.charAt(0)}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate font-display text-base leading-tight">{post.name}</p>
                <p className="truncate text-xs text-muted-foreground">
                  {post.handle} · {post.time}
                </p>
              </div>
              <Kind className="h-5 w-5 shrink-0 text-muted-foreground" />
            </div>

            <div className="px-5 py-5">
              <p className="text-[1.02rem] leading-relaxed">{t(post.caption)}</p>
              <SimulatorMedia
                post={post}
                lang={lang}
                frozen={Boolean(frozen)}
              />
              <div className="mt-4 flex gap-5 text-xs font-bold text-muted-foreground">
                <span>{fmt(post.stats.likes)}</span>
                <span>{fmt(post.stats.shares)} ↻</span>
                <span>{fmt(post.stats.comments)} 💬</span>
              </div>

              {!frozen && (
                <div className="mt-4">
                  {hinted ? (
                    <div className="rise-in flex gap-2 rounded-xl border-[3px] border-foreground bg-grape/15 p-3 text-sm">
                      <Search className="mt-0.5 h-4 w-4 shrink-0 text-grape" />
                      <p>
                        <span className="font-display">{t(T.hintUsed)}: </span>
                        {post.tells[0] ? t(post.tells[0].label) : lang === "en"
                          ? "Nothing here contradicts itself — check who is posting, then decide."
                          : "यहाँ कुछ भी आपस में टकरा नहीं रहा — देखें कौन पोस्ट कर रहा है, फिर तय करें।"}
                      </p>
                    </div>
                  ) : (
                    <button
                      onClick={() => setHinted(true)}
                      className="inline-flex items-center gap-2 rounded-full border-[3px] border-dashed border-foreground/60 px-4 py-2 text-xs font-bold transition-transform hover:-translate-y-0.5"
                    >
                      <Search className="h-4 w-4" /> {t(T.hint)}
                    </button>
                  )}
                </div>
              )}
            </div>

            <div className="grid grid-cols-3 gap-2 border-t-[3px] border-foreground p-3">
              <ActionBtn onClick={() => act("like")} icon={<Heart className="h-4 w-4" />} label={t(UI.like)} />
              <ActionBtn onClick={() => act("share")} icon={<Share2 className="h-4 w-4" />} label={t(UI.share)} />
              <ActionBtn
                onClick={() => act("skip")}
                icon={<ChevronDown className="h-4 w-4" />}
                label={t(UI.skip)}
              />
            </div>
          </div>

          <p className="mt-3 hidden items-center justify-center gap-2 text-xs text-muted-foreground sm:flex">
            <Keyboard className="h-3.5 w-3.5" /> {t(T.keys)}
          </p>

          {frozen && <FreezePanel lang={lang} frozen={frozen} onNext={next} />}
        </div>
      </SectionTint>
    </div>
  );
}

function ActionBtn({
  onClick,
  icon,
  label,
}: {
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center justify-center gap-2 rounded-full border-[3px] border-foreground bg-card px-3 py-2.5 text-sm font-bold transition-transform duration-200 hover:-translate-y-0.5 hover:bg-sunny active:translate-y-0"
    >
      {icon}
      <span className="truncate">{label}</span>
    </button>
  );
}

function FreezePanel({
  lang,
  frozen,
  onNext,
}: {
  lang: Lang;
  frozen: { post: Post; correct: boolean; action: Action };
  onNext: () => void;
}) {
  const { post, correct, action } = frozen;
  const t = (v: Record<string, string>) => v[lang] ?? v["en"] ?? "";

  return (
    <div className="rise-in mt-5">
      <div
        className={`rounded-2xl border-[3px] border-foreground p-5 shadow-pop ${
          correct ? "bg-teal text-teal-foreground" : "bg-grape text-grape-foreground"
        }`}
      >
        <p className="text-xs font-black tracking-[0.18em] uppercase opacity-80">
          {post.fake ? t(UI.freeze) : ""} {t(post.category)}
        </p>
        <h3 className="mt-1 font-display text-2xl">{correct ? t(UI.goodCatch) : t(UI.missed)}</h3>
        {action === "timeout" && <p className="mt-1 text-sm font-bold opacity-90">{t(T.timeUp)}</p>}
        <p className="mt-2 text-sm opacity-95">{t(post.verdict)}</p>
      </div>

      {post.tells.length > 0 && (
        <div className="mt-4 space-y-3">
          <p className="font-display text-lg">{t(UI.reveal)}</p>
          {post.tells.map((tell, i) => (
            <div
              key={tell.label.en}
              className="rise-in card-pop flex gap-3 bg-card p-4"
              style={{ animationDelay: `${120 + i * 110}ms` }}
            >
              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-tangerine" />
              <div>
                <p className="font-display text-base">{t(tell.label)}</p>
                <p className="mt-1 text-sm text-muted-foreground">{t(tell.detail)}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {post.source && (
        <div className="mt-4 flex gap-3 rounded-2xl border-[3px] border-foreground bg-sunny p-4">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0" />
          <p className="text-sm font-bold">{t(post.source)}</p>
        </div>
      )}

      <div className="mt-5">
        <PillButton tone="tangerine" onClick={onNext}>
          {t(UI.continue)}
        </PillButton>
      </div>
    </div>
  );
}

function ScoreScreen({
  lang,
  score,
  best,
  results,
  onRestart,
}: {
  lang: Lang;
  score: number;
  best: number | null;
  results: Result[];
  onRestart: () => void;
}) {
  const t = (v: Record<string, string>) => v[lang] ?? v["en"] ?? "";
  const [copied, setCopied] = useState(false);
  const fakes = results.filter((r) => r.fake);
  const caughtFakes = fakes.filter((r) => r.correct).length;
  const spread = fakes.filter((r) => !r.correct && r.action === "share").length;
  const avgMs = results.length
    ? Math.round(results.reduce((s, r) => s + r.ms, 0) / results.length / 100) / 10
    : 0;

  const bestStreak = useMemo(() => {
    let cur = 0;
    let max = 0;
    for (const r of results) {
      cur = r.correct ? cur + 1 : 0;
      max = Math.max(max, cur);
    }
    return max;
  }, [results]);

  const byCategory = useMemo(() => {
    const map = new Map<string, { label: Record<string, string>; ok: number; total: number }>();
    for (const r of results) {
      const key = r.category["en"] ?? "General";
      const e = map.get(key) ?? { label: r.category, ok: 0, total: 0 };
      e.total++;
      if (r.correct) e.ok++;
      map.set(key, e);
    }
    return [...map.values()];
  }, [results]);

  const missed = useMemo(
    () => results.filter((r) => !r.correct).map((r) => POSTS.find((p) => p.id === r.id)!).filter(Boolean),
    [results],
  );

  const band =
    score >= 85
      ? { en: "Hard to fool", hi: "मुश्किल से बहकने वाले" }
      : score >= 60
        ? { en: "Sharp, with blind spots", hi: "तेज़, पर कुछ अंधे कोने" }
        : { en: "The feed is winning — for now", hi: "अभी फ़ीड जीत रही है" };

  async function copyResult() {
    const text =
      lang === "en"
        ? `VaaniFeed Resilience Score: ${score}/100 — ${caughtFakes}/${fakes.length} manipulated posts caught, longest clean streak ${bestStreak}. Project VANI.`
        : `वाणीफ़ीड रेज़िलिएंस स्कोर: ${score}/100 — ${fakes.length} में से ${caughtFakes} छेड़छाड़ पोस्ट पकड़ीं, सबसे लंबी सही लड़ी ${bestStreak}। प्रोजेक्ट वाणी।`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked */
    }
  }

  return (
    <div className="relative overflow-hidden">
      <TealCircle className="right-[-2rem] top-24 h-28 w-28 opacity-60" />
      <Squiggle className="left-6 top-10 h-12 w-32 opacity-70" delay={0.8} />

      <SectionTint>
        <div className="mx-auto max-w-3xl">
          <Reveal className="text-center">
            <p className="font-display text-lg">{t(UI.scoreTitle)}</p>
            <p className="font-display text-7xl sm:text-8xl">{score}</p>
            <p className="mt-1 font-display text-2xl text-grape">{t(band)}</p>
            {best !== null && (
              <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-sunny px-4 py-1.5 text-sm font-bold text-sunny-foreground">
                <Trophy className="h-4 w-4" /> {t(T.best)}: {best}
              </p>
            )}
          </Reveal>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              {
                v: `${caughtFakes}/${fakes.length}`,
                l: { en: "Manipulated posts caught", hi: "पकड़ी गई छेड़छाड़ पोस्ट" },
                tone: "bg-teal text-teal-foreground",
              },
              {
                v: `${spread}`,
                l: { en: "You would have shared", hi: "जो आप शेयर कर देते" },
                tone: "bg-tangerine text-tangerine-foreground",
              },
              {
                v: `${results.filter((r) => !r.fake && r.correct).length}/${results.filter((r) => !r.fake).length}`,
                l: { en: "Real posts trusted", hi: "असली पोस्ट पर भरोसा" },
                tone: "bg-sunny text-sunny-foreground",
              },
            ].map((s, i) => (
              <Reveal key={i} delay={i * 90}>
                <div className={`rounded-2xl border-[3px] border-foreground p-5 shadow-pop ${s.tone}`}>
                  <p className="font-display text-4xl">{s.v}</p>
                  <p className="mt-1 text-sm font-bold">{t(s.l)}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Reveal>
              <div className="card-pop flex items-center gap-3 bg-card p-5">
                <Flame className="h-6 w-6 text-tangerine" />
                <div>
                  <p className="font-display text-2xl">{bestStreak}</p>
                  <p className="text-sm text-muted-foreground">{t(T.bestStreak)}</p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div className="card-pop flex items-center gap-3 bg-card p-5">
                <Timer className="h-6 w-6 text-teal" />
                <div>
                  <p className="font-display text-2xl">{avgMs}s</p>
                  <p className="text-sm text-muted-foreground">{t(T.reaction)}</p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Official UNESCO Hackathon Certificate Generator */}
          <Reveal delay={120}>
            <VaniCertificate
              score={score}
              caughtFakes={caughtFakes}
              totalFakes={fakes.length}
              bestStreak={bestStreak}
              lang={lang}
            />
          </Reveal>

          {/* category breakdown */}
          <div className="mt-12">
            <ColourBlockBanner tone="teal">{t(T.breakdown)}</ColourBlockBanner>
            <div className="mt-6 space-y-3">
              {byCategory.map((c, i) => (
                <Reveal key={c.label["en"] ?? i} delay={i * 60}>
                  <div className="card-pop bg-card p-4">
                    <div className="flex items-baseline justify-between gap-3">
                      <p className="font-display text-base">{t(c.label)}</p>
                      <p className="text-sm font-bold text-muted-foreground">
                        {c.ok}/{c.total}
                      </p>
                    </div>
                    <div className="mt-2 h-2.5 overflow-hidden rounded-full border-2 border-foreground bg-secondary">
                      <div
                        className="h-full bg-forest transition-[width] duration-700 ease-out"
                        style={{ width: `${(c.ok / c.total) * 100}%` }}
                      />
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {missed.length > 0 && (
            <div className="mt-12">
              <ColourBlockBanner tone="tangerine">{t(T.review)}</ColourBlockBanner>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {missed.map((p, i) => (
                  <Reveal key={p.id} delay={i * 60}>
                    <div className="card-pop h-full bg-card p-5">
                      <p className="text-xs font-black tracking-[0.16em] uppercase text-muted-foreground">
                        {t(p.category)}
                      </p>
                      <p className="mt-1 font-display text-base">{p.name}</p>
                      <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{t(p.caption)}</p>
                      {p.tells[0] && (
                        <p className="mt-3 flex gap-2 text-sm">
                          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-tangerine" />
                          <span className="font-bold">{t(p.tells[0].label)}</span>
                        </p>
                      )}
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          )}

          <div className="mt-14">
            <ColourBlockBanner tone="grape" size="lg">
              {t(UI.toolkit)}
            </ColourBlockBanner>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {TOOLKIT.map((k, i) => (
                <Reveal key={k.title.en} delay={i * 70}>
                  <div className="card-pop h-full bg-card p-5">
                    <p className="font-display text-lg">{t(k.title)}</p>
                    <p className="mt-2 text-sm text-muted-foreground">{t(k.body)}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-3">
            <PillButton tone="tangerine" onClick={onRestart}>
              <RotateCcw className="h-4 w-4" /> {t(UI.again)}
            </PillButton>
            <PillButton tone="teal" onClick={copyResult}>
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? t(T.copied) : t(T.copy)}
            </PillButton>
            <PillButton tone="cream" to="/our-vision">
              {lang === "en" ? "Where this goes next" : "आगे क्या"}
            </PillButton>
          </div>
        </div>
      </SectionTint>
    </div>
  );
}
