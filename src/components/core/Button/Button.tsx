import {Pressable as RNButton, StyleSheet, type TextStyle, type PressableProps} from 'react-native';

import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import {type ThemeSemantics, type ThemeProps} from '@app/theme/theme';
import {useAppTheme} from '@app/theme/useAppTheme';

import Text from '../Text/Text';

const styleProps = (colors: ThemeProps['colors']) => {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.primary,
      borderRadius: 8,
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
    defaultTextStyle: {
      color: colors.backgroundReverse,
      paddingHorizontal: 'auto',
      textAlign: 'center',
    },
  });

  return styles;
};

type ButtonProps = PressableProps & {
  textStyle?: TextStyle;
  variant?: ThemeSemantics;
  children: string;
};

export default function Button({children, textStyle, variant = 'primary', ...props}: ButtonProps) {
  const {colors} = useAppTheme();
  const styles = styleProps(colors);

  const pressed = useSharedValue(0);

  const baseColor = colors[variant as keyof typeof colors] || colors.primary;
  const pressedColor = colors[`${variant}_700` as keyof typeof colors] || colors.primary_700;

  const animatedContainerStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(pressed.value, [0, 1], [baseColor, pressedColor]),
  }));

  return (
    <>
      <RNButton
        {...props}
        onPressIn={() => (pressed.value = withTiming(1, {duration: 50}))}
        onPressOut={() => (pressed.value = withTiming(0, {duration: 250}))}>
        <Animated.View style={[styles.container, animatedContainerStyle]}>
          <Text variant="s1" style={[styles.defaultTextStyle, textStyle]}>
            {children}
          </Text>
        </Animated.View>
      </RNButton>
    </>
  );
}
