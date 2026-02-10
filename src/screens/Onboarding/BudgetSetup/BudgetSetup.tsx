import React, {useCallback} from 'react';
import {StyleSheet, View} from 'react-native';

import {zodResolver} from '@hookform/resolvers/zod';
import {useFieldArray, useForm} from 'react-hook-form';

import {TrashIcon} from '@app/assets/Icons';
import AppKeyBoardAwareScrollView from '@app/components/AppKeyBoardAwareScrollView/AppKeyBoardAwareScrollView';
import Button from '@app/components/core/Button/Button';
import Text from '@app/components/core/Text/Text';
import {InputForm} from '@app/components/formComponents/InputForm';
import {size} from '@app/consts/styles';
import {Routes, type RootOnboardingScreenProps} from '@app/navigation/navigation.types';
import {useSetupStore} from '@app/store';
import {type ThemeProps} from '@app/theme/theme';
import {useAppTheme} from '@app/theme/useAppTheme';

import {type BudgetFormData, budgetSchema} from './BudgetSetup.schema';

const styleProps = (theme: ThemeProps) => {
  const styles = StyleSheet.create({
    container: {
      alignItems: 'flex-end',
      flexDirection: 'row',
      gap: theme.spacing.s,
    },
    nameInput: {
      flex: 1,
    },
    percentageInput: {
      flex: 0,
      minWidth: 40,
      textAlign: 'center',
    },
  });
  return styles;
};

export default function BudgetSetup({
  navigation,
}: RootOnboardingScreenProps<typeof Routes.BudgetSetup>) {
  const {theme} = useAppTheme();

  const styles = styleProps(theme);
  const {setPercentageGroupName, setPercentageGroups} = useSetupStore();

  const {
    control,
    handleSubmit,
    watch,
    formState: {isValid},
  } = useForm<BudgetFormData>({
    resolver: zodResolver(budgetSchema),
    mode: 'onChange',
    defaultValues: {
      percentageGroupName: '',
      percentageGroups: [],
    },
  });

  const {fields, append, remove} = useFieldArray({control: control, name: 'percentageGroups'});

  const groupList = watch('percentageGroups');
  const addPercentage = useCallback(() => {
    const maxId = groupList.length > 0 ? Math.max(...groupList.map(e => e.id)) : 0;
    const newId = maxId + 1;
    append({id: newId, name: '', percentage: 0});
  }, []);

  const goNext = handleSubmit(data => {
    setPercentageGroupName(data.percentageGroupName);
    setPercentageGroups(data.percentageGroups);
    navigation.navigate(Routes.CategoriesSetup);
  });

  return (
    <AppKeyBoardAwareScrollView>
      <View style={{gap: size.l}}>
        <Text>
          Crea tu grupo de porcentajes y como quieres distrubir tu presupuesto. Te recomendamos
          estos porcentajes
        </Text>
        <InputForm
          containerStyle={styles.nameInput}
          label="Nombre del grupo"
          name={'percentageGroupName'}
          control={control}
        />
        {fields.map((field, index) => (
          <View style={styles.container} key={field.id}>
            <InputForm
              containerStyle={styles.nameInput}
              label="Nombre"
              name={`percentageGroups.${index}.name`}
              control={control}
            />
            <InputForm
              containerStyle={styles.percentageInput}
              label="%"
              name={`percentageGroups.${index}.percentage`}
              control={control}
            />
            <Button variant="ghost" onPress={() => remove(index)} IconRight={TrashIcon} />
          </View>
        ))}
        <Button status="info" onPress={addPercentage}>
          Añadir porcentaje
        </Button>
        <Button onPress={goNext} disabled={!isValid}>
          Siguiente
        </Button>
      </View>
    </AppKeyBoardAwareScrollView>
  );
}
