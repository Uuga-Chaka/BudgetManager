import * as eva from '@eva-design/eva';
import type {ThemeType} from '@ui-kitten/components';
import {useColorScheme} from 'react-native';

type ThemeMode = 'light' | 'dark';

export function useAppTheme() {
  const colorScheme = useColorScheme() ?? 'light';

  const theme = (colorScheme === 'light' ? eva.light : eva.dark) as ThemeType;

  const statusBarStyle: ThemeMode = colorScheme === 'light' ? 'dark' : 'light';

  return {
    colorScheme,
    theme,
    statusBarStyle,
  };
}
