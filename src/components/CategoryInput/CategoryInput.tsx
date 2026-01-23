import {useState} from 'react';
import {View} from 'react-native';

import Animated from 'react-native-reanimated';

import useAccordionAnimation from '@app/hooks/useAccordionAnimation';
import {useAppTheme} from '@app/theme/useAppTheme';

import {styleProps} from './CategoryInput.styles';
import {type CategoryInputProps} from './CategoryInput.types';
import {CategoryInputFooter} from '../CategoryInputFooter/CategoryInputFooter';
import {CategoryInputHeader} from '../CategoryInputHeader/CategoryInputHeader';
import Input from '../core/Input/Input';

export default function CategoryInput({
  data = [],
  defaultGroupName = 'Nombre del grupo',
  defaultValue = 0,
  onDelete,
  onGroupNameChange,
  onSelectCategory,
}: CategoryInputProps) {
  const {colors} = useAppTheme();

  const [groupName, setGroupName] = useState(defaultGroupName);

  const styles = styleProps(colors);
  const {bodyStyle, handleCardOpen, isCardOpen, onHandlingLayout} = useAccordionAnimation();

  // const [selectedIndex, setSelectedIndex] = useState<IndexPath | IndexPath[]>(
  //   () => new IndexPath(defaultValue),
  // );

  // const handleSelect = (index: IndexPath | IndexPath[]) => {
  //   onSelectCategory?.(index);
  //   setSelectedIndex(index);
  // };

  const handleGroupNameChange = (value: string) => {
    setGroupName(value);
    onGroupNameChange?.(value);
  };

  const handleDelete = () => {
    onDelete?.();
  };

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <CategoryInputHeader
          title={groupName}
          handleCardOpen={handleCardOpen}
          isCardOpen={isCardOpen}
        />
      </View>
      <Animated.View style={[styles.animatedView, bodyStyle]}>
        <View onLayout={onHandlingLayout} style={[styles.bodyContainer, styles.body]}>
          <Input
            value={groupName}
            label={'Nombre del grupo'}
            onChangeText={handleGroupNameChange}
          />
          {/* <Select
            multiSelect={false}
            selectedIndex={selectedIndex}
            onSelect={handleSelect}
            label={'Categoria'}>
            {data.map((value, i) => (
              <SelectItem title={value} key={String(i) + value} />
            ))}
          </Select> */}
          <CategoryInputFooter onDelete={handleDelete} />
        </View>
      </Animated.View>
    </View>
  );
}
