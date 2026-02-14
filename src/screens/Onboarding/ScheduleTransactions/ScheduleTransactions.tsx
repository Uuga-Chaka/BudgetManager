import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';

import {zodResolver} from '@hookform/resolvers/zod';
import {type Query} from '@nozbe/watermelondb';
import {Controller, useFieldArray, useForm} from 'react-hook-form';

import AppKeyBoardAwareScrollView from '@app/components/AppKeyBoardAwareScrollView/AppKeyBoardAwareScrollView';
import Autocomplete from '@app/components/core/Autocomplete/Autocomplete';
import Button from '@app/components/core/Button/Button';
import Text from '@app/components/core/Text/Text';
import {InputForm} from '@app/components/formComponents/InputForm';
import {MoneyInputForm} from '@app/components/formComponents/MoneyInputForm';
import {getAllBudgetGroups, getAllCategories} from '@app/database/queries/createIncome';
import {type ThemeProps} from '@app/theme/theme';
import {useAppTheme} from '@app/theme/useAppTheme';

import {
  BudgetListSchema,
  schemaKey,
  type ScheduleTransactionFormType,
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

export default function ScheduleTransactions() {
  const [budgetGroups, setBudgetGroups] = useState<BudgetGroupModel[]>([]);
  const [budgetList, setBudgetList] = useState<BudgetModel[]>([]);
  const [categories, setCategories] = useState<CategoriesModel[]>([]);
  const {theme} = useAppTheme();
  const {
    control,
    formState: {isValid},
  } = useForm<ScheduleTransactionFormType>({
    resolver: zodResolver(BudgetListSchema),
    mode: 'onChange',
    defaultValues: {
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

  const fetchBudgetByGroup = async (budget: Query<BudgetModel>) => {
    const budgetList = await budget.fetch();
    setBudgetList(budgetList);
  };

  const addTransaction = () => {
    append({budgetAmount: 0, budgetId: '', categoryId: '', name: ''});
  };

  const renderListItem = ({value}: {value: string}) => (
    <View style={styles.listItem}>
      <Text>{value}</Text>
    </View>
  );

  return (
    <AppKeyBoardAwareScrollView>
      <View>
        <Text style={styles.descriptionText}>
          Ahora, ingresemos los gastos fijos de cada mes, sirven como recordatorio para que y
          verificar que si los pagaste. No te preocupes que el precio es una estimación, lo puedes
          cambiard cada vez que quieras
        </Text>
        <Autocomplete
          label="Budget group"
          data={budgetGroups}
          defaultSelection={budgetGroups[0]}
          customRenderItem={({name}) => renderListItem({value: name})}
          onSelectItem={({budgets}) => fetchBudgetByGroup(budgets)}
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
                name={`budgetList.${index}.${schemaKey.name}`}
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
                render={() => (
                  <Autocomplete
                    data={budgetList}
                    customRenderItem={({name}) => renderListItem({value: name})}
                    disableFilter
                    getSelectedItemLabel={({name}) => name}
                    label="Presupuesto"
                  />
                )}
              />
              <Controller
                control={control}
                name={`budgetList.${index}.${schemaKey.categoryId}`}
                render={() => (
                  <Autocomplete
                    data={categories}
                    key={field.id}
                    customRenderItem={({name}) => renderListItem({value: name})}
                    disableFilter
                    getSelectedItemLabel={({name}) => name}
                    label="Categoria"
                  />
                )}
              />
              <Button onPress={() => remove(index)}>Delete budget</Button>
            </View>
          );
        })}
        <View style={styles.buttonContainer}>
          <Button onPress={addTransaction}>Añadir transacción</Button>
          <Button disabled={!isValid}>Guardar</Button>
        </View>
      </View>
    </AppKeyBoardAwareScrollView>
  );
}
