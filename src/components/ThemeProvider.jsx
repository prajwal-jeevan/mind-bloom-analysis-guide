
import React, { createContext, useContext, useEffect, useState } from "react";

// Create the context with a default value
const ThemeContext = createContext({
  theme: "light",
  setTheme: () => {},
});

// Export the ThemeProvider component
export function ThemeProvider({
  children,
  defaultTheme = "light",
  storageKey = "theme",
}) {
  // Initialize theme state with defaultTheme
  const [theme, setTheme] = useState(defaultTheme);
  
  // On mount only, check localStorage and update theme
  useEffect(() => {
    const storedTheme = localStorage.getItem(storageKey);
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, [storageKey]);
  
  // When theme changes, update document and localStorage
  useEffect(() => {
    const root = window.document.documentElement;
    
    // Remove old theme classes
    root.classList.remove("light", "dark");
    
    // Add new theme class
    root.classList.add(theme);
    
    // Store in localStorage
    localStorage.setItem(storageKey, theme);
  }, [theme, storageKey]);
  
  // Memoize the context value to prevent unnecessary re-renders
  const value = React.useMemo(
    () => ({
      theme,
      setTheme,
    }),
    [theme]
  );
  
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// Export the useTheme hook
export function useTheme() {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  
  return context;
}
