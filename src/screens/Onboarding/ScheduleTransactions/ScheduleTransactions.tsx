import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';

import {zodResolver} from '@hookform/resolvers/zod';
import {type Query} from '@nozbe/watermelondb';
import {CommonActions} from '@react-navigation/native';
import {Controller, useFieldArray, useForm} from 'react-hook-form';

import AppKeyBoardAwareScrollView from '@app/components/AppKeyBoardAwareScrollView/AppKeyBoardAwareScrollView';
import Autocomplete from '@app/components/core/Autocomplete/Autocomplete';
import Button from '@app/components/core/Button/Button';
import Text from '@app/components/core/Text/Text';
import {InputForm} from '@app/components/formComponents/InputForm';
import {MoneyInputForm} from '@app/components/formComponents/MoneyInputForm';
import {
  createScheduledTransaction,
  getAllBudgetGroups,
  getAllCategories,
} from '@app/database/queries/createIncome';
import {type RootOnboardingScreenProps, Routes} from '@app/navigation/navigation.types';
import {type ThemeProps} from '@app/theme/theme';
import {useAppTheme} from '@app/theme/useAppTheme';

import {
  BudgetListSchema,
  type ScheduleTransactionFormTypeOutput,
  schemaKey,
  type ScheduleTransactionFormTypeInput,
} from './ScheduleTransactions.schema';

import type BudgetModel from '@app/database/models/budget';
import type BudgetGroupModel from '@app/database/models/budgetGroup';
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

export default function ScheduleTransactions({
  navigation,
}: RootOnboardingScreenProps<typeof Routes.ScheduleTransactions>) {
  const [budgetGroups, setBudgetGroups] = useState<BudgetGroupModel[]>([]);
  const [budgetList, setBudgetList] = useState<BudgetModel[]>([]);
  const [categories, setCategories] = useState<CategoriesModel[]>([]);
  const {theme} = useAppTheme();
  const {
    control,
    handleSubmit,
    setValue,
    formState: {isValid},
  } = useForm<ScheduleTransactionFormTypeInput, unknown, ScheduleTransactionFormTypeOutput>({
    resolver: zodResolver(BudgetListSchema),
    mode: 'onChange',
    defaultValues: {
      budgetGroupId: '',
      budgetList: [],
    },
  });

  const styles = styleProps(theme);

  const {fields, append, remove} = useFieldArray({name: 'budgetList', control});

  const fetchBudgetGroups = async () => {
    const bg = await getAllBudgetGroups();
    setBudgetGroups(bg);
  };

  const fetchCategories = async () => {
    const _categories = await getAllCategories();
    setCategories(_categories);
  };

  useEffect(() => {
    fetchBudgetGroups();
    fetchCategories();
  }, []);

  const fetchBudgetByGroup = async (budget: Query<BudgetModel>, budgetGroupId: string) => {
    const budgetList = await budget.fetch();
    setValue(schemaKey.budgetGroupId, budgetGroupId);
    setBudgetList(budgetList);
  };

  const addTransaction = () => {
    append({
      [schemaKey.budgetAmount]: '',
      [schemaKey.budgetId]: '',
      [schemaKey.categoryId]: '',
      [schemaKey.description]: '',
    });
  };

  const renderListItem = ({value}: {value: string}) => (
    <View style={styles.listItem}>
      <Text>{value}</Text>
    </View>
  );

  const saveScheduleTransactions = handleSubmit(async ({budgetGroupId, budgetList}) => {
    await createScheduledTransaction({
      budgetGroupId,
      scheduledTransactions: budgetList,
    });
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: Routes.Home}],
      }),
    );
  });

  return (
    <AppKeyBoardAwareScrollView>
      <View>
        <Text style={styles.descriptionText}>
          Ahora, ingresemos los gastos fijos de cada mes, sirven como recordatorio para que y
          verificar que si los pagaste. No te preocupes que el precio es una estimación, lo puedes
          cambiar cada vez que quieras
        </Text>
        <Autocomplete
          label="Budget group"
          data={budgetGroups}
          defaultSelection={budgetGroups[0]}
          customRenderItem={({name}) => renderListItem({value: name})}
          onSelectItem={({budgets, id}) => fetchBudgetByGroup(budgets, id)}
          getSelectedItemLabel={({name}) => name}
          ListEmptyComponent={<Text>No hay nada</Text>}
          disableFilter
        />

        {fields.map((field, index) => {
          return (
            <View key={field.id} style={styles.container}>
              <InputForm
                control={control}
                placeholder="Verduras"
                name={`budgetList.${index}.${schemaKey.description}`}
                label={'Cantidad'}
              />
              <MoneyInputForm
                control={control}
                name={`budgetList.${index}.${schemaKey.budgetAmount}`}
                placeholder="1'.000.000"
                label="Cantidad"
                inputMode="numeric"
                countryCode={'COP'}
              />
              <Controller
                control={control}
                name={`budgetList.${index}.${schemaKey.budgetId}`}
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
                name={`budgetList.${index}.${schemaKey.categoryId}`}
                render={({field: {onChange, value}}) => (
                  <Autocomplete
                    data={categories}
                    key={field.id}
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

              <Button onPress={() => remove(index)}>Delete budget</Button>
            </View>
          );
        })}
        <View style={styles.buttonContainer}>
          <Button onPress={addTransaction} disabled={!budgetList.length}>
            Añadir transacción
          </Button>
          <Button disabled={!isValid} onPress={saveScheduleTransactions}>
            Guardar
          </Button>
        </View>
      </View>
    </AppKeyBoardAwareScrollView>
  );
}
