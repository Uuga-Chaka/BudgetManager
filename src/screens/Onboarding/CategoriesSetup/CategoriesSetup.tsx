import React from 'react';
import {View} from 'react-native';

import {Button, Divider, Text} from '@ui-kitten/components';

import AppKeyBoardAwareScrollView from '@app/components/AppKeyBoardAwareScrollView/AppKeyBoardAwareScrollView';
import CategoryInput from '@app/components/CategoryInput/CategoryInput';
import {size} from '@app/consts/styles';

export default function CategoriesSetup() {
  return (
    <AppKeyBoardAwareScrollView>
      <View style={{gap: size.l}}>
        <Text>
          Crea tu grupo de porcentajes y como quieres distrubir tu presupuesto. Te recomendamos
          estos porcentajes
        </Text>
        <CategoryInput />

        <Divider />
        <CategoryInput />

        <Button status="control">Añadir categoria</Button>
        <Button>Siguiente</Button>
      </View>
    </AppKeyBoardAwareScrollView>
  );
}
