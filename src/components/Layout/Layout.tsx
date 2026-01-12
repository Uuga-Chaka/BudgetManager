import {type PropsWithChildren} from 'react';
import {StyleSheet} from 'react-native';

import {type RouteProp} from '@react-navigation/native';
import {
  type NativeStackNavigationOptions,
  type NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import {Icon, Layout, TopNavigation, TopNavigationAction} from '@ui-kitten/components';

import {type OnboardingParamList} from '@app/navigation/navigation.types';

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

type AppLayoutProps = {
  route: RouteProp<OnboardingParamList, keyof OnboardingParamList>;
  navigation: NativeStackNavigationProp<OnboardingParamList>;
  options: NativeStackNavigationOptions;
} & PropsWithChildren;

export default function AppLayout({children, navigation}: AppLayoutProps) {
  const canGoBack = navigation.canGoBack();

  const renderBackAction = () => {
    if (!canGoBack) return <></>;

    return (
      <TopNavigationAction
        icon={props => <Icon {...props} name="arrow-back" />}
        onPress={() => navigation.goBack()}
      />
    );
  };

  return (
    <>
      <TopNavigation title={''} accessoryLeft={renderBackAction} />
      <Layout style={styles.layout}>{children}</Layout>
    </>
  );
}
