import * as eva from '@eva-design/eva';
import {ApplicationProvider} from '@ui-kitten/components';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import Router from './src/router/Router';

export default function App() {
  return (
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    <ApplicationProvider {...eva} theme={eva.light}>
      <SafeAreaProvider>
        <Router />
      </SafeAreaProvider>
    </ApplicationProvider>
  );
}
