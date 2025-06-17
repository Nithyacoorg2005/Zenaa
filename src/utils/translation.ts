// Simulated translation service - in production, this would use Google Translate API
const translations: { [key: string]: { [key: string]: string } } = {
  en: {
    'hello': 'hello',
    'help': 'help',
    'form': 'form',
    'job': 'job',
    'problem': 'problem'
  },
  hi: {
    'hello': 'नमस्ते',
    'help': 'मदद',
    'form': 'फॉर्म',
    'job': 'नौकरी',
    'problem': 'समस्या'
  },
  ta: {
    'hello': 'வணக்கம்',
    'help': 'உதவி',
    'form': 'படிவம்',
    'job': 'வேலை',
    'problem': 'समस्या'
  },
  kn: {
    'hello': 'ನಮಸ್ಕಾರ',
    'help': 'ಸಹಾಯ',
    'form': 'ಫಾರ್ಮ್',
    'job': 'ಕೆಲಸ',
    'problem': 'ಸಮಸ್ಯೆ'
  },
  bn: {
    'hello': 'নমস্কার',
    'help': 'সাহায্য',
    'form': 'ফর্ম',
    'job': 'কাজ',
    'problem': 'সমস্যা'
  }
};

export function getSupportedLanguages() {
  return [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
    { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
    { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
    { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
    { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
    { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം' },
    { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' },
    { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
    { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' }
  ];
}

export async function translateText(text: string, targetLanguage: string): Promise<string> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Simple word-based translation for demo
  const words = text.toLowerCase().split(' ');
  const translatedWords = words.map(word => {
    const cleanWord = word.replace(/[.,!?]/g, '');
    return translations[targetLanguage]?.[cleanWord] || word;
  });
  
  return translatedWords.join(' ');
}

export function detectLanguage(text: string): string {
  // Simple language detection based on character sets
  if (/[\u0900-\u097F]/.test(text)) return 'hi'; // Hindi
  if (/[\u0B80-\u0BFF]/.test(text)) return 'ta'; // Tamil
  if (/[\u0C80-\u0CFF]/.test(text)) return 'kn'; // Kannada
  if (/[\u0980-\u09FF]/.test(text)) return 'bn'; // Bengali
  if (/[\u0C00-\u0C7F]/.test(text)) return 'te'; // Telugu
  if (/[\u0D00-\u0D7F]/.test(text)) return 'ml'; // Malayalam
  
  return 'en'; // Default to English
}

export function formatMixedLanguageText(text: string): string {
  // Handle mixed language input like "Mujhe job chahiye Bengaluru mein"
  // This would be more sophisticated in production
  return text;
}