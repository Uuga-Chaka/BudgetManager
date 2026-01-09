import * as eva from '@eva-design/eva';
import {ApplicationProvider} from '@ui-kitten/components';
import {KeyboardProvider} from 'react-native-keyboard-controller';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {useAppTheme} from './src/hooks/useAppTheme';
import Router from './src/navigation/MainStack';

export default function App() {
  const {theme} = useAppTheme();
  return (
    <ApplicationProvider {...eva} theme={theme}>
      <SafeAreaProvider>
        <KeyboardProvider>
          <Router />
        </KeyboardProvider>
      </SafeAreaProvider>
    </ApplicationProvider>
  );
}
