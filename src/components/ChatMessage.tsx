import React from 'react';
import { motion } from 'framer-motion';
import { User, Bot, Clock, Volume2, Loader2 } from 'lucide-react';
import type { Message, Translation } from '../types';
import { SUPPORTED_LANGUAGES } from '../utils/constants';
import LanguageSelector from './LanguageSelector';
import DownloadButton from './DownloadButton';

interface ChatMessageProps {
  message: Message;
  translations: Translation[];
  isTranslating: boolean;
  playingLanguage: string | null;
  onTranslate: (messageId: string, language: any) => void;
  onPlayAudio: (messageId: string, language: string, text: string, voiceId: string) => void;
  onDownload: (message: Message, translations: Translation[]) => void;
}

const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  translations,
  isTranslating,
  playingLanguage,
  onTranslate,
  onPlayAudio,
  onDownload,
}) => {
  const messageTranslations = translations.filter(t => t.language);

  // Base language (original assistant text). Use 'en' if present, else first supported.
  const baseLang = SUPPORTED_LANGUAGES.find(l => l.code === 'en') ?? SUPPORTED_LANGUAGES[0];

  const isAssistant = !message.isUser;
  const hasText = Boolean(message.text?.trim());
  const canDownload = isAssistant && hasText;
  const canBaseAudio = isAssistant && hasText; // enable audio for original assistant reply

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} mb-6`}
    >
      <div className={`flex ${message.isUser ? 'flex-row-reverse' : 'flex-row'} items-start space-x-3 max-w-4xl`}>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
            message.isUser
              ? 'bg-gradient-to-r from-blue-500 to-purple-500'
              : 'bg-gradient-to-r from-green-500 to-teal-500'
          }`}
        >
          {message.isUser ? <User className="w-5 h-5 text-white" /> : <Bot className="w-5 h-5 text-white" />}
        </motion.div>

        <div className={`flex-1 ${message.isUser ? 'mr-3' : 'ml-3'}`}>
          {/* Message bubble */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            className={`relative p-4 rounded-2xl shadow-lg ${
              message.isUser
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                : 'bg-white text-gray-900 border border-gray-200'
            }`}
          >
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>

            {/* Footer toolbar (time + actions) */}
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/20">
              <div className="flex items-center space-x-2">
                <Clock className="w-3 h-3 opacity-60" />
                <span className="text-xs opacity-60">{message.timestamp.toLocaleTimeString()}</span>
              </div>

              <div className="flex items-center gap-2">
                {/* ▶️ Audio for ORIGINAL assistant response (English) */}
                {canBaseAudio && (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() =>
                      onPlayAudio(message.id, baseLang.code, message.text, baseLang.pollyVoice)
                    }
                    disabled={playingLanguage === baseLang.code}
                    className={`p-2 rounded-full transition-all duration-300 ${
                      playingLanguage === baseLang.code
                        ? 'bg-green-100 text-green-600'
                        : 'bg-indigo-100 text-indigo-600 hover:bg-indigo-200'
                    }`}
                    title={`Play ${baseLang.name} audio`}
                  >
                    {playingLanguage === baseLang.code ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Volume2 className="w-4 h-4" />
                    )}
                  </motion.button>
                )}

                {/* Download (assistant only) */}
                {canDownload && (
                  <DownloadButton
                    onClick={() => onDownload(message, translations)}
                    size="sm"
                    tooltip="Download"
                  />
                )}
              </div>
            </div>
          </motion.div>

          {/* Translation Messages */}
          {messageTranslations.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 space-y-3">
              {messageTranslations.map((translation) => {
                const language = SUPPORTED_LANGUAGES.find(l => l.code === translation.language);
                if (!language) return null;

                return (
                  <motion.div
                    key={translation.language}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl p-4"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-lg">{language.flag}</span>
                          <span className="font-medium text-indigo-700">{language.name}</span>
                        </div>
                        <p className="text-gray-800 leading-relaxed">{translation.text}</p>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() =>
                          onPlayAudio(message.id, language.code, translation.text, language.pollyVoice)
                        }
                        disabled={playingLanguage === language.code}
                        className={`ml-3 p-2 rounded-full transition-all duration-300 ${
                          playingLanguage === language.code
                            ? 'bg-green-100 text-green-600'
                            : 'bg-indigo-100 text-indigo-600 hover:bg-indigo-200'
                        }`}
                        title={`Play ${language.name} audio`}
                      >
                        {playingLanguage === language.code ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Volume2 className="w-4 h-4" />
                        )}
                      </motion.button>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}

          {/* Inline language selector for assistant messages */}
          {!message.isUser && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-4">
              <LanguageSelector
                translations={messageTranslations}
                isTranslating={isTranslating}
                playingLanguage={playingLanguage}
                onTranslate={(language) => onTranslate(message.id, language)}
                onPlayAudio={(lang, text, voice) => onPlayAudio(message.id, lang, text, voice)}
              />
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ChatMessage;
