import { useEffect } from "react";
import type { Message, Translation } from "../types";

const STORAGE_KEY = "instabot.session.v1";

type PersistedState = {
  messages: Array<{
    id: string;
    text: string;
    isUser: boolean;
    timestamp: string; // ISO
  }>;
  translations: Array<[string, Translation[]]>; // Map -> entries
};

export function saveSession(messages: Message[], translations: Map<string, Translation[]>) {
  const payload: PersistedState = {
    messages: messages.map(m => ({
      id: m.id,
      text: m.text,
      isUser: m.isUser,
      timestamp: m.timestamp.toISOString(),
    })),
    translations: Array.from(translations.entries()),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}

export function loadSession(): { messages: Message[]; translations: Map<string, Translation[]> } | null {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as PersistedState;
    const messages: Message[] = parsed.messages.map(m => ({
      id: m.id,
      text: m.text,
      isUser: m.isUser,
      timestamp: new Date(m.timestamp),
    }));
    const translations = new Map<string, Translation[]>(parsed.translations || []);
    return { messages, translations };
  } catch {
    return null;
  }
}

export function clearSession() {
  localStorage.removeItem(STORAGE_KEY);
}

/** Persist to localStorage whenever deps change */
export function usePersistSession(messages: Message[], translations: Map<string, Translation[]>) {
  useEffect(() => {
    saveSession(messages, translations);
  }, [messages, translations]);
}

