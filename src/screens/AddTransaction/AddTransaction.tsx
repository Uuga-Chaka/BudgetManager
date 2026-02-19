import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';

import {zodResolver} from '@hookform/resolvers/zod';
import {Controller, useForm} from 'react-hook-form';

import AppKeyBoardAwareScrollView from '@app/components/AppKeyBoardAwareScrollView/AppKeyBoardAwareScrollView';
import Autocomplete from '@app/components/core/Autocomplete/Autocomplete';
import Button from '@app/components/core/Button/Button';
import Text from '@app/components/core/Text/Text';
import {InputForm} from '@app/components/formComponents/InputForm';
import {MoneyInputForm} from '@app/components/formComponents/MoneyInputForm';
import {
  createTransaction,
  getAllBudgetGroups,
  getAllCategories,
} from '@app/database/queries/createIncome';
import {type RootScreenProps, type Routes} from '@app/navigation/navigation.types';
import {type ThemeProps} from '@app/theme/theme';
import {useAppTheme} from '@app/theme/useAppTheme';
import {currencyStringToNumber} from '@app/utils/currency';

import {
  AddTransactionSchema,
  schemaKey,
  type AddTransactionFormType,
} from './AddTransaction.schema';

import type BudgetModel from '@app/database/models/budget';
import type CategoriesModel from '@app/database/models/categories';

const styleProps = ({colors, spacing}: ThemeProps) => {
  const styles = StyleSheet.create({
    buttonContainer: {gap: spacing.l, marginTop: spacing.l},
    container: {
      borderBottomWidth: 1,
      borderColor: colors.basicTrans_300,
      gap: spacing.l,
      paddingVertical: spacing.l,
    },
    descriptionText: {
      paddingVertical: spacing.l,
    },
    listItem: {
      padding: spacing.s,
    },
  });

  return styles;
};

export default function AddTransaction({
  navigation,
}: RootScreenProps<typeof Routes.AddTransaction>) {
  const [budgetList, setBudgetList] = useState<BudgetModel[]>([]);
  const [categories, setCategories] = useState<CategoriesModel[]>([]);
  const {theme} = useAppTheme();
  const {
    control,
    handleSubmit,
    setValue,
    formState: {isValid},
  } = useForm<AddTransactionFormType>({
    resolver: zodResolver(AddTransactionSchema),
    mode: 'onChange',
    defaultValues: {
      budgetAmount: '',
      budgetId: '',
      categoryId: '',
      description: '',
    },
  });

  const styles = styleProps(theme);

  const fetchBudgetGroups = async () => {
    // TODO: If this throws and error or the length is 0 this screen should not exists
    const bg = await getAllBudgetGroups();
    // TODO: refactor this implementation
    const selectedBudgetGroup = bg?.[0];
    setValue(schemaKey.budgetGroupId, selectedBudgetGroup.id);
    const budgetList = await selectedBudgetGroup.budgets.fetch();
    setBudgetList(budgetList);
  };

  const fetchCategories = async () => {
    const _categories = await getAllCategories();
    setCategories(_categories);
  };

  useEffect(() => {
    fetchBudgetGroups();
    fetchCategories();
  }, []);

  const renderListItem = ({value}: {value: string}) => (
    <View style={styles.listItem}>
      <Text>{value}</Text>
    </View>
  );

  const saveScheduleTransactions = handleSubmit(
    async ({budgetAmount, budgetGroupId, budgetId, categoryId, description}) => {
      const bdt = currencyStringToNumber(budgetAmount);
      await createTransaction({
        [schemaKey.budgetAmount]: bdt,
        [schemaKey.budgetGroupId]: budgetGroupId,
        [schemaKey.budgetId]: budgetId,
        [schemaKey.categoryId]: categoryId,
        [schemaKey.description]: description,
      });

      navigation.goBack();
    },
  );

  return (
    <AppKeyBoardAwareScrollView>
      <View>
        <Text style={styles.descriptionText}>
          Ahora, ingresemos los gastos fijos de cada mes, sirven como recordatorio para que y
          verificar que si los pagaste. No te preocupes que el precio es una estimación, lo puedes
          cambiar cada vez que quieras
        </Text>

        <View style={styles.container}>
          <InputForm
            control={control}
            placeholder="Verduras"
            name={schemaKey.description}
            label={'Cantidad'}
          />
          <MoneyInputForm
            control={control}
            name={schemaKey.budgetAmount}
            placeholder="1'.000.000"
            label="Cantidad"
            inputMode="numeric"
            countryCode={'COP'}
          />
          <Controller
            control={control}
            name={schemaKey.budgetId}
            render={({field: {onChange, value}}) => (
              <Autocomplete
                data={budgetList}
                customRenderItem={({name}) => renderListItem({value: name})}
                disableFilter
                onSelectItem={item => onChange(item.id)}
                value={value}
                getSelectedItemLabel={({name}) => name}
                label="Presupuesto"
                ListEmptyComponent={<Text>No hay nada</Text>}
              />
            )}
          />
          <Controller
            control={control}
            name={schemaKey.categoryId}
            render={({field: {onChange, value}}) => (
              <Autocomplete
                data={categories}
                customRenderItem={({name}) => renderListItem({value: name})}
                disableFilter
                getSelectedItemLabel={({name}) => name}
                onSelectItem={item => onChange(item.id)}
                value={value}
                label="Categoria"
                ListEmptyComponent={<Text>No hay nada</Text>}
              />
            )}
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button disabled={!isValid} onPress={saveScheduleTransactions}>
            Guardar
          </Button>
        </View>
      </View>
    </AppKeyBoardAwareScrollView>
  );
}
