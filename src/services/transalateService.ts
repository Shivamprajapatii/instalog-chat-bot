import { TranslateClient, TranslateTextCommand } from '@aws-sdk/client-translate';

export class TranslationService {
  private client: TranslateClient;

  constructor() {
    this.client = new TranslateClient({
      region: import.meta.env.VITE_AWS_REGION,
      credentials: {
        accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
        secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
      },
    });
  }

  async translateText(text: string, targetLanguage: string): Promise<string> {
    try {
      const command = new TranslateTextCommand({
        Text: text,
        SourceLanguageCode: 'auto',
        TargetLanguageCode: targetLanguage,
      });

      const response = await this.client.send(command);
      return response.TranslatedText || text;
    } catch (error) {
      console.error('Translation Error:', error);
      throw new Error('Failed to translate text');
    }
  }
}

