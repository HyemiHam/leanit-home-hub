/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, ReactNode } from "react";

type Language = "KO" | "EN";

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (ko: string, en: string) => string;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("KO");

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "KO" ? "EN" : "KO"));
  };

  const t = (ko: string, en: string) => (language === "KO" ? ko : en);

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
