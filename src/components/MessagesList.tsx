import React, { useRef, useEffect } from "react";
import type { Message, Translation, Language } from "../types";
import ChatMessage from "./ChatMessage";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

interface Props {
  messages: Message[];
  translationsMap: Map<string, Translation[]>;
  isTranslating: boolean;
  playingLanguage: string | null;
  isLoading: boolean;
  onTranslate: (messageId: string, language: Language) => void;
  onPlayAudio: (messageId: string, languageCode: string, text: string, voiceId: string) => void;
  onDownload: (message: Message, messageTranslations: Translation[]) => void;
}

const MessagesList: React.FC<Props> = ({
  messages,
  translationsMap,
  isTranslating,
  playingLanguage,
  isLoading,
  onTranslate,
  onPlayAudio,
  onDownload,
}) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  if (messages.length === 0) return null;

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-4">
      {messages.map((message) => (
        <ChatMessage
          key={message.id}
          message={message}
          translations={translationsMap.get(message.id) || []}
          isTranslating={isTranslating}
          playingLanguage={playingLanguage}
          onTranslate={onTranslate}
          onPlayAudio={onPlayAudio}
          onDownload={onDownload}
        />
      ))}

      {isLoading && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-start"
        >
          <div className="bg-white p-4 rounded-2xl shadow-lg border border-gray-200 flex items-center space-x-3">
            <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
            <span className="text-gray-600">AI is thinking...</span>
          </div>
        </motion.div>
      )}

      <div ref={bottomRef} />
    </div>
  );
};

export default MessagesList;

