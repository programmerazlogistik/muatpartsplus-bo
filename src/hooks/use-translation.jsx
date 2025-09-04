"use client";

import { createContext, useContext, useMemo } from "react";

const TranslationContext = createContext({});

export const useTranslation = () => {
  return useContext(TranslationContext);
};

export const TranslationProvider = ({ children }) => {
  const value = useMemo(() => ({}), []);

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
};
