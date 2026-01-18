import {themeColors} from './colors';
import {ThemeVariant, type Theme} from './theme.types';

export const theme = {
  [ThemeVariant.dark]: {
    colors: {
      background: themeColors.black,
      backgroundReverse: themeColors.white,
      primary: themeColors.primary_500,
    },
  },
  [ThemeVariant.light]: {
    colors: {
      background: themeColors.white,
      backgroundReverse: themeColors.black,
      primary: themeColors.primary_500,
    },
  },
} as const satisfies Theme;

type ThemeModes = keyof typeof theme;
export type ThemeProps = (typeof theme)[ThemeModes];
