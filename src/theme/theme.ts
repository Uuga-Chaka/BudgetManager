import {themeColors} from './colors';
import {radius, spacing} from './sizes';
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

const basic = {
  transparent: themeColors.transparent,

  basic_800: themeColors.basic_800,

  basicTrans_100: themeColors.basicTrans_100,
};

export const theme = {
  [ThemeVariant.dark]: {
    colors: {
      black: themeColors.black,
      white: themeColors.white,
      background: themeColors.black,
      backgroundReverse: themeColors.white,

      // SEMANTIC COLORS
      ...semanticColors,
      ...basic,
    },
    sizes: {
      ...radius,
    },
    spacing,
    radius,
  },
  [ThemeVariant.light]: {
    colors: {
      black: themeColors.black,
      white: themeColors.white,
      background: themeColors.white,
      backgroundReverse: themeColors.black,

      // SEMANTIC COLORS
      ...semanticColors,
      ...basic,
    },
    sizes: {
      ...radius,
    },
    spacing,
    radius,
  },
} as const satisfies ThemeCore;

export type ThemeModes = keyof typeof theme;
export type ThemeProps = (typeof theme)[ThemeModes];
export type ThemeSemantics = TeamSemanticsCore;
