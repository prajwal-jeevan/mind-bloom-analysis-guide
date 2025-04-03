
import { createContext, useContext, useEffect, useState } from "react";

const ThemeProviderContext = createContext({});

export function ThemeProvider({
  children,
  defaultTheme = "light",
  storageKey = "mindbloom-theme",
}) {
  const [theme, setTheme] = useState(() => {
    const storedTheme = typeof window !== "undefined" && localStorage.getItem(storageKey);
    return storedTheme || defaultTheme;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
  }, [theme]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(storageKey, theme);
    }
  }, [storageKey, theme]);

  const value = {
    theme,
    setTheme: (newTheme) => setTheme(newTheme),
  };

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
