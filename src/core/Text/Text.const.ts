import {type TextStyle} from 'react-native';

const typographyTokens = {
  bold: '700',
  medium: '500',
  regular: '400',
} as const;

const bold: TextStyle = {fontWeight: typographyTokens.bold};
export const fontVariant = {
  h1: {fontSize: 36, ...bold},
  h2: {fontSize: 32, ...bold},
  h3: {fontSize: 30, ...bold},
  h4: {fontSize: 26, ...bold},
  h5: {fontSize: 22, ...bold},
  h6: {fontSize: 18, ...bold},

  s1: {fontSize: 15, ...bold},
  s2: {fontSize: 12, ...bold},

  p1: {fontSize: 15},
  p2: {fontSize: 13},

  c1: {fontSize: 12},
  c2: {fontSize: 12, ...bold},

  label: {fontSize: 12, ...bold, textTransform: 'uppercase'},
} as const satisfies Record<string, TextStyle>;
