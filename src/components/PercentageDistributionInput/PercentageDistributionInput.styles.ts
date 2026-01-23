import {StyleSheet} from 'react-native';

import {type ThemeProps} from '@app/theme/theme';

export const styleProps = (theme: ThemeProps) => {
  const styles = StyleSheet.create({
    container: {
      alignItems: 'flex-end',
      flexDirection: 'row',
      flexGrow: 0,
      gap: theme.spacing.s,
      width: '100%',
    },
    deleteButton: {},
    nameInput: {
      flex: 1,
    },
    percentageInput: {
      flex: 0,
      minWidth: 40,
      textAlign: 'center',
    },
  });

  return styles;
};
