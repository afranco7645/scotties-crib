import React, { useState } from 'react';

import { StyleSheet, View, TextInput, Text, TouchableOpacity, StatusBar, Image, KeyboardAvoidingView, Alert, Platform} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';



const SignupScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  }

  const handleSignup = async () => {
    try {
      // Simulate basic email validation
      if (email.trim() === '' || !email.includes('@')) {
        console.log('Invalid email format');

        Alert.alert('Error', 'Invalid email format. Please try again following the format: test@test.com');

        return;
      }
  
      // Check if password is empty
      if (password.trim() === '') {
        console.log('Password cannot be empty');

        Alert.alert('Error', 'Password cannot be empty');

        return;
      }

      // Retrieve existing users from AsyncStorage
      const existingUsersJson = await AsyncStorage.getItem('users');
      const existingUsers = existingUsersJson ? JSON.parse(existingUsersJson) : [];

      // Add the new user to the existing users array
      const newUser = { 
        email, 
        password,
        name: '',
        year: '',
        major: '',
        bio: '',
        image: null,
        listings: [],
       };
      const updatedUsers = [...existingUsers, newUser];

      // Save updated users array back to AsyncStorage
      await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));
      await AsyncStorage.setItem('loggedInUserEmail', email);
      console.log('Signup successful');

      // Navigate to another screen after successful signup
      navigation.navigate('EditProfile', { isFirstLogin: true});
    } catch (error) {
      console.error('Error signing up:', error);
      // Handle other errors (e.g., show an error message)
    }
  };



  return (
    <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={{flex:1}}>
      <ScrollView style={styles.container} contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}} keyboardDismissMode='interactive'>
        <StatusBar backgroundColor="#0b2138" barStyle="light-content" />
        <Text style={styles.welcomeText}>Sign Up</Text>
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
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            placeholderTextColor="#97c4e1"
            onChangeText={text => setPassword(text)}
            value={password}
            secureTextEntry={!showPassword}
            autoCapitalize='none'
          />
          <TouchableOpacity onPress={toggleShowPassword} style={styles.showButton}>
            <Text style={styles.showButtonText}>{showPassword ? 'Hide' : 'Show'}</Text>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginButton} onPress={() => navigation.goBack()}>
          <Text style={styles.loginButtonText}>Back to Login</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>

  );
};

const styles = StyleSheet.create({
  kavContainer: {
    flex: 1,
    backgroundColor: '#0b2138',
  },
  container: {
    flex: 1,
    backgroundColor: '#0b2138',
  },
  innerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  scrollView: {
    flexGrow: 1,
  },
  logo: {
    marginBottom: 20,
    width: 250,
    height: 250,
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
    marginBottom: 20, 
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
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  loginButton: {
    marginTop: 15,
  },
  loginButtonText: {
    color: '#97c4e1',
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 5,
    marginBottom: 10,
  },
  passwordInput: {
    flex: 1, // Take up all available space
    padding: 15,
    color: '#0b2138',
  },
  showButton: {
    paddingHorizontal: 10, // Add some padding for the button
  },
  showButtonText: {
    color: '#97c4e1',
    fontWeight: 'bold',
  },
});

export default SignupScreen;