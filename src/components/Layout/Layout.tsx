import {type PropsWithChildren} from 'react';
import {StyleSheet, View} from 'react-native';

import {type RouteProp} from '@react-navigation/native';
import {
  type NativeStackNavigationOptions,
  type NativeStackNavigationProp,
} from '@react-navigation/native-stack';

import {type OnboardingParamList} from '@app/navigation/navigation.types';
import {useAppTheme} from '@app/theme/useAppTheme';

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
  const {colors, statusBarStyle} = useAppTheme();

  const renderBackAction = () => {
    if (!canGoBack) return <></>;
  };

  return (
    <>
      <View style={[styles.layout, {backgroundColor: colors.background}]}>{children}</View>
    </>
  );
}
