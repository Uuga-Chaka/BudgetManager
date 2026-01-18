import {themeColors} from './colors';
import {type ThemeType} from './theme.types';

export const theme = {
  dark: {
    colors: {
      background: themeColors.black,
      backgroundReverse: themeColors.white,
    },
  },
  light: {
    colors: {
      background: themeColors.white,
      backgroundReverse: themeColors.black,
    },
  },
} as const satisfies ThemeType;

type ThemeModes = keyof typeof theme;
export type ThemeProps = (typeof theme)[ThemeModes];
