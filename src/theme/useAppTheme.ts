import {useColorScheme} from 'react-native';

import {theme} from './theme';
import {ThemeVariant, type ThemeMode} from './theme.types';

export function useAppTheme() {
  const colorScheme = useColorScheme();

  const mode: ThemeMode =
    colorScheme === ThemeVariant.light ? ThemeVariant.light : ThemeVariant.dark;

  return {
    colorScheme,
    theme: colorScheme,
    statusBarStyle: mode,
    colors: theme[mode].colors,
  };
}
