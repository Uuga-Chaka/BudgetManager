import {View, type ViewProps} from 'react-native';

import {styleProps} from '../CategoryInput/CategoryInput.styles';
import Button from '../core/Button/Button';
import Text from '../core/Text/Text';

export const CategoryInputHeader = ({
  handleCardOpen,
  isCardOpen,
  title,
  ...props
}: {handleCardOpen: () => void; isCardOpen: boolean; title?: string} & ViewProps) => (
  <View {...props}>
    <View style={styleProps().headerContainer}>
      <Text variant="h6">{title ? title : 'Group name'}</Text>
      <Button
        // appearance="ghost"
        // status="control"
        // size="small"
        onPress={handleCardOpen}
        // accessoryLeft={isCardOpen ? ArrowDownIcon : ArrowUpIcon}
      >
        {isCardOpen ? 'Open' : 'Close'}
      </Button>
    </View>
  </View>
);
