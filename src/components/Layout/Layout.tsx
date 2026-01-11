import {Layout} from '@ui-kitten/components';
import {type PropsWithChildren} from 'react';
import {StyleSheet} from 'react-native';

import {size} from '../../consts/styles';

const styles = StyleSheet.create({
  layout: {
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: size.xl,
  },
});

export default function AppLayout({children}: PropsWithChildren) {
  return <Layout style={styles.layout}>{children}</Layout>;
}
