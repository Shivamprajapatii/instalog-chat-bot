const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT_2;

export const sendMessage = async (message: string): Promise<string> => {
  if (!API_ENDPOINT) {
    throw new Error('API endpoint is not configured. Please check your .env file.');
  }
  
  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: message,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to send message');
    }

    const data = await response.json();
    return data.response || data.answer || data.message || 'I received your message, but I\'m not sure how to respond right now.';
  } catch (error) {
    console.error('API Error:', error);
    throw new Error('Sorry, I\'m having trouble connecting right now. Please try again.');
  }
};


