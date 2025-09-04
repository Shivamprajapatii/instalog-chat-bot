export class BedrockService {
  private apiEndpoint: string;

  constructor() {
    this.apiEndpoint = import.meta.env.VITE_API_ENDPOINT || '';
    
    if (!this.apiEndpoint) {
      console.error('VITE_API_ENDPOINT is not configured');
    }
  }

  async sendMessage(message: string): Promise<string> {
    if (!this.apiEndpoint) {
      throw new Error('API endpoint is not configured. Please check your environment variables.');
    }

    try {
      const response = await fetch(this.apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: message,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Response Error:', response.status, response.statusText, errorText);
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data.answer || data.response || 'No response received';
    } catch (error) {
      console.error('Bedrock API Error:', error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Failed to get response from Bedrock API');
    }
  }
}

