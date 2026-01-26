import {createContext, use, useMemo, useState, type PropsWithChildren} from 'react';
import {useColorScheme} from 'react-native';

import {theme, type ThemeProps, type ThemeModes} from './theme';
import {ThemeVariant} from './theme.types';

export type ThemeContextTypes = {
  mode: ThemeModes;
  statusBarMode: ThemeModes;
  theme: ThemeProps;
  colors: ThemeProps['colors'];
  sizes: ThemeProps['sizes'];
  toggleSelectedTheme: () => void;
};

const ThemeContext = createContext<ThemeContextTypes | undefined>(undefined);

export const AppThemeProvider = ({children}: PropsWithChildren) => {
  const systemScheme = useColorScheme();
  const [selectedTheme, setSelectedTheme] = useState(true);

  const toggleSelectedTheme = () => setSelectedTheme(prev => !prev);

  const isThemeLight = systemScheme === ThemeVariant.light;

  const contextValue = useMemo(() => {
    const mode: ThemeModes = isThemeLight && selectedTheme ? ThemeVariant.light : ThemeVariant.dark;

    const statusBarMode = !isThemeLight ? ThemeVariant.light : ThemeVariant.dark;

    return {
      mode,
      statusBarMode,
      theme: theme[mode],
      colors: theme[mode].colors,
      sizes: theme[mode].sizes,
      toggleSelectedTheme,
    };
  }, [isThemeLight, selectedTheme]);

  return <ThemeContext value={contextValue}>{children}</ThemeContext>;
};

export function useAppTheme() {
  const context = use(ThemeContext);
  if (!context)
    throw new Error('[useAppTheme.tsx] - useAppTheme must be used within an AppThemeProvider');
  return context;
}
