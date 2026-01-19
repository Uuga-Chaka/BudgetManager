import {type ColorValue} from 'react-native';

// NEVER USE THIS TYPES OUTSIDE THE THEME FOLDER

export const ThemeVariant = {
  light: 'light',
  dark: 'dark',
} as const;

export type ThemeSemanticsCore = 'success' | 'info' | 'warning' | 'danger' | 'primary';
export type ThemeSemanticWeightCore = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
export type ColorPaletteKeys = `${ThemeSemanticsCore}_${ThemeSemanticWeightCore}`;
export type ThemeMode = keyof typeof ThemeVariant;

export type ThemeCore = Record<ThemeMode, ThemePropsCore>;

export type ThemePropsCore = {
  colors: Record<string, ColorValue>;
};
