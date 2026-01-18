import {type ColorValue} from 'react-native';

export const ThemeVariant = {
  light: 'light',
  dark: 'dark',
} as const;

export type ThemeMode = keyof typeof ThemeVariant;

export type Theme = Record<ThemeMode, ThemeProps>;

export type ThemeProps = {
  colors: Record<string, ColorValue>;
};
