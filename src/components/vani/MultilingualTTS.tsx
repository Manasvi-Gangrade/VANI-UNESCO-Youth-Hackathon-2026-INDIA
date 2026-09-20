import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
  memo,
} from "react";
import { Volume2, VolumeX, Languages } from "lucide-react";

// --- GLOBAL TYPES FOR GOOGLE TRANSLATE ---
declare global {
  interface Window {
    googleTranslateElementInit: () => void;
    google: any;
  }
}

// --- PART 1: TEXT-TO-SPEECH (TTS) ON HOVER CONTEXT ---
interface TTSContextType {
  speak: (text: string, manualLang?: string) => void;
  stop: () => void;
  speaking: boolean;
  supported: boolean;
  ttsEnabled: boolean;
  setTtsEnabled: (enabled: boolean) => void;
}

const TTSContext = createContext<TTSContextType | undefined>(undefined);

export const TTSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [speaking, setSpeaking] = useState(false);
  const [supported, setSupported] = useState(false);

  // Auto-enable Voice on hover by default (or toggleable)
  const [ttsEnabled, setTtsEnabled] = useState(false);
  const voicesRef = useRef<SpeechSynthesisVoice[]>([]);

  // Initialize speech synthesis and load voices
  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      setSupported(true);
      const updateVoices = () => {
        voicesRef.current = window.speechSynthesis.getVoices();
      };
      window.speechSynthesis.onvoiceschanged = updateVoices;
      updateVoices();
    }
  }, []);

  // Speak Function that auto-detects current Google Translate language
  const speak = useCallback(
    (text: string, manualLang?: string) => {
      if (!supported || typeof window === "undefined") return;

      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      const voices =
        voicesRef.current.length > 0
          ? voicesRef.current
          : window.speechSynthesis.getVoices();

      // Detect current language from Google Translate Cookie
      let lang = manualLang;
      if (!lang) {
        const googCookie = document.cookie.match(/(^|;)\s*googtrans=([^;]+)/);
        if (googCookie && googCookie[2]) {
          // Extracts target language from cookie (e.g., "/en/hi" -> "hi")
          const parts = googCookie[2].split("/");
          lang = parts.length > 2 ? parts[2] : "en";
        } else {
          lang = "en"; // Default fallback
        }
      }

      // Try to find a voice that matches the selected language
      let preferredVoice = voices.find(
        (v) =>
          v.lang.startsWith(lang as string) ||
          v.lang.startsWith(lang?.toLowerCase() as string)
      );

      // Final Fallback for all cases
      if (!preferredVoice) {
        preferredVoice = voices.find(
          (v) => v.lang.startsWith("en-US") || v.name.includes("Google US")
        );
      }

      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }

      utterance.onstart = () => setSpeaking(true);
      utterance.onend = () => setSpeaking(false);
      utterance.onerror = () => setSpeaking(false);

      window.speechSynthesis.speak(utterance);
    },
    [supported]
  );

  const stop = useCallback(() => {
    if (!supported || typeof window === "undefined") return;
    window.speechSynthesis.cancel();
    setSpeaking(false);
  }, [supported]);

  // Global Hover Listener to trigger speech
  useEffect(() => {
    if (!ttsEnabled || !supported || typeof window === "undefined") return;

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Target elements that usually contain readable text
      const interactable = target.closest(
        "button, a, h1, h2, h3, h4, h5, h6, p, li, span, label"
      );

      if (interactable) {
        // Prevent reading widget controls
        if (interactable.closest("#google_translate_element, #tts-toggle-btn, .goog-te-combo")) {
          return;
        }

        // First look for screen-reader text, then alt text, then visible text
        const text =
          interactable.getAttribute("aria-label") ||
          interactable.getAttribute("alt") ||
          (interactable as HTMLElement).innerText;

        if (text && text.trim().length > 0) {
          // Prevent reading extremely long chunks of text accidentally
          if (text.length < 300) {
            speak(text.trim());
          }
        }
      }
    };

    const handleMouseOut = () => {
      stop();
    };

    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      stop();
    };
  }, [ttsEnabled, supported, speak, stop]);

  return (
    <TTSContext.Provider
      value={{ speak, stop, speaking, supported, ttsEnabled, setTtsEnabled }}
    >
      {children}
    </TTSContext.Provider>
  );
};

