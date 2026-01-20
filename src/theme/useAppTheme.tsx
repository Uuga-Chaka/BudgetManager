import {createContext, use, useMemo, type PropsWithChildren} from 'react';
import {useColorScheme} from 'react-native';

import {theme, type ThemeProps, type ThemeModes} from './theme';
import {ThemeVariant} from './theme.types';

type ThemeContextTypes = {
  mode: ThemeModes;
  statusBarMode: ThemeModes;
  theme: ThemeProps;
  colors: ThemeProps['colors'];
  sizes: ThemeProps['sizes'];
};

const ThemeContext = createContext<ThemeContextTypes | undefined>(undefined);

export const AppThemeProvider = ({children}: PropsWithChildren) => {
  const systemScheme = useColorScheme();

  const contextValue = useMemo(() => {
    const mode: ThemeModes =
      systemScheme === ThemeVariant.light ? ThemeVariant.light : ThemeVariant.dark;

    const statusBarMode = mode === ThemeVariant.light ? ThemeVariant.dark : ThemeVariant.light;

    return {
      mode,
      statusBarMode,
      theme: theme[mode],
      colors: theme[mode].colors,
      sizes: theme[mode].sizes,
    };
  }, [systemScheme]);

  return <ThemeContext value={contextValue}>{children}</ThemeContext>;
};

export function useAppTheme() {
  const context = use(ThemeContext);
  if (!context)
    throw new Error('[useAppTheme.tsx] - useAppTheme must be used within an AppThemeProvider');
  return context;
}
