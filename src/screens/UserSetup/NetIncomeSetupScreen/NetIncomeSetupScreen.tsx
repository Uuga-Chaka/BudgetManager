import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';

import {KeyboardAvoidingView} from 'react-native-keyboard-controller';

import {DollarSignIcon} from '@app/assets/Icons';
import Button from '@app/components/core/Button/Button';
import Text from '@app/components/core/Text/Text';
import {type ThemeProps} from '@app/theme/theme';
import {useAppTheme} from '@app/theme/useAppTheme';

const styleProps = (theme: ThemeProps) => {
  const styles = StyleSheet.create({
    content: {
      flex: 1,
      marginVertical: 24,
    },

    descriptionContainer: {
      gap: theme.spacing.l,
    },
    inner: {
      flex: 1,
      gap: 24,
      justifyContent: 'space-between',
    },
    input: {
      flexGrow: 1,
    },
    inputContainer: {
      alignItems: 'center',
      borderBottomWidth: 1,
      borderColor: theme.colors.white,
      flexDirection: 'row',
      textAlign: 'center',
      width: '100%',
    },
  });
  return styles;
};

export default function NetIncomeSetupScreen() {
  const {theme} = useAppTheme();

  const styles = styleProps(theme);
  return (
    <KeyboardAvoidingView
      behavior={'padding'}
      keyboardVerticalOffset={theme.spacing.l}
      style={styles.content}>
      <View style={styles.inner}>
        <View style={styles.descriptionContainer}>
          <Text variant="h1">¿Cual es tu ingreso mensual?</Text>
          <Text>
            Esta es la cantidad que recibes en tu cuenta bancaria despues de impuestos y
            deducciones.
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <DollarSignIcon color={'white'} />
          <TextInput style={styles.input} />
        </View>
        <Button>Continuar</Button>
      </View>
    </KeyboardAvoidingView>
  );
}
