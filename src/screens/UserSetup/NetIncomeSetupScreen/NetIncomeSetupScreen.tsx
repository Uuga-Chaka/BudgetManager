import React, {useEffect, useRef, useState} from 'react';
import {View, TextInput, StyleSheet} from 'react-native';

import {KeyboardAvoidingView} from 'react-native-keyboard-controller';

import {DollarSignIcon} from '@app/assets/Icons';
import Button from '@app/components/core/Button/Button';
import Text from '@app/components/core/Text/Text';
import {type RootOnboardingScreenProps, Routes} from '@app/navigation/navigation.types';
import {useSetupStore} from '@app/store';
import {type ThemeProps} from '@app/theme/theme';
import {useAppTheme} from '@app/theme/useAppTheme';
import {currencyStringToNumber, formatCurrency} from '@app/utils/currency';

const styleProps = (theme: ThemeProps) => {
  const styles = StyleSheet.create({
    bottomContainer: {
      flex: 1,
      justifyContent: 'space-between',
    },

    content: {
      flex: 1,
      marginVertical: 24,
    },
    descriptionContainer: {
      flex: 1,
      gap: theme.spacing.l,
      justifyContent: 'center',
    },
    inner: {
      flex: 1,
      gap: 24,
      justifyContent: 'space-between',
    },
    input: {
      flexGrow: 1,
      fontFamily: theme.fontFamily.primary,
      fontSize: theme.fontSizes.size16,
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

export default function NetIncomeSetupScreen({
  navigation,
}: RootOnboardingScreenProps<typeof Routes.NetIncomeSetup>) {
  const {theme} = useAppTheme();
  const {setIncomeAmount, setCountryCode, setIncomeName} = useSetupStore();

  const [netIncome, setNetIncome] = useState('');
  const styles = styleProps(theme);
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (inputRef !== null) inputRef.current?.focus();
  }, [inputRef]);

  const handleNext = () => {
    const netIncomeNumber = currencyStringToNumber(netIncome);
    setIncomeAmount(netIncomeNumber);
    setCountryCode('COP');
    setIncomeName('Net Income');
    navigation.navigate(Routes.CommonExpenses);
  };

  const handleInputChange = (value: string) => {
    const {formatted} = formatCurrency({value});
    setNetIncome(formatted);
  };

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
        <View style={styles.bottomContainer}>
          <View style={styles.inputContainer}>
            <DollarSignIcon color={'white'} />
            <TextInput
              value={netIncome}
              onChangeText={handleInputChange}
              ref={inputRef}
              style={styles.input}
              keyboardType="numeric"
            />
          </View>
          <Button onPress={handleNext}>Continuar</Button>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
