import React from 'react';
import {StyleSheet, View, TouchableOpacity, type StyleProp, type ViewStyle} from 'react-native';

import {type ThemeProps} from '@app/theme/theme';
import {useAppTheme} from '@app/theme/useAppTheme';

import Text from '../Text/Text';

const styleProps = ({theme}: {theme: ThemeProps}) => {
  const {colors, sizes, spacing} = theme;
  const styles = StyleSheet.create({
    buttonStyle: {
      backgroundColor: colors.inputBackgroundColor,
      borderColor: colors.basicTrans_100,
      borderRadius: sizes.m,
      borderWidth: 1,
      justifyContent: 'center',
      paddingHorizontal: spacing.m,
    },
    buttonText: {
      color: colors.backgroundReverse,
      fontSize: 14,
      paddingVertical: 12,
    },
    container: {
      flexDirection: 'column',
    },
    errorMessage: {
      color: colors.danger,
      marginHorizontal: spacing.s,
      marginTop: 5,
    },
    label: {
      marginBottom: 4,
      marginLeft: 5,
    },
    placeholderText: {
      color: theme.colors.textHint,
      fontSize: 14,
      paddingVertical: 12,
    },
  });
  return styles;
};

export type TouchableInputProps = {
  label: string;
  value?: string;
  placeholder?: string;
  onPress?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  buttonStyle?: StyleProp<ViewStyle>;
  errorMessage?: string;
};

export default function TouchableInput({
  label,
  value,
  placeholder,
  onPress,
  containerStyle,
  buttonStyle,
  errorMessage,
}: TouchableInputProps) {
  const {theme} = useAppTheme();
  const styles = styleProps({theme});

  return (
    <View style={[styles.container, containerStyle]}>
      <Text variant="label" style={styles.label}>
        {label}
      </Text>

      <TouchableOpacity
        activeOpacity={0.7}
        style={[styles.buttonStyle, buttonStyle]}
        onPress={onPress}>
        <Text style={value ? styles.buttonText : styles.placeholderText}>
          {value || placeholder}
        </Text>
      </TouchableOpacity>

      {errorMessage && (
        <Text variant="s2" style={styles.errorMessage}>
          {errorMessage}
        </Text>
      )}
    </View>
  );
}
