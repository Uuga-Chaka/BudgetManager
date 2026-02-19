import React, {useCallback} from 'react';
import {StyleSheet, View} from 'react-native';

import {zodResolver} from '@hookform/resolvers/zod';
import {Controller, useForm} from 'react-hook-form';

import AppKeyBoardAwareScrollView from '@app/components/AppKeyBoardAwareScrollView/AppKeyBoardAwareScrollView';
import Autocomplete from '@app/components/core/Autocomplete/Autocomplete';
import Button from '@app/components/core/Button/Button';
import Text from '@app/components/core/Text/Text';
import {InputForm} from '@app/components/formComponents/InputForm';
import {MoneyInputForm} from '@app/components/formComponents/MoneyInputForm';
import {Routes, type RootOnboardingScreenProps} from '@app/navigation/navigation.types';
import {useSetupStore} from '@app/store';
import {useLocaleStore} from '@app/store/localeStore';
import {type ThemeProps} from '@app/theme/theme';
import {useAppTheme} from '@app/theme/useAppTheme';
import {type CountryInfo} from '@app/utils/isoCountryCurrency';

import {type IncomeFormDataOutout, incomeSchema, type IncomeFormData} from './IncomeSetup.schema';

const styleProps = (theme: ThemeProps) => {
  const styles = StyleSheet.create({
    container: {
      gap: theme.sizes.m,
    },
    customRenderItemContainer: {
      padding: theme.sizes.s,
    },
    description: {
      paddingVertical: theme.sizes.l,
    },
  });
  return styles;
};

const filterOptions = (data: CountryInfo[], value: string) => {
  return data.filter(e => {
    const listValue = `${e.countryName.toLowerCase()}-${e.currency.toLowerCase()}-${e.symbol.toLowerCase()}`;
    const searchValue = value.toLowerCase();
    return listValue.match(searchValue);
  });
};

const selectedItemLabel = ({countryName, currency, symbol}: CountryInfo) =>
  `${countryName} - ${currency} - (${symbol})`;

export default function IncomeSetup({
  navigation,
}: RootOnboardingScreenProps<typeof Routes.IncomeSetup>) {
  const {availableRegions} = useLocaleStore();
  const {setIncomeAmount, setCountryCode, setIncomeName} = useSetupStore();

  const {theme} = useAppTheme();
  const styles = styleProps(theme);

  const {
    control,
    watch,
    handleSubmit,
    formState: {isValid},
  } = useForm<IncomeFormData, unknown, IncomeFormDataOutout>({
    resolver: zodResolver(incomeSchema),
    mode: 'onChange',
    defaultValues: {
      incomeName: '',
      amount: '',
      currency: '',
    },
  });

  const handleNext = handleSubmit(data => {
    setIncomeAmount(data.amount);
    setCountryCode(data.currency);
    setIncomeName(data.incomeName);

    navigation.push(Routes.BudgetSetup);
  });

  const selectedCurrency = watch('currency');

  const customListItem = useCallback(
    ({countryName, currency, symbol}: CountryInfo) => (
      <View style={styles.customRenderItemContainer}>
        <Text>
          {countryName} - {currency} ({symbol})
        </Text>
      </View>
    ),
    [],
  );

  return (
    <AppKeyBoardAwareScrollView>
      <View style={styles.container}>
        <Text style={styles.description}>Actualizaremos esta información para el mes de enero</Text>
        <InputForm
          control={control}
          name="incomeName"
          label={'Nombre del ingreso'}
          placeholder="Salario"
        />
        <Controller
          name="currency"
          control={control}
          render={({field: {onChange}}) => (
            <Autocomplete
              label="moneda"
              placeholder="United States - USD ($)"
              data={availableRegions}
              onSelectItem={data => {
                onChange(data.currency);
              }}
              customRenderItem={customListItem}
              filterOptions={filterOptions}
              getSelectedItemLabel={selectedItemLabel}
              ListEmptyComponent={<Text>No hay nada</Text>}
            />
          )}
        />
        <MoneyInputForm
          control={control}
          name="amount"
          placeholder="1'.000.000"
          label="cantidad"
          countryCode={selectedCurrency}
          keyboardType="number-pad"
        />
        <Button variant="outline" onPress={handleNext} disabled={!isValid}>
          Siguiente
        </Button>
      </View>
    </AppKeyBoardAwareScrollView>
  );
}
