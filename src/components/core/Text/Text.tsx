import {useMemo} from 'react';
import {Text as RNText} from 'react-native';

import {useAppTheme} from '@app/theme/useAppTheme';

import {createTextConfiguration} from './Text.const';
import {type RNTextProps} from './Text.types';

export default function Text({children, variant = 'p1', style, ...props}: RNTextProps) {
  const {theme} = useAppTheme();

  const styles = useMemo(() => createTextConfiguration(theme), [theme]);

  const selectedVariant = styles[variant] || styles.p1;

  return (
    <RNText {...props} style={[selectedVariant, style]}>
      {children}
    </RNText>
  );
}
