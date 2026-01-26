import {type Ref, useState} from 'react';
import {
  type FocusEvent,
  type StyleProp,
  StyleSheet,
  TextInput,
  type TextInputProps,
  View,
  type ViewStyle,
} from 'react-native';

import {type ThemeProps} from '@app/theme/theme';
import {useAppTheme} from '@app/theme/useAppTheme';

import Text from '../Text/Text';

const styleProps = ({isFocused, theme}: {theme: ThemeProps; isFocused: boolean}) => {
  const {colors, sizes, spacing} = theme;
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'column',
      zIndex: -1,
    },
    label: {
      marginBottom: 4, // TODO: Add value to theme
      marginLeft: 5, // TODO: Add value to theme
    },
    textInput: {
      backgroundColor: colors.inputBackgroundColor,
      borderColor: isFocused ? colors.primary : colors.basicTrans_100,
      borderRadius: sizes.m,
      borderWidth: 1,
      color: colors.backgroundReverse,
      paddingHorizontal: spacing.m,
    },
  });
  return styles;
};

type InputProps = {
  label: string;
  containerStyle?: StyleProp<ViewStyle>;
  inputRef?: Ref<TextInput>;
} & TextInputProps;

export default function Input({
  label,
  style,
  containerStyle,
  onLayout,
  inputRef,
  ...props
}: InputProps) {
  const {theme} = useAppTheme();

  const [isFocused, setIsFocused] = useState(false);
  const styles = styleProps({theme, isFocused});

  const _onFocus = (e: FocusEvent) => {
    setIsFocused(true);
    if (props.onFocus) props.onFocus(e);
  };

  const _onBlur = (e: FocusEvent) => {
    setIsFocused(false);
    if (props.onBlur) props.onBlur(e);
  };

  return (
    <View style={[styles.container, containerStyle]} onLayout={onLayout}>
      <Text variant="label" style={[styles.label, style]}>
        {label}
      </Text>
      <TextInput
        {...props}
        ref={inputRef}
        style={styles.textInput}
        onFocus={_onFocus}
        onBlur={_onBlur}
        placeholderTextColor={theme.colors.textHint}
      />
    </View>
  );
}
