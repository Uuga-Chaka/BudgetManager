import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import HomeTabs from './HomeTabs';
import {type RootStackParamList, Routes} from './navigation.types';
import OnboardingRouter from './OnboardingStack';

const Stack = createNativeStackNavigator<RootStackParamList>();

const styles = StyleSheet.create({
  container: {flex: 1},
});

export default function Router() {
  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        <Stack.Navigator
          initialRouteName={Routes.Onboarding}
          screenOptions={{
            headerShown: false,
            statusBarStyle: 'dark',
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
