import {StyleService, type ThemeType} from '@ui-kitten/components';

import {size} from '@app/consts/styles';

export const styleProps = (theme?: ThemeType) =>
  StyleService.create({
    bodyContainer: {
      gap: size.l,
    },
    headerContainer: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    container: {
      borderColor: theme?.['border-basic-color-3'],
      borderWidth: 1,
      borderRadius: 4,
      backgroundColor: theme?.['background-basic-color-1'],
    },
    body: {
      paddingHorizontal: 24,
      paddingVertical: 16,
    },
    animatedView: {
      overflow: 'hidden',
    },
  });
