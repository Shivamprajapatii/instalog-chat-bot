export interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export interface Translation {
  language: string;
  text: string;
  isPlaying?: boolean;
}

export interface Language {
  code: string;
  name: string;
  flag: string;
  pollyVoice: string;
}

