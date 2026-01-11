import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StyleService, useTheme} from '@ui-kitten/components';
import {View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import HomeTabs from './HomeTabs';
import {type RootStackParamList, Routes} from './navigation.types';
import OnboardingRouter from './OnboardingStack';
import {useAppTheme} from '../hooks/useAppTheme';

const Stack = createNativeStackNavigator<RootStackParamList>();

const styleProps = (bg: string) =>
  StyleService.create({
    safeAreaContainer: {
      flex: 1,
    },
    container: {
      backgroundColor: bg,
      flex: 1,
    },
    navigatorStyle: {
      backgroundColor: bg,
    },
  });

export default function Router() {
  const theme = useTheme();
  const {statusBarStyle} = useAppTheme();

  const styles = styleProps(theme['background-basic-color-1']);
  const {top} = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <NavigationContainer>
        <View style={{...styles.safeAreaContainer, marginTop: top}}>
          <Stack.Navigator
            initialRouteName={Routes.Onboarding}
            screenOptions={{
              headerShown: false,
              statusBarStyle: statusBarStyle,
              contentStyle: styles.navigatorStyle,
            }}>
            <Stack.Screen name={Routes.Home} component={HomeTabs} />
            <Stack.Group>
              <Stack.Screen name={Routes.Onboarding} component={OnboardingRouter} />
            </Stack.Group>
          </Stack.Navigator>
        </View>
      </NavigationContainer>
    </View>
  );
}
