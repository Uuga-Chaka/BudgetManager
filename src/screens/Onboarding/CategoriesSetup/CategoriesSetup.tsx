import React, {useState} from 'react';
import {View} from 'react-native';

import AppKeyBoardAwareScrollView from '@app/components/AppKeyBoardAwareScrollView/AppKeyBoardAwareScrollView';
import CategoryInput from '@app/components/CategoryInput/CategoryInput';
import Button from '@app/components/core/Button/Button';
import Input from '@app/components/core/Input/Input';
import Text from '@app/components/core/Text/Text';
import {size} from '@app/consts/styles';

import {RECOMMENDED_CATEGORIES} from './CategoriesSetup.const';

export default function CategoriesSetup() {
  const [categories, setCategories] = useState(RECOMMENDED_CATEGORIES);

  const onDeleteCategory = (id: number) => {
    setCategories(prev => prev.filter(e => e.id !== id));
  };

  const onAddCategory = () => {
    setCategories(prev => {
      const maxId = prev.length > 0 ? Math.max(...prev.map(e => e.id)) : 0;
      const newId = maxId + 1;
      return [...prev, {id: newId, name: ''}];
    });
  };
  return (
    <AppKeyBoardAwareScrollView>
      <View style={{gap: size.l}}>
        <Text>
          Crea tu grupo de porcentajes y como quieres distrubir tu presupuesto. Te recomendamos
          estos porcentajes
        </Text>

        {categories.map(({name, id}) => {
          return <Input label="Nombre de categoria" value={name} key={id} />;
        })}

        <Button status="info" onPress={onAddCategory}>
          Añadir categoria
        </Button>
        <Button>Siguiente</Button>
      </View>
    </AppKeyBoardAwareScrollView>
  );
}
