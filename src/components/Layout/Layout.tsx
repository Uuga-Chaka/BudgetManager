import {type PropsWithChildren} from 'react';
import {StyleSheet} from 'react-native';

import {
  Icon,
  type IconElement,
  type IconProps,
  Layout,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';

import {size} from '../../consts/styles';

const styles = StyleSheet.create({
  layout: {
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: size.xl,
  },
});

const BackIcon = (props: IconProps): IconElement => <Icon {...props} name="arrow-back" />;

const BackAction = (): React.ReactElement => <TopNavigationAction icon={BackIcon} />;

export default function AppLayout({children}: PropsWithChildren) {
  return (
    <>
      <TopNavigation title={''} accessoryLeft={BackAction} />
      <Layout style={styles.layout}>{children}</Layout>
    </>
  );
}
