import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './login';
import SignupScreen from './signup';
import { globalStyles } from './styles';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" 
          component={LoginScreen}
          options={{
            headerShown: false,   
          }}
        />
        <Stack.Screen
            name="Signup"
            component={SignupScreen}
            options={{
              headerShown: false,
            }}
          />
      </Stack.Navigator>
    </NavigationContainer>
  );
}




/*
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
*/