import {StatusBar} from 'react-native';

import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {KeyboardProvider} from 'react-native-keyboard-controller';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {useAppTheme} from './src/hooks/useAppTheme';
import Router from './src/navigation/MainStack';

export default function App() {
  const {theme} = useAppTheme();

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={theme}>
        <SafeAreaProvider>
          <KeyboardProvider>
            <StatusBar barStyle="default" translucent />
            <Router />
          </KeyboardProvider>
        </SafeAreaProvider>
      </ApplicationProvider>
    </>
  );
}
