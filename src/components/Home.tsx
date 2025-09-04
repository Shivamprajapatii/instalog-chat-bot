import { useCallback, useEffect, useState } from "react";
import { motion, type Variants } from "framer-motion";
import LanguageButtons from "./LanguageButtons";
import type { Language, Translation } from "../types";

import {
  History,
  Globe2,
  Settings2,
  ShieldCheck,
  Rocket,
  BookOpen,
  ChevronRight,
} from "lucide-react";
import ChatInterface from "./ChatInterface";

const STORAGE_KEY = "instabot.session.v1";

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const item: Variants = {
  hidden: { y: 10, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 160, damping: 18 },
  },
};

type PersistedState = {
  messages: Array<{
    id: string;
    text: string;
    isUser: boolean;
    timestamp: string; // ISO
  }>;
  translations: Array<[string, Translation[]]>;
};

type RecentItem = {
  id: string;
  preview: string;
  ts: number;
};

export default function Home() {
  // --- Language state (existing) ---
  const [selectedLang, setSelectedLang] = useState<string>("en");
  const [translations, setTranslations] = useState<Translation[]>([]);
  const [isTranslating, setIsTranslating] = useState(false);
  const [playingLanguage, setPlayingLanguage] = useState<string | null>(null);

  // --- Recent from persisted session ---
  const [recent, setRecent] = useState<RecentItem[]>([]);

  // Read the latest persisted session and compute recent user prompts
  const loadRecentFromStorage = useCallback(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      setRecent([]);
      return;
    }
    try {
      const parsed = JSON.parse(raw) as PersistedState;
      const msgs = (parsed?.messages || []) as PersistedState["messages"];

      // take only user messages (questions), newest first
      const recents: RecentItem[] = msgs
        .filter((m) => m.isUser && (m.text || "").trim().length > 0)
        .map((m) => ({
          id: m.id,
          preview: (m.text || "").trim(),
          ts: new Date(m.timestamp).getTime(),
        }))
        .sort((a, b) => b.ts - a.ts)
        .slice(0, 5);

      setRecent(recents);
    } catch {
      setRecent([]);
    }
  }, []);

  useEffect(() => {
    loadRecentFromStorage();

    // Optional: refresh the Recent list when the tab regains focus
    const onFocus = () => loadRecentFromStorage();
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, [loadRecentFromStorage]);

  // Replace these with your real AWS calls
  const handleTranslate = useCallback(async (lang: Language) => {
    setSelectedLang(lang.code);
    setIsTranslating(true);
    try {
      // TODO: Call Amazon Translate here and set the returned text
      const newText = `Sample ${lang.name} translation`;
      setTranslations((prev) => {
        const others = prev.filter((t) => t.language !== lang.code);
        return [{ language: lang.code, text: newText }, ...others];
      });
    } finally {
      setIsTranslating(false);
    }
  }, []);

  const handlePlayAudio = useCallback(async (code: string) => {
    setPlayingLanguage(code);
    try {
      // TODO: Call Polly/TTS here
      // await playPollyAudio({ code, text, voiceId })
    } finally {
      setPlayingLanguage(null);
    }
  }, []);

  // Optional: click on a recent item; for now just no-op or console log.
  // You could wire this to prefill the composer in ChatInterface via a shared store/context if desired.
  const handleClickRecent = (r: RecentItem) => {
    Example: console.log("Open recent:", r);
    // Minimal: do nothing for now (since ChatInterface manages its own state).
  };

  return (
    <div className="relative min-h-[calc(100vh-0px)] w-full">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 -z-20">
        <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_-10%,rgba(99,102,241,0.25),transparent),radial-gradient(60%_60%_at_80%_0%,rgba(147,51,234,0.20),transparent),radial-gradient(60%_60%_at_20%_0%,rgba(79,70,229,0.18),transparent)]" />
        <div
          className="absolute inset-0 mix-blend-overlay opacity-[0.06]"
          style={{
            backgroundImage:
              "url('data:image/svg+xml;utf8, %3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' viewBox=\\'0 0 32 32\\'%3E%3Cdefs%3E%3Cpattern id=\\'p\\' width=\\'32\\' height=\\'32\\' patternUnits=\\'userSpaceOnUse\\'%3E%3Cpath d=\\'M0 32V0h32\\' fill=\\'none\\' stroke=\\'%23ffffff\\' stroke-opacity=\\'0.3\\'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width=\\'100%25\\' height=\\'100%25\\' fill=\\'url(%23p)\\'/%3E%3C/svg%3E')",
          }}
        />
      </div>

      {/* Page content */}
      <motion.main
        initial="hidden"
        animate="show"
        variants={container}
        className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 lg:py-8"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6">
          {/* Sidebar (Info / Shortcuts) */}
          <aside className="lg:col-span-4 xl:col-span-3 space-y-5">
            <motion.section
              variants={item}
              className="rounded-2xl border border-white/20 bg-white/60 dark:bg-zinc-900/40 backdrop-blur-xl shadow-sm p-4"
            >
              <ul className="space-y-2 text-sm">
                {[
                  { icon: Rocket, text: "Ask anything — press Enter to send" },
                  { icon: BookOpen, text: "Use /help for commands & tips" },
                  { icon: ShieldCheck, text: "Your chats are secured with best practices" },
                ].map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-center gap-2">
                    <Icon className="h-4 w-4 shrink-0" />
                    <span className="text-zinc-700/90 dark:text-zinc-200/90">{text}</span>
                  </li>
                ))}
              </ul>
            </motion.section>

            {/* Recent (from real session) */}
            <motion.section
              variants={item}
              className="rounded-2xl border border-white/20 bg-white/60 dark:bg-zinc-900/40 backdrop-blur-xl shadow-sm p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <History className="h-5 w-5" />
                  <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-700 dark:text-zinc-200">
                    Recent
                  </h2>
                </div>
                <button
                  onClick={loadRecentFromStorage}
                  className="text-xs px-2 py-1 rounded-full border border-white/30 hover:bg-white/40 dark:hover:bg-white/10"
                >
                  Refresh
                </button>
              </div>

              {recent.length === 0 ? (
                <p className="text-xs text-zinc-600 dark:text-zinc-300">
                  No recent questions yet. Start a conversation!
                </p>
              ) : (
                <ul className="space-y-1.5">
                  {recent.map((r) => (
                    <li key={r.id}>
                      <button
                        onClick={() => handleClickRecent(r)}
                        className="group w-full text-left text-sm px-3 py-2 rounded-xl border border-white/10 hover:border-white/30 bg-white/40 dark:bg-white/5 hover:bg-white/60 dark:hover:bg-white/10 transition"
                        title={r.preview}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-zinc-700 dark:text-zinc-200 line-clamp-1">
                            {r.preview}
                          </span>
                          <ChevronRight className="h-4 w-4 opacity-60 group-hover:translate-x-0.5 transition" />
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </motion.section>

            {/* Language */}
            <motion.section
              variants={item}
              className="rounded-2xl border border-white/20 bg-white/60 dark:bg-zinc-900/40 backdrop-blur-xl shadow-sm p-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <Globe2 className="h-5 w-5" />
                <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-700 dark:text-zinc-200">
                  Language
                </h2>
              </div>

              <LanguageButtons
                translations={translations}
                isTranslating={isTranslating}
                playingLanguage={playingLanguage}
                onTranslate={handleTranslate}
                onPlayAudio={handlePlayAudio}
                selectedCode={selectedLang}
                onSelectCode={setSelectedLang}
              />

              <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-300">
                Click a language to translate. Use the speaker to play audio.
              </p>
            </motion.section>
          </aside>

          {/* Workspace (Chat) */}
          <section className="lg:col-span-8 xl:col-span-9">
            <motion.div
              variants={item}
              className="relative rounded-3xl border border-white/20 bg-white/70 dark:bg-zinc-900/50 backdrop-blur-xl shadow-xl p-2 sm:p-3"
            >
              {/* Soft inner border glow */}
              <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/30" />

              {/* Top toolbar */}
              <div className="flex items-center justify-between gap-2 px-2 sm:px-3 pt-2">
                <div className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-medium text-emerald-700 dark:text-emerald-300">
                    Ready
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button className="text-xs px-2 py-1 rounded-lg border border-white/30 hover:bg-white/40 dark:hover:bg-white/10">
                    <Settings2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Chat Body */}
              <div className="mt-2 sm:mt-3 rounded-2xl bg-white/60 dark:bg-white/5 border border-white/20 p-2 sm:p-3 min-h-[60vh] flex flex-col">
                <ChatInterface />
              </div>
            </motion.div>
          </section>
        </div>
      </motion.main>
    </div>
  );
}
