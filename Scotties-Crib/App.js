import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './Login';
import SignupScreen from './Signup';
import HomeScreen from './Home';
import ProfileScreen from './Profile';
import EditProfileScreen from './EditProfile';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';
import NavBar from './NavBar';
import ListingScreen from './Listing';
import DropdownComponent from './DropDown';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar/>
      <Stack.Navigator
        initialRouteName="HomeWithNavBar"
        screenOptions={{
          gestureEnabled: true,
          animationTypeForReplace: 'pop', 
        }}
      >
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
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfileScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="HomeWithNavBar"
          component={NavBar}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Listing"
          component={ListingScreen}
          options={{
            presentation: 'modal',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Dropdown"
          component={DropdownComponent}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
