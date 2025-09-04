import React from "react";
import { motion } from "framer-motion";
import { Volume2, Loader2 } from "lucide-react";
import type { Language, Translation } from "../types";
import { SUPPORTED_LANGUAGES } from "../utils/constants";

interface LanguageSelectorProps {
  translations: Translation[];
  isTranslating: boolean;
  playingLanguage: string | null;
  onTranslate: (language: Language) => void;
  onPlayAudio: (language: string, text: string, voiceId: string) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  translations,
  isTranslating,
  playingLanguage,
  onTranslate,
  onPlayAudio,
}) => {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {SUPPORTED_LANGUAGES.map((language) => {
        const translation = translations.find(
          (t) => t.language === language.code
        );
        const isLoading = isTranslating;
        const isPlaying = playingLanguage === language.code;

        return (
          <motion.div
            key={language.code}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white shadow-sm px-4 py-2"
          >
            {/* Translate button */}
            <button
              onClick={() => onTranslate(language)}
              disabled={isLoading}
              className="flex items-center gap-2 disabled:opacity-50"
            >
              <span className="text-xl">{language.flag}</span>
              <span className="font-medium text-gray-900">{language.name}</span>
            </button>

            {/* Audio button */}
            {translation && (
              <button
                onClick={() =>
                  onPlayAudio(language.code, translation.text, language.pollyVoice)
                }
                disabled={isPlaying}
                className={`p-2 rounded-full transition ${
                  isPlaying
                    ? "bg-green-100 text-green-600"
                    : "bg-blue-100 text-blue-600 hover:bg-blue-200"
                }`}
              >
                {isPlaying ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </button>
            )}
          </motion.div>
        );
      })}
    </div>
  );
};

export default LanguageSelector;
