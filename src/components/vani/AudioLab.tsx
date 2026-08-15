import { useState, useEffect } from "react";
import { Play, Pause, Radio, Volume2, ShieldCheck, AlertTriangle, Sparkles, Check, X } from "lucide-react";
import { playSound } from "./SimulatorMedia";

export function AudioLab() {
  const [playing, setPlaying] = useState<"real" | "clone" | null>(null);
  const [progress, setProgress] = useState(0);
  const [quizAnswer, setQuizAnswer] = useState<"A" | "B" | null>(null);

  useEffect(() => {
    let interval: number | undefined;
    if (playing) {
      setProgress(0);
      interval = window.setInterval(() => {
        setProgress((p) => {
          if (p >= 100) {
            setPlaying(null);
            return 0;
          }
          return p + 2;
        });
      }, 100);

      // Web Speech API sample
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
        const text =
          playing === "real"
            ? "Hey, listen. The library books just arrived today, so let's meet up after class if you're free."
            : "Emergency announcement. Transfer the examination registration fee before the link closes tonight.";

        const utterance = new SpeechSynthesisUtterance(text);
        if (playing === "clone") {
          utterance.rate = 1.05;
          utterance.pitch = 0.85; // slightly monotone/flatter
        } else {
          utterance.rate = 0.95;
          utterance.pitch = 1.1; // natural lively variation
        }
        utterance.onend = () => {
          setPlaying(null);
          setProgress(0);
        };
        window.speechSynthesis.speak(utterance);
      }
    } else {
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    }

    return () => {
      if (interval) window.clearInterval(interval);
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [playing]);

  const realBars = [35, 60, 45, 90, 75, 40, 65, 80, 50, 85, 30, 70, 95, 60, 40, 20, 10, 55, 75, 40, 25, 10];
  const cloneBars = [50, 75, 60, 85, 70, 55, 80, 75, 65, 80, 60, 75, 70, 65, 70, 65, 30, 30, 30, 30, 30, 30]; // flat metronomic end

  return (
    <div className="card-pop rounded-3xl border-[4px] border-foreground bg-card p-6 sm:p-10 shadow-lift">
      <div className="space-y-2 text-center sm:text-left">
        <span className="inline-flex items-center gap-1.5 rounded-full border-2 border-foreground bg-teal px-3.5 py-1 text-xs font-black uppercase text-teal-foreground">
          <Radio className="h-3.5 w-3.5 animate-pulse" />
          Interactive Deepfake Ear Training Lab
        </span>
        <h3 className="font-display text-2xl sm:text-4xl font-extrabold tracking-tight">
          Can You Hear the "Sentence Tail"?
        </h3>
        <p className="max-w-2xl text-sm sm:text-base text-foreground/85 font-medium leading-relaxed">
          Generative voice models produce speech by calculating probability matrices, not lungs. Listen to both samples below and observe how natural human speech varies while synthetic speech flattens into a robotic metronome.
        </p>
      </div>

      {/* A/B Comparison Cards */}
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {/* Sample A: Natural Human Voice */}
        <div className="rounded-2xl border-[3px] border-foreground bg-[#F2FAF4] p-5 shadow-pop flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-display text-base font-bold text-forest">
                Sample A: Authentic Human Voice
              </span>
              <span className="rounded-full bg-forest/20 px-2.5 py-0.5 text-[11px] font-black text-forest">
                GENUINE AUDIO
              </span>
            </div>

            {/* Visualizer */}
            <div className="flex h-14 items-center gap-1 rounded-xl border-2 border-forest/30 bg-white p-3">
              <button
                onClick={() => {
                  playSound("click");
                  setPlaying(playing === "real" ? null : "real");
                }}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-foreground bg-forest text-white hover:scale-105 transition"
              >
                {playing === "real" ? <Pause className="h-4 w-4 fill-white" /> : <Play className="ml-0.5 h-4 w-4 fill-white" />}
              </button>
              <div className="flex flex-1 items-center gap-1 h-8 px-2">
                {realBars.map((h, idx) => (
                  <div
                    key={idx}
                    className={`w-1 rounded-full transition-all ${
                      playing === "real" && (idx / realBars.length) * 100 <= progress
                        ? "bg-forest"
                        : "bg-forest/30"
                    }`}
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>

            {/* Acoustic Cues */}
            <div className="space-y-1 text-xs text-foreground/80 font-medium">
              <p>✓ <strong>Micro-pauses:</strong> Irregular breath timing (220ms - 450ms)</p>
              <p>✓ <strong>Pitch contour:</strong> Sentence ending lifts or falls organically</p>
              <p>✓ <strong>Ambient decay:</strong> Natural room reverb captured on microphone</p>
            </div>
          </div>
        </div>

        {/* Sample B: Cloned Synthetic Voice */}
        <div className="rounded-2xl border-[3px] border-foreground bg-[#FFF5F2] p-5 shadow-pop flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-display text-base font-bold text-tangerine">
                Sample B: Cloned Synthetic Audio
              </span>
              <span className="rounded-full bg-tangerine/20 px-2.5 py-0.5 text-[11px] font-black text-tangerine">
                SYNTHETIC CLONE
              </span>
            </div>

            {/* Visualizer */}
            <div className="flex h-14 items-center gap-1 rounded-xl border-2 border-tangerine/30 bg-white p-3">
              <button
                onClick={() => {
                  playSound("click");
                  setPlaying(playing === "clone" ? null : "clone");
                }}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-foreground bg-tangerine text-white hover:scale-105 transition"
              >
                {playing === "clone" ? <Pause className="h-4 w-4 fill-white" /> : <Play className="ml-0.5 h-4 w-4 fill-white" />}
              </button>
              <div className="flex flex-1 items-center gap-1 h-8 px-2">
                {cloneBars.map((h, idx) => {
                  const isTail = idx >= cloneBars.length - 6;
                  return (
                    <div
                      key={idx}
                      className={`w-1 rounded-full transition-all ${
                        playing === "clone" && (idx / cloneBars.length) * 100 <= progress
                          ? "bg-tangerine"
                          : "bg-tangerine/30"
                      } ${isTail ? "ring-1 ring-red-500" : ""}`}
                      style={{ height: `${h}%` }}
                    />
                  );
                })}
              </div>
            </div>

            {/* Forensic Tells */}
            <div className="space-y-1 text-xs text-foreground/80 font-medium">
              <p className="text-red-700">⚠️ <strong>The Flat Tail:</strong> Final 4 bars freeze at identical pitch</p>
              <p>⚠️ <strong>Missing breath:</strong> Sentences run long without diaphragm replenishment</p>
              <p>⚠️ <strong>Dry acoustic isolation:</strong> Zero room warmth or natural background noise</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mini Interactive Ear-Check Challenge */}
      <div className="mt-8 rounded-2xl border-2 border-foreground bg-sunny/30 p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <span className="font-display text-sm font-bold block text-foreground">
            Auditory Check: Which sample has the unnatural "metronomic tail"?
          </span>
          <p className="text-xs text-foreground/75 font-medium">
            Test your forensic intuition right now before you jump into the full simulator.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              playSound("wrong");
              setQuizAnswer("A");
            }}
            className={`rounded-full border-2 border-foreground px-4 py-1.5 text-xs font-black shadow-sm transition hover:bg-card ${
              quizAnswer === "A" ? "bg-red-200 border-red-600" : "bg-card"
            }`}
          >
            Sample A
          </button>
          <button
            onClick={() => {
              playSound("correct");
              setQuizAnswer("B");
            }}
            className={`rounded-full border-2 border-foreground px-4 py-1.5 text-xs font-black shadow-sm transition hover:bg-card ${
              quizAnswer === "B" ? "bg-teal text-teal-foreground border-foreground" : "bg-card"
            }`}
          >
            Sample B (Clone)
          </button>
        </div>
      </div>

      {quizAnswer === "B" && (
        <div className="mt-3 rise-in flex items-center gap-2 text-xs font-black text-forest">
          <Check className="h-4 w-4" />
          Spot on! Sample B exhibits the mathematical tail drop characteristic of voice-cloning pipelines.
        </div>
      )}
      {quizAnswer === "A" && (
        <div className="mt-3 rise-in flex items-center gap-2 text-xs font-black text-red-600">
          <X className="h-4 w-4" />
          Sample A is the natural voice with human breath variations. Try listening to Sample B's ending again!
        </div>
      )}
    </div>
  );
}
