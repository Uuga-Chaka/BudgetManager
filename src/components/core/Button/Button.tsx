import {
  Pressable as RNButton,
  type TextStyle,
  type PressableProps,
  View,
  StyleSheet,
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

const styleProps = (theme: ThemeProps) => {
  const style = StyleSheet.create({
    container: {
      alignItems: 'center',
      borderRadius: theme.radius.s,
      borderWidth: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      paddingHorizontal: theme.spacing.s,
      paddingVertical: theme.spacing.s,
    },
    iconContainer: {
      justifyContent: 'center',
    },
  });
  return style;
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
  disabled,
  ...props
}: ButtonProps) {
  const {theme, colors} = useAppTheme();

  const style = styleProps(theme);

  const pressed = useSharedValue(0);

  const baseColor = disabled ? colors.basicTrans_300 : colors[status] || colors.primary;
  const pressedColor = disabled
    ? colors.basicTrans_300
    : colors[`${status}_700`] || colors.primary_700;

  const transparent = colors.transparent;
  const ghostPressedColor = colors.basicTrans_100;

  const config = {
    filled: {
      bg: [baseColor, pressedColor],
      border: [baseColor, pressedColor],
      text: colors.white,
      icon: colors.background,
    },
    outline: {
      bg: [transparent, ghostPressedColor],
      border: [baseColor, pressedColor],
      text: baseColor,
      icon: baseColor,
    },
    ghost: {
      bg: [transparent, ghostPressedColor],
      border: [transparent, ghostPressedColor],
      text: baseColor,
      icon: baseColor,
    },
  }[variant];

  const animatedContainerStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(pressed.value, [0, 1], config.bg),
      borderColor: interpolateColor(pressed.value, [0, 1], config.border),
    };
  }, [variant, disabled]);

  return (
    <RNButton
      disabled={disabled}
      role="button"
      {...props}
      onPressIn={() => (pressed.value = withTiming(1, {duration: 50}))}
      onPressOut={() => (pressed.value = withTiming(0, {duration: 250}))}>
      <Animated.View style={[style.container, animatedContainerStyle]}>
        {IconLeft && (
          <View style={style.iconContainer}>
            <IconLeft color={config.icon} strokeWidth={2.5} />
          </View>
        )}
        {children && (
          <Text variant="s1" style={[{color: config.text}, textStyle]}>
            {children}
          </Text>
        )}
        {IconRight && (
          <View style={style.iconContainer}>
            <IconRight color={config.icon} strokeWidth={2.5} />
          </View>
        )}
      </Animated.View>
    </RNButton>
  );
}
