import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'studentVoiceThemeMode';

const palette = {
  light: {
    mode: 'light',
    background: '#f5f6fa',
    surface: '#ffffff',
    surfaceAlt: '#f1f2f6',
    text: '#2f3542',
    mutedText: '#747d8c',
    border: '#dcdde1',
    primary: '#487eb0',
    success: '#44bd32',
    danger: '#e84118',
    badge: '#dfe4ea',
    cardBorder: '#f1f2f6',
    statusBar: 'dark-content',
  },
  dark: {
    mode: 'dark',
    background: '#111827',
    surface: '#1f2937',
    surfaceAlt: '#374151',
    text: '#f9fafb',
    mutedText: '#cbd5e1',
    border: '#4b5563',
    primary: '#60a5fa',
    success: '#22c55e',
    danger: '#fb7185',
    badge: '#374151',
    cardBorder: '#334155',
    statusBar: 'light-content',
  },
};

const ThemeContext = createContext({
  isDarkMode: false,
  theme: palette.light,
  toggleDarkMode: () => {},
  setDarkMode: () => {},
});

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedMode = await AsyncStorage.getItem(STORAGE_KEY);
        if (savedMode === 'dark') {
          setIsDarkMode(true);
        }
      } catch (error) {
        console.warn('Unable to load theme preference.');
      }
    };

    loadTheme();
  }, []);

  const setDarkMode = async (enabled) => {
    setIsDarkMode(enabled);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, enabled ? 'dark' : 'light');
    } catch (error) {
      console.warn('Unable to save theme preference.');
    }
  };

  const value = useMemo(
    () => ({
      isDarkMode,
      theme: isDarkMode ? palette.dark : palette.light,
      toggleDarkMode: () => setDarkMode(!isDarkMode),
      setDarkMode,
    }),
    [isDarkMode]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);
