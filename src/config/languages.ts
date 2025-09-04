export interface Language {
  code: string;
  name: string;
  nativeName: string;
  translations: {
    // Hero Section
    heroTitle: string;
    heroSubtitle: string;
    
    // Features
    aiPowered: string;
    aiPoweredDesc: string;
    fastResults: string;
    fastResultsDesc: string;
    naturalLanguage: string;
    naturalLanguageDesc: string;
    multiLanguage: string;
    multiLanguageDesc: string;
    
    // Form
    selectLanguage: string;
    askPlaceholder: string;
    askButton: string;
    processing: string;
    analyzing: string;
    
    // Results
    answer: string;
    downloadFormats: string;
    errorOccurred: string;
    
    // Chat History
    chatHistory: string;
    noHistoryYet: string;
    noHistoryDesc: string;
    question: string;
    downloads: string;
    audio: string;
    
    // Footer
    footerText: string;
  };
}

export const languages: Record<string, Language> = {
  english: {
    code: 'english',
    name: 'English',
    nativeName: 'English',
    translations: {
      heroTitle: 'Unlock Knowledge with',
      heroSubtitle: 'Ask questions in natural language and get comprehensive answers backed by advanced AI technology',
      
      aiPowered: 'AI-Powered',
      aiPoweredDesc: 'Advanced knowledge processing',
      fastResults: 'Fast Results',
      fastResultsDesc: 'Get answers in seconds',
      naturalLanguage: 'Natural Language',
      naturalLanguageDesc: 'Ask questions naturally',
      multiLanguage: 'Multi-Language',
      multiLanguageDesc: 'Support for English, Hindi & Marathi',
      
      selectLanguage: 'Select Language:',
      askPlaceholder: 'Ask your question here...',
      askButton: 'Ask Question',
      processing: 'Processing...',
      analyzing: 'Analyzing your question...',
      
      answer: 'Answer',
      downloadFormats: 'Download formats:',
      errorOccurred: 'Error occurred:',
      
      chatHistory: 'Chat History',
      noHistoryYet: 'No chat history yet',
      noHistoryDesc: 'Your questions and answers will appear here',
      question: 'Question:',
      downloads: 'Downloads:',
      audio: 'Audio:',
      
      footerText: 'Powered by advanced AI technology • Built with React & Tailwind CSS'
    }
  },
  
  hindi: {
    code: 'hindi',
    name: 'Hindi',
    nativeName: 'हिंदी',
    translations: {
      heroTitle: 'AI शक्ति के साथ ज्ञान अनलॉक करें',
      heroSubtitle: 'प्राकृतिक भाषा में प्रश्न पूछें और उन्नत AI तकनीक द्वारा समर्थित व्यापक उत्तर प्राप्त करें',
      
      aiPowered: 'AI-संचालित',
      aiPoweredDesc: 'उन्नत ज्ञान प्रसंस्करण',
      fastResults: 'तेज़ परिणाम',
      fastResultsDesc: 'सेकंडों में उत्तर पाएं',
      naturalLanguage: 'प्राकृतिक भाषा',
      naturalLanguageDesc: 'प्राकृतिक रूप से प्रश्न पूछें',
      multiLanguage: 'बहुभाषी',
      multiLanguageDesc: 'अंग्रेजी, हिंदी और मराठी समर्थन',
      
      selectLanguage: 'भाषा चुनें:',
      askPlaceholder: 'अपना प्रश्न यहाँ पूछें...',
      askButton: 'प्रश्न पूछें',
      processing: 'प्रसंस्करण...',
      analyzing: 'आपके प्रश्न का विश्लेषण कर रहे हैं...',
      
      answer: 'उत्तर',
      downloadFormats: 'डाउनलोड प्रारूप:',
      errorOccurred: 'त्रुटि हुई:',
      
      chatHistory: 'चैट इतिहास',
      noHistoryYet: 'अभी तक कोई चैट इतिहास नहीं',
      noHistoryDesc: 'आपके प्रश्न और उत्तर यहाँ दिखाई देंगे',
      question: 'प्रश्न:',
      downloads: 'डाउनलोड:',
      audio: 'ऑडियो:',
      
      footerText: 'उन्नत AI तकनीक द्वारा संचालित • React और Tailwind CSS के साथ निर्मित'
    }
  },
  
  marathi: {
    code: 'marathi',
    name: 'Marathi',
    nativeName: 'मराठी',
    translations: {
      heroTitle: 'AI शक्तीसह ज्ञान अनलॉक करा',
      heroSubtitle: 'नैसर्गिक भाषेत प्रश्न विचारा आणि प्रगत AI तंत्रज्ञानाद्वारे समर्थित सर्वसमावेशक उत्तरे मिळवा',
      
      aiPowered: 'AI-संचालित',
      aiPoweredDesc: 'प्रगत ज्ञान प्रक्रिया',
      fastResults: 'जलद परिणाम',
      fastResultsDesc: 'सेकंदात उत्तरे मिळवा',
      naturalLanguage: 'नैसर्गिक भाषा',
      naturalLanguageDesc: 'नैसर्गिकपणे प्रश्न विचारा',
      multiLanguage: 'बहुभाषिक',
      multiLanguageDesc: 'इंग्रजी, हिंदी आणि मराठी समर्थन',
      
      selectLanguage: 'भाषा निवडा:',
      askPlaceholder: 'तुमचा प्रश्न येथे विचारा...',
      askButton: 'प्रश्न विचारा',
      processing: 'प्रक्रिया करत आहे...',
      analyzing: 'तुमच्या प्रश्नाचे विश्लेषण करत आहे...',
      
      answer: 'उत्तर',
      downloadFormats: 'डाउनलोड स्वरूप:',
      errorOccurred: 'त्रुटी आली:',
      
      chatHistory: 'चॅट इतिहास',
      noHistoryYet: 'अद्याप चॅट इतिहास नाही',
      noHistoryDesc: 'तुमचे प्रश्न आणि उत्तरे येथे दिसतील',
      question: 'प्रश्न:',
      downloads: 'डाउनलोड:',
      audio: 'ऑडिओ:',
      
      footerText: 'प्रगत AI तंत्रज्ञानाद्वारे संचालित • React आणि Tailwind CSS सह तयार केले'
    }
  }
};

export const getLanguage = (code: string): Language => {
  return languages[code] || languages.english;
};

export const getAvailableLanguages = (): Language[] => {
  return Object.values(languages);
};