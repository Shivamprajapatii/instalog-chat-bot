import React, { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import toast from "react-hot-toast";
import type { Message, Translation, Language } from "../types";
import { BedrockService } from "../services/bedrockService";
import { TranslationService } from "../services/transalateService";
import { AudioService } from "../services/audioService";

import ChatHeader from "./ChatHeader";
import MessagesList from "./MessagesList";
import Composer from "./Composer";

import { usePersistSession, loadSession, clearSession } from "../hooks/useChatPersistence";
import { formatQAText, downloadTextFile } from "../utils/export";

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [translations, setTranslations] = useState<Map<string, Translation[]>>(new Map());
  const [isTranslating, setIsTranslating] = useState(false);
  const [playingLanguage, setPlayingLanguage] = useState<string | null>(null);

  const bedrockService = new BedrockService();
  const translationService = new TranslationService();
  const audioService = new AudioService();

  // Load persisted session on mount
  useEffect(() => {
    const loaded = loadSession();
    if (loaded) {
      setMessages(loaded.messages);
      setTranslations(loaded.translations);
    }
  }, []);

  // Persist to localStorage whenever messages/translations change
  usePersistSession(messages, translations);

  const handleSendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsLoading(true);

    try {
      const response = await bedrockService.sendMessage(userMessage.text);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      toast.success("Response received!");
    } catch (error) {
      toast.error("Failed to get response from AI");
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTranslate = async (messageId: string, language: Language) => {
    const message = messages.find((m) => m.id === messageId);
    if (!message || isTranslating) return;

    setIsTranslating(true);
    try {
      const translatedText = await translationService.translateText(message.text, language.code);
      const translation: Translation = { language: language.code, text: translatedText };

      setTranslations((prev) => {
        const next = new Map(prev);
        const list = next.get(messageId) || [];
        const idx = list.findIndex((t) => t.language === language.code);
        if (idx >= 0) list[idx] = translation;
        else list.push(translation);
        next.set(messageId, list);
        return next;
      });

      toast.success(`Translated to ${language.name}`);
    } catch (error) {
      toast.error(`Failed to translate to ${language.name}`);
      console.error("Translation error:", error);
    } finally {
      setIsTranslating(false);
    }
  };

  const handlePlayAudio = async (_messageId: string, languageCode: string, text: string, voiceId: string) => {
    if (playingLanguage === languageCode) return;
    setPlayingLanguage(languageCode);
    try {
      const audioUrl = await audioService.generateAudio(text, voiceId);
      await audioService.playAudio(audioUrl);
      toast.success("Audio played successfully");
    } catch (error) {
      toast.error("Failed to play audio");
      console.error("Audio error:", error);
    } finally {
      setTimeout(() => setPlayingLanguage(null), 500);
    }
  };

  // Download QA as .txt (pairs user<->assistant + optional translations)
  const handleDownload = useCallback(
    (message: Message, messageTranslations: Translation[]) => {
      const idx = messages.findIndex((m) => m.id === message.id);
      let question = "";
      let response = "";

      if (message.isUser) {
        question = message.text || "";
        for (let i = idx + 1; i < messages.length; i++) {
          if (!messages[i].isUser) {
            response = messages[i].text || "";
            break;
          }
        }
      } else {
        response = message.text || "";
        for (let i = idx - 1; i >= 0; i--) {
          if (messages[i].isUser) {
            question = messages[i].text || "";
            break;
          }
        }
      }

      if (!question && !response) {
        toast.error("Nothing to export.");
        return;
      }

      const content = formatQAText({
        question: question || "(No question found)",
        response: response || "(No response found)",
        translations: messageTranslations || [],
        timestamp: new Date(),
      });

      const shortId = message.id?.slice(0, 8) || `${Date.now()}`;
      downloadTextFile(`instabot-${shortId}.txt`, content);
      toast.success("Conversation downloaded!");
    },
    [messages]
  );

  const handleDeleteConversation = () => {
    setMessages([]);
    setTranslations(new Map());
    clearSession();
    toast.success("Conversation cleared");
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <ChatHeader hasConversation={messages.length > 0} onDelete={handleDeleteConversation} />

      {/* Welcome panel */}
      <AnimatePresence>
        {messages.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex-1 flex items-center justify-center p-8"
          >
            <div className="text-center max-w-2xl">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                <Sparkles className="w-16 h-16 text-purple-500 mx-auto mb-6" />
              </motion.div>

              <h2 className="text-3xl font-bold text-gray-800 mb-4">Welcome to AI Translator</h2>

              <p className="text-lg text-gray-600 mb-8">
                Ask me anything and I'll respond with the power of Amazon Bedrock.
                Then translate my responses to multiple languages with native audio!
              </p>

              <div className="grid md:grid-cols-3 gap-6 text-sm">
                <div className="bg-white p-4 rounded-xl shadow-md">
                  <div className="text-2xl mb-2">🤖</div>
                  <h3 className="font-semibold text-gray-800">AI-Powered</h3>
                  <p className="text-gray-600">Advanced responses from Amazon Bedrock</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-md">
                  <div className="text-2xl mb-2">🌍</div>
                  <h3 className="font-semibold text-gray-800">Multi-Language</h3>
                  <p className="text-gray-600">Translate to 8+ languages instantly</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-md">
                  <div className="text-2xl mb-2">🔊</div>
                  <h3 className="font-semibold text-gray-800">Voice Output</h3>
                  <p className="text-gray-600">Listen to translations with native voices</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Messages */}
      <MessagesList
        messages={messages}
        translationsMap={translations}
        isTranslating={isTranslating}
        playingLanguage={playingLanguage}
        isLoading={isLoading}
        onTranslate={handleTranslate}
        onPlayAudio={handlePlayAudio}
        onDownload={handleDownload}
      />

      {/* Composer */}
      <Composer
        value={inputText}
        disabled={isLoading}
        onChange={setInputText}
        onSend={handleSendMessage}
        onEnter={handleSendMessage}
      />
    </div>
  );
};

export default ChatInterface;
