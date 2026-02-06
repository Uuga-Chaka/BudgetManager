import React, {useCallback, useState} from 'react';
import {StyleSheet, View} from 'react-native';

import {zodResolver} from '@hookform/resolvers/zod';
import {Controller, useForm} from 'react-hook-form';

import AppKeyBoardAwareScrollView from '@app/components/AppKeyBoardAwareScrollView/AppKeyBoardAwareScrollView';
import Autocomplete from '@app/components/core/Autocomplete/Autocomplete';
import Button from '@app/components/core/Button/Button';
import Text from '@app/components/core/Text/Text';
import {InputForm} from '@app/components/formComponents/InputForm';
import {Routes, type RootOnboardingScreenProps} from '@app/navigation/navigation.types';
import {useLocaleStore} from '@app/store/localeStore';
import {type ThemeProps} from '@app/theme/theme';
import {useAppTheme} from '@app/theme/useAppTheme';
import {formatCurrency} from '@app/utils/currency';
import {type CountryInfo} from '@app/utils/isoCountryCurrency';

import {incomeSchema, type IncomeFormData} from './IncomeSetup.schema';

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
  const navigate = () => navigation.push(Routes.BudgetSetup);
  const {availableRegions} = useLocaleStore();

  const {theme} = useAppTheme();
  const styles = styleProps(theme);

  const {control, watch, setValue} = useForm<IncomeFormData>({
    resolver: zodResolver(incomeSchema),
    mode: 'onChange',
    defaultValues: {
      incomeName: '',
      amount: '',
      currency: '',
    },
  });

  const selectedCurrency = watch('currency');

  const [visualMoney, setVisualMoney] = useState('');

  const handleMoney = useCallback(
    (value: string) => {
      const {formatted, numericValue} = formatCurrency({value, currency: selectedCurrency});
      setVisualMoney(() => {
        if (!value) {
          setValue('amount', 0);
          return '';
        }
        setValue('amount', numericValue, {shouldValidate: true});
        return formatted;
      });
    },
    [selectedCurrency],
  );

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
        <InputForm
          control={control}
          name="amount"
          label={'Cantidad'}
          placeholder="1'.000.000"
          onChangeText={handleMoney}
          value={visualMoney}
          inputMode="numeric"
        />
        <Button variant="outline" onPress={navigate}>
          Siguiente
        </Button>
      </View>
    </AppKeyBoardAwareScrollView>
  );
}
