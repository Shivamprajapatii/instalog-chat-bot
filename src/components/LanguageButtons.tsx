import React from "react";
import { motion } from "framer-motion";
import { Volume2, Loader2 } from "lucide-react";
import type { Language, Translation } from "../types";
import { SUPPORTED_LANGUAGES } from "../utils/constants";

type Props = {
  translations: Translation[];
  isTranslating: boolean;
  playingLanguage: string | null;
  onTranslate: (language: Language) => void;
  onPlayAudio: (language: string, text: string, voiceId: string) => void;
  selectedCode?: string;                      // optional: highlight active language
  onSelectCode?: (code: string) => void;      // optional: local UI selection
};

const LanguageButtons: React.FC<Props> = ({
  translations,
  isTranslating,
  playingLanguage,
  onTranslate,
  onPlayAudio,
  selectedCode,
  onSelectCode,
}) => {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {SUPPORTED_LANGUAGES.map((language) => {
        const { code, name, flag, pollyVoice } = language; // code: 'en' | 'hi' | 'mr'
        const translation = translations.find((t) => t.language === code);
        const isPlaying = playingLanguage === code;
        const isSelected = selectedCode ? selectedCode === code : code === "en";

        return (
          <motion.div
            key={code}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            className={`inline-flex items-center gap-2 rounded-full border px-2 py-1.5 shadow-sm
              ${isSelected
                ? "border-white/40 bg-white text-zinc-900 dark:bg-white/10 dark:text-zinc-100"
                : "border-white/20 bg-white/70 text-zinc-800 dark:bg-white/10 dark:text-zinc-100"}`}
          >
            {/* Main language button */}
            <button
              onClick={() => {
                onSelectCode?.(code);
                onTranslate(language);
              }}
              disabled={isTranslating}
              className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm disabled:opacity-60"
              aria-label={`Translate to ${name}`}
            >
              <span className="text-base leading-none">{flag}</span>
              <span className="font-medium capitalize">{name}</span>
            </button>

            {/* Play audio only if we have a translation */}
            {translation && (
              <button
                onClick={() => onPlayAudio(code, translation.text, pollyVoice)}
                disabled={isPlaying}
                className={`rounded-full p-1.5 transition
                  ${isPlaying
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-blue-100 text-blue-700 hover:bg-blue-200"}`}
                aria-label={`Play ${name} audio`}
              >
                {isPlaying ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Volume2 className="h-4 w-4" />
                )}
              </button>
            )}
          </motion.div>
        );
      })}
    </div>
  );
};

export default LanguageButtons;

