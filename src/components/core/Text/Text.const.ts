import {type TextStyle} from 'react-native';

export const typographyTokens = {
  black: '900',
  bold: '700',
  medium: '500',
  regular: '400',
} as const;

const bold: TextStyle = {
  fontFamily: 'MontaguSlab-Regular',
};

const regular: TextStyle = {
  fontFamily: 'Lato-Regular',
};
export const fontVariant = {
  h1: {fontSize: 36, ...bold},
  h2: {fontSize: 32, ...bold},
  h3: {fontSize: 30, ...bold},
  h4: {fontSize: 26, ...bold},
  h5: {fontSize: 22, ...bold},
  h6: {fontSize: 18, ...bold},

  s1: {fontSize: 15, fontWeight: 800},
  s2: {fontSize: 12, fontWeight: 800},

  p1: {fontSize: 16, ...regular},
  p2: {fontSize: 14, ...regular},

  c1: {fontSize: 12, ...regular},
  c2: {fontSize: 12, ...bold},

  label: {fontSize: 12, ...bold, textTransform: 'uppercase'},
} as const satisfies Record<string, TextStyle>;
