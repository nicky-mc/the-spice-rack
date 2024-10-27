"use client";
import { createContext, useContext, useState } from "react";

export const SettingsContext = createContext({});

export const useSettingsContext = () => {
  const context = useContext(SettingsContext);

  if (!context) {
    throw new Error(
      "useSettingsContext must be used within a SettingsContextProvider"
    );
  }

  return context;
};

export const SettingsContextProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    theme: "dark",
    isSidebarOpen: false,
  });

  return (
    <SettingsContext.Provider value={{ settings, setSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};
