import {StyleSheet} from 'react-native';

import {size} from '@app/consts/styles';
import {type ThemeProps} from '@app/theme/theme';

export const styleProps = (colors?: ThemeProps['colors']) =>
  StyleSheet.create({
    animatedView: {
      overflow: 'hidden',
    },
    body: {
      paddingHorizontal: 24,
      paddingVertical: 16,
    },
    bodyContainer: {
      gap: size.l,
    },
    container: {
      backgroundColor: colors?.background,
      borderColor: colors?.primary,
      borderRadius: 4,
      borderWidth: 1,
    },
    headerContainer: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  });
