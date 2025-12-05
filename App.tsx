import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { RootNavigator } from './src/navigation/RootNavigator';
import { ActivityProvider } from './src/contexts/ActivityContext';

const App = () => {
  return (
    <ActivityProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </ActivityProvider>
  );
};

export default App;
