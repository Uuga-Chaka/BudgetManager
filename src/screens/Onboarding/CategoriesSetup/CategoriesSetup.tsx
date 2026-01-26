import React, {useCallback, useState} from 'react';
import {View} from 'react-native';

import AppKeyBoardAwareScrollView from '@app/components/AppKeyBoardAwareScrollView/AppKeyBoardAwareScrollView';
import Button from '@app/components/core/Button/Button';
import Text from '@app/components/core/Text/Text';
import PercentageDistributionInput from '@app/components/PercentageDistributionInput/PercentageDistributionInput';
import {size} from '@app/consts/styles';

import {RECOMMENDED_CATEGORIES} from './CategoriesSetup.const';

export default function CategoriesSetup() {
  const [categories, setCategories] = useState(RECOMMENDED_CATEGORIES);

  const onDeleteCategory = useCallback((id: number) => {
    setCategories(prev => prev.filter(e => e.id !== id));
  }, []);

  const onAddCategory = () => {
    setCategories(prev => {
      const maxId = prev.length > 0 ? Math.max(...prev.map(e => e.id)) : 0;
      const newId = maxId + 1;
      return [...prev, {id: newId, name: ''}];
    });
  };

  const onChangeCategoryName = (value: string, id: number) => {
    setCategories(prev => prev.map(e => (e.id === id ? {...e, name: value} : e)));
  };
  return (
    <AppKeyBoardAwareScrollView>
      <View style={{gap: size.l}}>
        <Text>
          Crea tu grupo de categorias. Te recomendamos las siguientes en caso de que tengas pereza
          de crear la tuyas. Recuerda, siempre puedes modificarlas cuando quieras en el panel de
          configuración
        </Text>

        {categories.map(({name, id}) => (
          <PercentageDistributionInput
            withPercentage={false}
            name={name}
            key={id}
            id={id}
            onNameChange={onChangeCategoryName}
            onDeleteButtonPress={onDeleteCategory}
          />
        ))}

        <Button status="info" onPress={onAddCategory}>
          Añadir categoria
        </Button>
        <Button>Siguiente</Button>
      </View>
    </AppKeyBoardAwareScrollView>
  );
}
