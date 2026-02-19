import {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import Text from '@app/components/core/Text/Text';
import AppLayout from '@app/components/Layout/Layout';
import {localStorageKeys} from '@app/consts/localStorageKeys';
import {database} from '@app/database';
import AddTransaction from '@app/screens/AddTransaction/AddTransaction';
import {type ThemeProps} from '@app/theme/theme';
import {useAppTheme} from '@app/theme/useAppTheme';

import HomeTabs from './HomeTabs';
import {type RootStackParamList, Routes} from './navigation.types';
import OnboardingRouter from './OnboardingStack';

const Stack = createNativeStackNavigator<RootStackParamList>();

const styleProps = (colors: ThemeProps['colors']) => {
  const styles = StyleSheet.create({
    loadingContainer: {
      alignItems: 'center',
      height: '100%',
      justifyContent: 'center',
    },
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
  const {colors, statusBarMode} = useAppTheme();
  const [initialRoute, setInitialRoute] = useState<keyof RootStackParamList>();
  const styles = styleProps(colors);

  const {top, bottom, left, right} = useSafeAreaInsets();

  useEffect(() => {
    const checkOnboarding = async () => {
      const isOnboardingComplete = await database.localStorage.get(
        localStorageKeys.IS_ONBOARDING_COMPLETED,
      );
      setInitialRoute(isOnboardingComplete ? Routes.Home : Routes.Onboarding);
    };

    checkOnboarding();
  }, []);

  if (!initialRoute) {
    return (
      <View
        style={{
          ...styles.loadingContainer,
          paddingTop: top,
          paddingBottom: bottom,
          paddingLeft: left,
          paddingRight: right,
        }}>
        <Text variant="h6">Loading...</Text>
      </View>
    );
  }

  return (
    <View
      style={{
        ...styles.safeAreaContainer,
        paddingTop: top,
        paddingBottom: bottom,
        paddingLeft: left,
        paddingRight: right,
      }}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={initialRoute}
          screenOptions={{
            headerShown: false,
            statusBarStyle: statusBarMode,
            contentStyle: styles.navigatorStyle,
          }}>
          <Stack.Screen name={Routes.Home} component={HomeTabs} />
          <Stack.Group screenLayout={AppLayout}>
            <Stack.Screen
              name={Routes.AddTransaction}
              component={AddTransaction}
              options={{
                presentation: 'modal',
              }}
            />
          </Stack.Group>
          <Stack.Screen name={Routes.Onboarding} component={OnboardingRouter} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}
