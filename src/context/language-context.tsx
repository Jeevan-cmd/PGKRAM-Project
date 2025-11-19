"use client";

import React, { createContext, useState, useContext, ReactNode } from 'react';
import translations from '@/lib/translations';

type Language = 'en' | 'hi' | 'pa';

type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string, values?: Record<string, string | number>) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string, values?: Record<string, string | number>) => {
    let translation = translations[language][key] || translations['en'][key] || key;
    if (values) {
      Object.keys(values).forEach((valueKey) => {
        translation = translation.replace(`{{${valueKey}}}`, String(values[valueKey]));
      });
    }
    return translation;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
