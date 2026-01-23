import {StatusBar} from 'react-native';

import {KeyboardProvider} from 'react-native-keyboard-controller';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {AppThemeProvider} from '@app/theme/useAppTheme';

import Router from './src/navigation/MainStack';

export default function App() {
  return (
    <AppThemeProvider>
      <SafeAreaProvider>
        {/* <StatusBar barStyle="default" translucent backgroundColor="transparent" /> */}
        <KeyboardProvider>
          <Router />
        </KeyboardProvider>
      </SafeAreaProvider>
    </AppThemeProvider>
  );
}
