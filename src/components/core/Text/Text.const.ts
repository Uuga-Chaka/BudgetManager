import {type StyleProp, type TextStyle} from 'react-native';

import {type ThemeProps} from '@app/theme/theme';

import {type FontVariantType} from './Text.types';

export const createTextConfiguration = (
  theme: ThemeProps,
): Record<FontVariantType, StyleProp<TextStyle>> => {
  const {colors, fontSizes, fontFamily} = theme;

  const base: TextStyle = {color: colors.text};
  const pBase: TextStyle = {color: colors.text, fontFamily: fontFamily.primary, opacity: 0.7};
  const hBase: TextStyle = {...base, fontFamily: fontFamily.secondary};

  return {
    h1: {
      ...hBase,
      fontSize: fontSizes.size36,
      fontFamily: fontFamily.secondary,
    },
    h2: {
      ...hBase,
      fontSize: fontSizes.size32,
      fontFamily: fontFamily.secondary,
    },
    h3: {
      ...hBase,
      fontSize: fontSizes.size30,
      fontFamily: fontFamily.secondary,
    },
    h4: {
      ...hBase,
      fontSize: fontSizes.size26,
      fontFamily: fontFamily.secondary,
    },
    h5: {
      ...hBase,
      fontSize: fontSizes.size22,
      fontFamily: fontFamily.secondary,
    },
    h6: {
      ...hBase,
      fontSize: fontSizes.size18,
      fontFamily: fontFamily.secondary,
    },

    s1: {
      ...hBase,
      fontSize: fontSizes.size15,
      fontWeight: 800,
      fontFamily: fontFamily.secondary,
    },
    s2: {
      ...base,
      fontSize: fontSizes.size12,
      fontWeight: 800,
      fontFamily: fontFamily.primary,
    },

    p1: {
      ...pBase,
      fontSize: fontSizes.size16,
      fontFamily: fontFamily.primary,
    },
    p2: {
      ...pBase,
      fontSize: fontSizes.size14,
      fontFamily: fontFamily.primary,
    },

    c1: {
      ...base,
      fontSize: fontSizes.size12,
      fontFamily: fontFamily.primary,
    },
    c2: {
      ...pBase,
      fontSize: fontSizes.size12,
      fontFamily: fontFamily.secondary,
    },

    label: {
      ...base,
      textTransform: 'uppercase',
      fontSize: fontSizes.size12,
      fontFamily: fontFamily.primary,
    },
  };
};
