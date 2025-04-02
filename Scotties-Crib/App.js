import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './Login';
import SignupScreen from './Signup';
import HomeScreen from './Home';
import Profile from './Profile'
import EditProfile from './EditProfile'
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';
import NavBar from './NavBar';


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

          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPassword}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="ResetPassword"
            component={ResetPassword}
            options={{
              headerShown: false,
            }}
          />

        <Stack.Screen name="Profile" component={Profile} 
        options={{
          headerShown: false,
        }}
        />


        <Stack.Screen name="EditProfile" component={EditProfile}
        options={{
          headerShown: false,
        }}/>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen
          name="HomeWithNavBar"
          component={NavBar}
          options={{ headerShown: false }}
        />



      </Stack.Navigator>
    </NavigationContainer>
  );
}
