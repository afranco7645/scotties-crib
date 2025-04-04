import React, { useState, useEffect } from 'react';

import { StyleSheet, View, TextInput, Text, TouchableOpacity, StatusBar, Image, ScrollView, Alert, KeyboardAvoidingView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';



const LoginScreen = ({ navigation, route }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setEmail('');
      setPassword('');
    });

    return unsubscribe;
  }, [navigation]);

  const showAsyncStorage = async () => {
    try {
      const storedUsersJson = await AsyncStorage.getItem('users');
      if (storedUsersJson) {
        const storedUsers = JSON.parse(storedUsersJson);
        const simplifiedUsers = storedUsers.map(user => ({
          ...user,
          image: user.image ? 'image' : null,
        }));
        console.log(JSON.stringify(simplifiedUsers, null, 2))
      }
    }
    catch (error) {
      console.error('Error showing Async Storage:', error);
    }


  }
  const clearAsyncStorage = async () => {
    try {
      await AsyncStorage.clear();
      console.log('AsyncStorage cleared successfully.');
    } catch (error) {
      console.error('Error clearing AsyncStorage:', error);
    }
  };
  const handleLogin = async () => {
    try {
      // Retrieve stored users from AsyncStorage
      const storedUsersJson = await AsyncStorage.getItem('users');
      // console.log(storedUsersJson)
      const storedUsers = storedUsersJson ? JSON.parse(storedUsersJson) : [];
  
      // Check if users exist in AsyncStorage
      if (storedUsers.length > 0) {
        // Find the user with the entered email
        const user = storedUsers.find(user => user.email === email);
  
        if (user && user.password === password) {
          console.log('Login successful');
          // Save the logged-in user's email
          await AsyncStorage.setItem('loggedInUserEmail', email);
          // Navigate to another screen after successful login

          navigation.reset({
            index: 0,
            routes: [{ name: "HomeWithNavBar" }],
          });
        } else {
          console.log('Invalid email or password');
          alert('Invalid email or password')

          // Handle invalid email or password (e.g., show an error message)
        }
      } else {
        console.log('No stored users found');

        Alert.alert('Error', 'No stored users found');

        // Handle case where no users are stored
      }
    } catch (error) {
      console.error('Error logging in:', error);
      // Handle other errors (e.g., show an error message)
    }

  };
  
  const navigateToForgotPassword = () => {
    // Navigate to the Forgot Password screen here
    console.log('Navigate to Forgot Password');
    navigation.navigate('ForgotPassword');

  };
  
  

  const navigateToSignUp = () => {
    // Navigate to the Sign Up screen here
    console.log('Navigate to Sign Up');
    navigation.navigate('Signup', {name: 'Login'});
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}} keyboardDismissMode='interactive'>
        <StatusBar backgroundColor="#0b2138" barStyle="light-content" />
        <Text style={styles.welcomeText}>Log In</Text>
        <Image source={require('./assets/icon.png')} style={styles.logo} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#97c4e1"
          onChangeText={text => setEmail(text)}
          value={email}
          keyboardType="email-address"
          autoCapitalize='none'
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#97c4e1"
          onChangeText={text => setPassword(text)}
          value={password}
          secureTextEntry={true}
          autoCapitalize='none'
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signUpButton} onPress={navigateToSignUp}>
          <Text style={styles.signUpButtonText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.forgotPasswordButton} onPress={navigateToForgotPassword}>
          <Text style={styles.signUpButtonText}>Forgot Your Password?</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity style={styles.devButton} onPress={showAsyncStorage}>
          <Text style={styles.buttonText}>Show Async Storage</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.devButton1} onPress={clearAsyncStorage}>
          <Text style={styles.buttonText}>Clear Async Storage</Text>
        </TouchableOpacity> */}

      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b2138',
  },
  logo: {
    marginBottom: 10,
    width: 250, // Set your logo width
    height: 250, // Set your logo height
  },
  input: {
    width: '80%',
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
    color: '#0b2138',
  },
  welcomeText: {
    color: 'white',
    fontSize: 36,
    marginBottom: 20, // Adjusted for spacing
    marginTop: 100,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    width: '80%',
    backgroundColor: '#97c4e1',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  devButton: {
    width: '50%',
    backgroundColor: "#66CDAA",
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  devButton1: {
    width: '50%',
    backgroundColor: "#FA8072",
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  signUpButton: {
    marginTop: 15,
  },
  signUpButtonText: {
    color: '#97c4e1',
    fontSize: 16,
  },
  forgotPasswordButton: {
    marginTop: 20,
    fontSize: 10,
}
});

export default LoginScreen;