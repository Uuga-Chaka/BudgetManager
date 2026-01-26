import {Text as RNText, type TextProps} from 'react-native';

import {useAppTheme} from '@app/theme/useAppTheme';

import {fontVariant} from './Text.const';

type FontVariantType = keyof typeof fontVariant & string;

type RNTextProps = TextProps & {variant?: FontVariantType};

export default function Text({children, variant = 'p1', style, ...props}: RNTextProps) {
  const {colors} = useAppTheme();
  const selectedVariant = fontVariant[variant] || fontVariant.p1;
  return (
    <RNText {...props} style={[selectedVariant, {color: colors.backgroundReverse}, style]}>
      {children}
    </RNText>
  );
}
