import {type ColorValue} from 'react-native';

export const ThemeMode = {
  light: 'light',
  dark: 'dark',
} as const;

export type ThemeModeType = keyof typeof ThemeMode;

export type ThemeType = {
  [mode in keyof typeof ThemeMode]: ThemeProps;
};

export type ThemeProps = {
  colors: {
    [property: string]: ColorValue;
  };
};
