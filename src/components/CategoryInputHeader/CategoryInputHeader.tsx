import {View, type ViewProps} from 'react-native';

import {Button, Text} from '@ui-kitten/components';

import {ArrowDownIcon, ArrowUpIcon} from '@app/assets/Icons';

import {styleProps} from '../CategoryInput/CategoryInput.styles';

export const CategoryInputHeader = ({
  handleCardOpen,
  isCardOpen,
  title,
  ...props
}: {handleCardOpen: () => void; isCardOpen: boolean; title?: string} & ViewProps) => (
  <View {...props}>
    <View style={styleProps().headerContainer}>
      <Text category="h6" appearance={!title ? 'hint' : 'default'}>
        {title ? title : 'Group name'}
      </Text>
      <Button
        appearance="ghost"
        status="control"
        size="small"
        onPress={handleCardOpen}
        accessoryLeft={isCardOpen ? ArrowDownIcon : ArrowUpIcon}
      />
    </View>
  </View>
);
