import React, { createContext, useState, useContext, ReactNode } from 'react';
import { enTranslations } from '../locales/en';
import { heTranslations } from '../locales/he';

type Language = 'en' | 'he';
type Translations = typeof enTranslations;

interface LanguageContextType {
  language: Language;
  translations: Translations;
  setLanguage: (lang: Language) => void;
  direction: 'ltr' | 'rtl';
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    // Try to get language from localStorage or use browser language
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && ['en', 'he'].includes(savedLanguage)) {
      return savedLanguage;
    }
    
    // Check browser language
    const browserLang = navigator.language.split('-')[0];
    return browserLang === 'he' ? 'he' : 'en';
  });

  const translations = language === 'en' ? enTranslations : heTranslations;
  const direction = translations.direction as 'ltr' | 'rtl';

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
    // Update document direction
    document.documentElement.dir = lang === 'en' ? 'ltr' : 'rtl';
    document.documentElement.lang = lang;
  };

  // Set initial document direction
  React.useEffect(() => {
    document.documentElement.dir = direction;
    document.documentElement.lang = language;
  }, [direction, language]);

  return (
    <LanguageContext.Provider value={{ language, translations, setLanguage: handleSetLanguage, direction }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};