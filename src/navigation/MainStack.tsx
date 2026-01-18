import {StyleSheet, View} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {type ThemeProps} from '@app/theme/theme';
import {useAppTheme} from '@app/theme/useAppTheme';

import HomeTabs from './HomeTabs';
import {type RootStackParamList, Routes} from './navigation.types';
import OnboardingRouter from './OnboardingStack';

const Stack = createNativeStackNavigator<RootStackParamList>();

const styleProps = (colors: ThemeProps['colors']) => {
  const styles = StyleSheet.create({
    navigatorStyle: {
      backgroundColor: colors.background,
    },
    safeAreaContainer: {
      backgroundColor: colors.background,
      flex: 1,
    },
  });
  return styles;
};

export default function Router() {
  const {colors, statusBarStyle} = useAppTheme();

  const styles = styleProps(colors);

  const {top} = useSafeAreaInsets();

  console.log(colors);

  return (
    <View style={{...styles.safeAreaContainer, marginTop: top}}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={Routes.Onboarding}
          screenOptions={{
            headerShown: false,
            statusBarStyle: statusBarStyle,
            contentStyle: styles.navigatorStyle,
          }}>
          {/* <Stack.Screen name={Routes.Home} component={HomeTabs} /> */}
          <Stack.Screen name={Routes.Onboarding} component={OnboardingRouter} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}
