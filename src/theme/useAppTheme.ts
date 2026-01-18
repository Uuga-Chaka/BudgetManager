import {useColorScheme} from 'react-native';

import {theme} from './theme';
import {ThemeMode, type ThemeModeType} from './theme.types';

export function useAppTheme() {
  const colorScheme = useColorScheme();

  const mode: ThemeModeType = colorScheme === ThemeMode.light ? ThemeMode.light : ThemeMode.dark;

  return {
    colorScheme,
    theme: colorScheme,
    statusBarStyle: mode,
    colors: theme[mode].colors,
  };
}
