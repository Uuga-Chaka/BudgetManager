import {View} from 'react-native';

import {TrashIcon} from '@app/assets/Icons';
import {useAppTheme} from '@app/theme/useAppTheme';

import {styleProps} from './PercentageDistributionInput.styles';
import {type PercentageDistributionInputProps} from './PercentageDistributionInput.types';
import Button from '../core/Button/Button';
import Input from '../core/Input/Input';

export default function PercentageDistributionInput({
  id,
  name,
  percentage,
  onDeleteButtonPress,
  onNameChange,
  onPercentageChange,
  withPercentage = true,
}: PercentageDistributionInputProps) {
  const {theme} = useAppTheme();
  const styles = styleProps(theme);
  const onDelete = () => {
    if (id) onDeleteButtonPress?.(id);
  };

  const _onNameChange = (value: string) => {
    if (id) onNameChange?.(value, id);
  };

  const _onPercentageChange = (value: string) => {
    if (id) onPercentageChange?.(value, id);
  };

  return (
    <View style={styles.container}>
      <Input
        label="Nombre"
        value={name}
        containerStyle={styles.nameInput}
        onChangeText={_onNameChange}
      />
      {withPercentage && (
        <Input
          label="%"
          value={percentage}
          onChangeText={_onPercentageChange}
          containerStyle={styles.percentageInput}
        />
      )}
      <Button
        variant="ghost"
        style={styles.deleteButton}
        onPress={onDelete}
        IconRight={TrashIcon}
      />
    </View>
  );
}
