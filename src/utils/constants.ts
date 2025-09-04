import type { Language } from '../types';

export const SUPPORTED_LANGUAGES: Language[] = [
  { code: 'en', name: 'English', flag: '🇺🇸', pollyVoice: 'Joanna' },
  { code: 'hi', name: 'Hindi', flag: '🇮🇳', pollyVoice: 'Aditi' },
  { code: 'mr', name: 'Marathi', flag: '🇮🇳', pollyVoice: 'Aditi' },
];

export const DEFAULT_LANGUAGE = SUPPORTED_LANGUAGES[0];


