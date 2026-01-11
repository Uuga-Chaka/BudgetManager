import {View} from 'react-native';

import {Button, Icon, Input} from '@ui-kitten/components';

import {styles} from './PercentageDistributionInput.styles';
import {type PercentageDistributionInputProps} from './PercentageDistributionInput.types';

export default function PercentageDistributionInput({
  id,
  name,
  percentage,
  onDeleteButtonPress,
  onNameChange,
  onPercentageChange,
}: PercentageDistributionInputProps) {
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
      <Input label="Nombre" value={name} style={styles.nameInput} onChangeText={_onNameChange} />
      <Input label="%" value={percentage} onChangeText={_onPercentageChange} />
      <Button
        size="small"
        status="danger"
        appearance="outline"
        style={styles.deleteButton}
        onPress={onDelete}
        accessoryLeft={props => <Icon name="trash" {...props} />}
      />
    </View>
  );
}