export const useTTS = () => {
  const context = useContext(TTSContext);
  if (!context) throw new Error("useTTS must be used within a TTSProvider");
  return context;
};

// --- PART 2: GOOGLE TRANSLATE WIDGET COMPONENT (ALL 230+ LANGUAGES, BRANDING HIDDEN) ---
export const GoogleTranslateWidget = memo(() => {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check if the script is already added
    if (!document.getElementById("google-translate-script")) {
      // Define the global callback function that Google script will trigger
      window.googleTranslateElementInit = () => {
        if (window.google && window.google.translate) {
          new window.google.translate.TranslateElement(
            {
              pageLanguage: "en", // Base language of your app
              autoDisplay: false,
            },
            "google_translate_element"
          );
        }
      };

      // Injects the Google Translate Script
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    }

    // Observer to continuously suppress only floating translate icon, edit badge, or banner outside #root
    const observer = new MutationObserver(() => {
      const elementsToHide = document.querySelectorAll(
        'body > [class*="VIpgJd"], body > div[class*="VIpgJd"], #goog-gt-tt, #goog-gt-vt, .goog-te-balloon-frame, .goog-te-banner-frame, iframe[id*=":1.container"], iframe[id*=":2.container"]'
      );
      elementsToHide.forEach((el) => {
        // Guarantee that elements inside our app root are NEVER hidden
        if (el.closest("#root") || el.closest("#google_translate_element")) {
          return;
        }
        const htmlEl = el as HTMLElement;
        htmlEl.style.setProperty("display", "none", "important");
        htmlEl.style.setProperty("visibility", "hidden", "important");
        htmlEl.style.setProperty("opacity", "0", "important");
        htmlEl.style.setProperty("pointer-events", "none", "important");
      });
      if (document.body.style.top && document.body.style.top !== "0px") {
        document.body.style.top = "0px";
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex items-center gap-1.5 rounded-full border-2 border-foreground bg-card px-2.5 py-1 shadow-sm hover:bg-sunny transition">
      <Languages className="h-4 w-4 text-foreground shrink-0" />
      <div
        id="google_translate_element"
        style={{ display: "flex", alignItems: "center" }}
      >
        {/* The Google Translate dropdown with all 230+ languages is injected here */}
      </div>
    </div>
  );
});

// --- PART 3: ACCESSIBILITY VOICE TOGGLE BUTTON ---
export function TTSToggleButton() {
  const { ttsEnabled, setTtsEnabled, supported } = useTTS();

  if (!supported) return null;

  return (
    <button
      id="tts-toggle-btn"
      onClick={() => setTtsEnabled(!ttsEnabled)}
      title={
        ttsEnabled
          ? "Voice reader is ON (Click to mute)"
          : "Voice reader is OFF (Click to enable audio reading)"
      }
      className={`inline-flex items-center gap-1.5 rounded-full border-2 border-foreground px-2.5 py-1 text-xs font-bold transition shadow-sm ${
        ttsEnabled
          ? "bg-teal text-teal-foreground animate-pulse"
          : "bg-card text-foreground hover:bg-sunny"
      }`}
    >
      {ttsEnabled ? (
        <Volume2 className="h-3.5 w-3.5" />
      ) : (
        <VolumeX className="h-3.5 w-3.5 text-muted-foreground" />
      )}
      <span className="hidden xl:inline">{ttsEnabled ? "Voice ON" : "Voice Read"}</span>
    </button>
  );
}
