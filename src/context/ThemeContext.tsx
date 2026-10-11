import React, { createContext, useContext, useState } from 'react';

type ThemeContextType = {
  isDark: boolean;
  toggleDark: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  isDark: false,
  toggleDark: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false);
  const toggleDark = () => setIsDark((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ isDark, toggleDark }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

// ─── Reusable color palette ───────────────────────────────────────────────────
export function getColors(isDark: boolean) {
  return {
    bg: isDark ? '#0f0f1a' : '#F0F2F5',
    card: isDark ? '#1e1e2e' : '#ffffff',
    text: isDark ? '#f0f0f0' : '#1a1a1a',
    subText: isDark ? '#888' : '#888',
    divider: isDark ? '#2a2a3a' : '#F0F2F5',
    sectionLabel: isDark ? '#aaa' : '#888',
    border: isDark ? '#2a2a3a' : '#E0E0E0',
    inputBg: isDark ? '#2a2a3a' : '#FAFAFA',
  };
}
