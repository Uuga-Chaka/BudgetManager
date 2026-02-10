import React, {useCallback, useState} from 'react';
import {View} from 'react-native';

import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';

import AppKeyBoardAwareScrollView from '@app/components/AppKeyBoardAwareScrollView/AppKeyBoardAwareScrollView';
import Button from '@app/components/core/Button/Button';
import Input from '@app/components/core/Input/Input';
import Text from '@app/components/core/Text/Text';
import PercentageDistributionInput from '@app/components/PercentageDistributionInput/PercentageDistributionInput';
import {size} from '@app/consts/styles';
import {Routes, type RootOnboardingScreenProps} from '@app/navigation/navigation.types';
import {type PercentageBudgetGroup} from '@app/types/budgetGroup';

import {DEFAULT_PERCENTAGE} from './BudgetSetup.const';
import {type BudgetFormData, budgetSchema} from './BudgetSetup.schema';

export default function BudgetSetup({
  navigation,
}: RootOnboardingScreenProps<typeof Routes.BudgetSetup>) {
  const [budgetGroup, setBudgetGroup] = useState<PercentageBudgetGroup>(DEFAULT_PERCENTAGE);
  const [groupName, setGroupName] = useState('Mi presupuesto');

  const {
    control,
    watch,
    setValue,
    handleSubmit,
    formState: {isValid},
  } = useForm<BudgetFormData>({
    resolver: zodResolver(budgetSchema),
    mode: 'onChange',
    defaultValues: {
      percentageGroupName: '',
      percentageGroups: [],
    },
  });

  const removeBudget = useCallback((id: number) => {
    setBudgetGroup(prev => prev.filter(item => item.id !== id));
  }, []);

  const onNameChange = useCallback((value: string, id: number) => {
    setBudgetGroup(prev => prev.map(e => (id === e.id ? {...e, name: value} : e)));
  }, []);

  const onPercentageChange = useCallback((value: string, id: number) => {
    setBudgetGroup(prev => prev.map(e => (id === e.id ? {...e, percentage: value} : e)));
  }, []);

  const addPercentage = useCallback(() => {
    setBudgetGroup(prev => {
      const maxId = prev.length > 0 ? Math.max(...prev.map(item => item.id)) : 0;
      const newId = maxId + 1;

      return [...prev, {id: newId, name: '', percentage: '0'}];
    });
  }, []);

  const goNext = () => navigation.navigate(Routes.CategoriesSetup);

  return (
    <AppKeyBoardAwareScrollView>
      <View style={{gap: size.l}}>
        <Text>
          Crea tu grupo de porcentajes y como quieres distrubir tu presupuesto. Te recomendamos
          estos porcentajes
        </Text>
        <Input value={groupName} label={'Nombre del grupo'} onChangeText={setGroupName} />
        {budgetGroup.map(e => (
          <PercentageDistributionInput
            key={e.id}
            onDeleteButtonPress={removeBudget}
            onNameChange={onNameChange}
            onPercentageChange={onPercentageChange}
            {...e}
          />
        ))}
        <Button status="info" onPress={addPercentage}>
          Añadir porcentaje
        </Button>
        <Button onPress={goNext}>Siguiente</Button>
      </View>
    </AppKeyBoardAwareScrollView>
  );
}
