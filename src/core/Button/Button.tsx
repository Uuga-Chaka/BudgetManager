import {
  TouchableOpacity as RNButton,
  StyleSheet,
  type TextStyle,
  type ViewStyle,
  type TouchableOpacityProps,
} from 'react-native';

import {type ThemeProps} from '@app/theme/theme';
import {useAppTheme} from '@app/theme/useAppTheme';

import Text from '../Text/Text';

const styleProps = (colors: ThemeProps['colors']) => {
  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      backgroundColor: colors.primary,
      borderRadius: 8,
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
    textStyles: {
      color: colors.backgroundReverse,
    },
  });

  return styles;
};

type ButtonProps = TouchableOpacityProps & {containerStyle?: ViewStyle; textStyle?: TextStyle};

export default function Button({children, textStyle, containerStyle, ...props}: ButtonProps) {
  const {colors} = useAppTheme();
  const styles = styleProps(colors);
  return (
    <RNButton {...props} style={[styles.container, containerStyle]}>
      <Text style={[styles.textStyles, textStyle]}>{children}</Text>
    </RNButton>
  );
}
