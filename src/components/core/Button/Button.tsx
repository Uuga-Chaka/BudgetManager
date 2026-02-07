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

const getButtonVariants = (theme: ThemeProps, disabled?: boolean) => {
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
    color: disabled ? colors.white : colors.primary,
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
        color: disabled ? colors.basic_200 : colors.primary,
      },
    },
    ghost: {
      container: {...baseView},
      text: {...baseText, color: disabled ? colors.basic_200 : colors.primary},
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
  const {disabled} = props;

  const selectedAppearance = getButtonVariants(theme, disabled ?? false);
  const correctAppearance = selectedAppearance[variant] || selectedAppearance.filled;

  const pressed = useSharedValue(0);

  const baseColor = disabled ? colors.basic_200 : colors[status] || colors.primary;
  const pressedColor = disabled ? colors.basic_200 : colors[`${status}_700`] || colors.primary_700;

  const ghostBaseColor = colors.transparent;
  const ghostPressedColor = disabled ? colors.basic_200 : colors.basicTrans_100;

  const animatedContainerStyle = useAnimatedStyle(() => {
    const pressedPrimary = interpolateColor(pressed.value, [0, 1], [baseColor, pressedColor]);

    const pressedGhost = interpolateColor(
      pressed.value,
      [0, 1],
      [ghostBaseColor, ghostPressedColor],
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
