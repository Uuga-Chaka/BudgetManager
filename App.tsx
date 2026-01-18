import {StatusBar} from 'react-native';

import {KeyboardProvider} from 'react-native-keyboard-controller';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import Router from './src/navigation/MainStack';

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="default" translucent backgroundColor="transparent" />
      <KeyboardProvider>
        <Router />
      </KeyboardProvider>
    </SafeAreaProvider>
  );
}
