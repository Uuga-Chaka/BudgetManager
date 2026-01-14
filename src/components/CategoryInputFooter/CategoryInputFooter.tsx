import {View} from 'react-native';

import {Button} from '@ui-kitten/components';

import {TrashIcon} from '@app/assets/Icons';

export const CategoryInputFooter = ({onDelete}: {onDelete: () => void}) => (
  <View>
    <Button status="danger" accessoryRight={TrashIcon} onPress={onDelete}>
      Borrar
    </Button>
  </View>
);
