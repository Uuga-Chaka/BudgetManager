import {
  Pressable as RNButton,
  type TextStyle,
  type PressableProps,
  type ViewStyle,
} from 'react-native';

import Animated, {
  interpolateColor,
  useAnimatedStyle,
  withTiming,
  useSharedValue,
} from 'react-native-reanimated';

import {type ThemeSemantics, type ThemeProps} from '@app/theme/theme';
import {useAppTheme} from '@app/theme/useAppTheme';

import Text from '../Text/Text';

const ButtonVariant = {
  filled: 'filled',
  outline: 'outline',
  ghost: 'ghost',
} as const;

type ButtonVariantType = keyof typeof ButtonVariant;

const getButtonVariants = (theme: ThemeProps) => {
  const {colors, spacing, radius} = theme;
  const baseView: ViewStyle = {
    borderRadius: radius.s,
    paddingHorizontal: spacing.m,
    paddingVertical: spacing.s,
    borderWidth: 1,
  };

  const baseText: TextStyle = {
    color: colors.black,
    textAlign: 'center',
  };

  return {
    filled: {
      container: {
        ...baseView,
        backgroundColor: colors.primary,
      },
      text: {
        ...baseText,
      },
    },
    outline: {
      container: {
        ...baseView,
        backgroundColor: colors.transparent,
        borderWidth: 1,
        borderColor: colors.primary,
      },
      text: {
        ...baseText,
        color: colors.primary,
      },
    },
    ghost: {
      container: {...baseView},
      text: {...baseText, color: colors.primary},
    },
  } as const satisfies Record<ButtonVariantType, Record<string, ViewStyle | TextStyle>>;
};

type ButtonProps = PressableProps & {
  textStyle?: TextStyle;
  status?: ThemeSemantics;
  variant?: ButtonVariantType;
  children: string;
};

export default function Button({
  children,
  textStyle,
  variant = ButtonVariant.filled,
  status = 'primary',
  ...props
}: ButtonProps) {
  const {theme, colors} = useAppTheme();

  const selectedAppearance = getButtonVariants(theme);
  const correctAppearance = selectedAppearance[variant] || selectedAppearance.filled;

  const pressed = useSharedValue(0);

  const baseColor = colors[status] || colors.primary;
  const pressedColor = colors[`${status}_700`] || colors.primary_700;

  const animatedContainerStyle = useAnimatedStyle(() => {
    const pressedPrimary = interpolateColor(pressed.value, [0, 1], [baseColor, pressedColor]);

    const pressedGhost = interpolateColor(
      pressed.value,
      [0, 1],
      [colors.transparent, colors.basicTrans_100],
    );
    switch (variant) {
      case ButtonVariant.filled:
        return {
          backgroundColor: pressedPrimary,
          borderColor: pressedPrimary,
        };
      case ButtonVariant.outline:
        return {
          backgroundColor: pressedGhost,
          borderColor: pressedPrimary,
        };
      case ButtonVariant.ghost:
        return {
          backgroundColor: pressedGhost,
          borderColor: pressedGhost,
        };
      default:
        return {
          backgroundColor: pressedPrimary,
          borderColor: pressedPrimary,
        };
    }
  }, [variant]);

  return (
    <>
      <RNButton
        {...props}
        onPressIn={() => (pressed.value = withTiming(1, {duration: 50}))}
        onPressOut={() => (pressed.value = withTiming(0, {duration: 250}))}>
        <Animated.View style={[correctAppearance.container, animatedContainerStyle]}>
          <Text variant="s1" style={[correctAppearance.text, textStyle]}>
            {children}
          </Text>
        </Animated.View>
      </RNButton>
    </>
  );
}
