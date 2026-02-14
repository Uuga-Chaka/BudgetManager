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
      zIndex: 2,
    },
    errorMessage: {
      color: colors.danger,
      marginHorizontal: spacing.s,
      marginTop: 5,
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
      fontSize: 14,
      paddingHorizontal: spacing.m,
      zIndex: 99999,
    },
  });
  return styles;
};

export type InputCoreProps = {
  containerStyle?: StyleProp<ViewStyle>;
  errorMessage?: string;
  inputRef?: Ref<TextInput>;
  inputStyle?: StyleProp<ViewStyle>;
  label: string;
  textInputStyle?: StyleProp<ViewStyle>;
} & TextInputProps;

export default function Input({
  label,
  style,
  containerStyle,
  onLayout,
  errorMessage,
  textInputStyle,
  inputRef,
  ...props
}: InputCoreProps) {
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
        style={[styles.textInput, textInputStyle]}
        onFocus={_onFocus}
        onBlur={_onBlur}
        placeholderTextColor={theme.colors.textHint}
      />
      {errorMessage && (
        <Text variant="s2" style={styles.errorMessage}>
          {errorMessage}
        </Text>
      )}
    </View>
  );
}
