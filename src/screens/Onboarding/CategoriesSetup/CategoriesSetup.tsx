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
import {type RootOnboardingScreenProps, Routes} from '@app/navigation/navigation.types';
import {useSetupStore} from '@app/store';
import {type ThemeProps} from '@app/theme/theme';
import {useAppTheme} from '@app/theme/useAppTheme';

import {RECOMMENDED_CATEGORIES} from './CategoriesSetup.const';
import {categorySchema, type CategoryFormData} from './CategoriesSetup.schema';

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
  });
  return styles;
};

export default function CategoriesSetup({
  navigation,
}: RootOnboardingScreenProps<typeof Routes.CategoriesSetup>) {
  const {theme} = useAppTheme();
  const styles = styleProps(theme);
  const {setCategories} = useSetupStore();

  const {
    control,
    watch,
    handleSubmit,
    formState: {isValid},
  } = useForm<CategoryFormData>({
    mode: 'onChange',
    resolver: zodResolver(categorySchema),
    defaultValues: {
      categories: RECOMMENDED_CATEGORIES,
    },
  });

  const {fields, remove, append} = useFieldArray({control, name: 'categories'});

  const categoriesList = watch('categories');

  const onAddCategory = useCallback(() => {
    const maxId = categoriesList.length > 0 ? Math.max(...categoriesList.map(e => e.id)) : 0;
    const newId = maxId + 1;
    append({id: newId, name: ''});
  }, [categoriesList]);

  const handleNext = handleSubmit(data => {
    setCategories(data.categories);
    navigation.navigate(Routes.ResumeSetup);
  });

  return (
    <AppKeyBoardAwareScrollView>
      <View style={{gap: size.l}}>
        <Text>
          Crea tu grupo de categorias. Te recomendamos las siguientes en caso de que tengas pereza
          de crear la tuyas. Recuerda, siempre puedes modificarlas cuando quieras en el panel de
          configuración
        </Text>

        {fields.map((field, index) => (
          <View style={styles.container} key={field.id}>
            <InputForm
              containerStyle={styles.nameInput}
              label="Nombre"
              name={`categories.${index}.name`}
              control={control}
            />
            <Button variant="ghost" onPress={() => remove(index)} IconRight={TrashIcon} />
          </View>
        ))}

        <Button status="info" onPress={onAddCategory}>
          Añadir categoria
        </Button>
        <Button onPress={handleNext} disabled={!isValid}>
          Siguiente
        </Button>
      </View>
    </AppKeyBoardAwareScrollView>
  );
}
