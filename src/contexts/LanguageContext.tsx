import React, { createContext, useContext, useState } from 'react';
import { translateText, getSupportedLanguages } from '../utils/translation';

interface LanguageContextType {
  currentLanguage: string;
  supportedLanguages: { code: string; name: string; nativeName: string }[];
  setLanguage: (language: string) => void;
  translate: (text: string, targetLanguage?: string) => Promise<string>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const supportedLanguages = getSupportedLanguages();

  const setLanguage = (language: string) => {
    setCurrentLanguage(language);
    localStorage.setItem('easyaid-language', language);
  };

  const translate = async (text: string, targetLanguage?: string): Promise<string> => {
    const target = targetLanguage || currentLanguage;
    if (target === 'en') return text;
    
    return await translateText(text, target);
  };

  React.useEffect(() => {
    const savedLanguage = localStorage.getItem('easyaid-language');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  return (
    <LanguageContext.Provider value={{
      currentLanguage,
      supportedLanguages,
      setLanguage,
      translate
    }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}