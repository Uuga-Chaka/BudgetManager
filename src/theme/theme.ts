import {themeColors} from './colors';
import {
  type ThemeSemanticsCore as TeamSemanticsCore,
  ThemeVariant,
  type ThemeCore,
} from './theme.types';

const semanticColors = {
  // PRIMARY
  primary_100: themeColors.primary_100,
  primary: themeColors.primary_500,
  primary_700: themeColors.primary_700,
  primary_900: themeColors.primary_900,

  // SUCCESS
  success_100: themeColors.success_100,
  success: themeColors.success_500,
  success_700: themeColors.success_700,
  success_900: themeColors.success_900,

  // INFO
  info_100: themeColors.info_100,
  info: themeColors.info_500,
  info_700: themeColors.info_700,
  info_900: themeColors.info_900,

  // WARNING
  warning_100: themeColors.warning_100,
  warning: themeColors.warning_500,
  warning_700: themeColors.warning_700,
  warning_900: themeColors.warning_900,

  // DANGER
  danger_100: themeColors.danger_100,
  danger: themeColors.danger_500,
  danger_700: themeColors.danger_700,
  danger_900: themeColors.danger_900,
};

export const theme = {
  [ThemeVariant.dark]: {
    colors: {
      background: themeColors.black,
      backgroundReverse: themeColors.white,

      // SEMANTIC COLORS
      ...semanticColors,
    },
  },
  [ThemeVariant.light]: {
    colors: {
      background: themeColors.white,
      backgroundReverse: themeColors.black,

      // SEMANTIC COLORS
      ...semanticColors,
    },
  },
} as const satisfies ThemeCore;

type ThemeModes = keyof typeof theme;
export type ThemeProps = (typeof theme)[ThemeModes];
export type ThemeSemantics = TeamSemanticsCore;
