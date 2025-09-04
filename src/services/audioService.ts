import { PollyClient, SynthesizeSpeechCommand } from '@aws-sdk/client-polly';

export class AudioService {
  private client: PollyClient;
  private audioCache: Map<string, string> = new Map();

  constructor() {
    this.client = new PollyClient({
      region: import.meta.env.VITE_AWS_REGION,
      credentials: {
        accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
        secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
      },
    });
  }

  async generateAudio(text: string, voiceId: string): Promise<string> {
    const cacheKey = `${text}_${voiceId}`;
    
    if (this.audioCache.has(cacheKey)) {
      return this.audioCache.get(cacheKey)!;
    }

    try {
      const command = new SynthesizeSpeechCommand({
        Text: text,
        VoiceId: "Aditi",
        OutputFormat: 'mp3',
        Engine: 'standard', // Use standard engine for better compatibility
      });

      const response = await this.client.send(command);
      
      if (response.AudioStream) {
        const audioBlob = new Blob([await response.AudioStream.transformToByteArray()], {
          type: 'audio/mpeg',
        });
        
        const audioUrl = URL.createObjectURL(audioBlob);
        this.audioCache.set(cacheKey, audioUrl);
        return audioUrl;
      }
      
      throw new Error('No audio stream received');
    } catch (error) {
      console.error('Audio Generation Error:', error);
      throw new Error('Failed to generate audio');
    }
  }

  async playAudio(audioUrl: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const audio = new Audio(audioUrl);
      
      audio.onloadeddata = () => {
        console.log('Audio loaded successfully');
      };
      
      audio.onended = () => resolve();
      audio.onerror = (error) => {
        console.error('Audio playback error:', error);
        reject(new Error('Audio playback failed'));
      };
      
      audio.play().catch((error) => {
        console.error('Audio play error:', error);
        reject(error);
      });
    });
  }
}

