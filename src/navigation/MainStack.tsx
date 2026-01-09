import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StyleService} from '@ui-kitten/components';
import {SafeAreaView} from 'react-native-safe-area-context';

import HomeTabs from './HomeTabs';
import {type RootStackParamList, Routes} from './navigation.types';
import OnboardingRouter from './OnboardingStack';
import {useAppTheme} from '../hooks/useAppTheme';

const Stack = createNativeStackNavigator<RootStackParamList>();

const styles = StyleService.create({
  safeAreaContainer: {
    flex: 1,
  },
});

export default function Router() {
  const {statusBarStyle} = useAppTheme();

  return (
    <NavigationContainer>
      <SafeAreaView style={styles.safeAreaContainer}>
        <Stack.Navigator
          initialRouteName={Routes.Onboarding}
          screenOptions={{
            headerShown: false,
            statusBarStyle: statusBarStyle,
          }}>
          <Stack.Screen name={Routes.Home} component={HomeTabs} />
          <Stack.Group>
            <Stack.Screen name={Routes.Onboarding} component={OnboardingRouter} />
          </Stack.Group>
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
}
