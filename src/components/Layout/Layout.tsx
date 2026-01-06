import {Layout} from '@ui-kitten/components';
import {type PropsWithChildren} from 'react';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function CustomLayout({children}: PropsWithChildren) {
  return <Layout style={styles.layout}>{children}</Layout>;
}
