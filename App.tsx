import React from 'react';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useColorScheme } from 'react-native';
import Navigation from './navigation';

function App(): JSX.Element {
     const colorScheme = useColorScheme();
     return (
          <SafeAreaProvider>
               <Navigation colorScheme={colorScheme} />
          </SafeAreaProvider>
     );
}

export default App;
