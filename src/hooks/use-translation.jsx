"use client";

import { createContext, useContext, useMemo } from "react";

const TranslationContext = createContext({});

export const useTranslation = () => {
  return useContext(TranslationContext);
};

export const TranslationProvider = ({ children }) => {
  // Provide a simple t function that just returns the fallback or key
  const value = useMemo(() => ({
    t: (key, _options = {}, fallback = key) => fallback || key,
  }), []);

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
};
