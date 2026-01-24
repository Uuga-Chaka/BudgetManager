import {
  Pressable as RNButton,
  type TextStyle,
  type PressableProps,
  type ViewStyle,
  View,
} from 'react-native';

import Animated, {
  interpolateColor,
  useAnimatedStyle,
  withTiming,
  useSharedValue,
} from 'react-native-reanimated';

import {type LucidaIconType} from '@app/assets/Icons';
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
    paddingHorizontal: spacing.s,
    paddingVertical: spacing.s,
    backgroundColor: colors.transparent,
    borderColor: colors.transparent,
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
        borderColor: colors.primary,
      },
      text: {
        ...baseText,
      },
    },
    outline: {
      container: {
        ...baseView,
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
  children?: string;
  IconLeft?: LucidaIconType;
  IconRight?: LucidaIconType;
};

export default function Button({
  children,
  textStyle,
  variant = ButtonVariant.filled,
  status = 'primary',
  IconLeft,
  IconRight,
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

  const renderIcon = (IconComponent?: LucidaIconType) => {
    if (!IconComponent) return null;

    const _style: ViewStyle = {
      justifyContent: 'center',
    };

    switch (variant) {
      case ButtonVariant.ghost:
        return (
          <View style={_style}>
            <IconComponent color={baseColor} strokeWidth={2.5} />
          </View>
        );
      default:
        return (
          <View style={_style}>
            <IconComponent color={theme.colors.background} strokeWidth={2.5} />
          </View>
        );
    }
  };

  return (
    <RNButton
      role="button"
      {...props}
      onPressIn={() => (pressed.value = withTiming(1, {duration: 50}))}
      onPressOut={() => (pressed.value = withTiming(0, {duration: 250}))}>
      <Animated.View style={[correctAppearance.container, animatedContainerStyle]}>
        {renderIcon(IconLeft)}
        {children && (
          <Text variant="s1" style={[correctAppearance.text, textStyle]}>
            {children}
          </Text>
        )}
        {renderIcon(IconRight)}
      </Animated.View>
    </RNButton>
  );
}
