import React from 'react';
import { Text } from 'react-native';

import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import IntroductionPage1 from './components/IntroductionPage1';
import IntroductionPage2 from './components/IntroductionPage2';
import IntroductionPage3 from './components/IntroductionPage3';
import AuthPage from './components/AuthPage';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Auth' screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Intro1" component={IntroductionPage1} />
          <Stack.Screen name="Intro2" component={IntroductionPage2} />
          <Stack.Screen name="Intro3" component={IntroductionPage3} />
          <Stack.Screen name="Auth" component={AuthPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}