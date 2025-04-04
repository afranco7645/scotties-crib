import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Text, TouchableOpacity, StatusBar, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ScrollView } from 'react-native-gesture-handler';

const ResetPassword = ({ navigation, route }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const {email} = route.params;

  const doResetPassword = async () => {
    try {
        if (password === '' || confirmPassword === '') {
            console.log('password field empty');
            Alert.alert('Invalid Password', 'Either password field cannot be empty');
            return;
        } else if ((password != confirmPassword) || confirmPassword != password) {
            console.log('passwords don\'t match');
            Alert.alert('Invalid Password', 'Passwords do not match');
            return;
        } 

        const storedUsersJson = await AsyncStorage.getItem('users');
        // console.log(storedUsersJson)
        const storedUsers = storedUsersJson ? JSON.parse(storedUsersJson) : [];
    
        // Check if users exist in AsyncStorage
        if (storedUsers.length > 0) {
          // Find the user with the entered email
          const user = storedUsers.find(user => user.email === email);
    
          if (user) {
            console.log('account found');
                if ((password === confirmPassword) && (password != user.password)) {
                    user.password = password;

                    const updatedUsers = storedUsers.map(u => {
                        if (u.email === email) {
                            return { ...u, password: password };
                        }
                        return u;
                    });

                    await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));

                    console.log('password reset success');
                    Alert.alert('Password Reset', 'Your password has been reset. Please login with your new password.');
                    navigation.navigate('Login', {name: 'Login'});
                } else {
                    console.log('New password matches old password');
                    Alert.alert('Error', 'The new password entered matches the previous password. Please enter a new one');
                }         
          } else {
            console.log('Account not found');
            Alert.alert('Error', 'Account not found');
            // Handle invalid email or password (e.g., show an error message)
          }
        } else {
          console.log('No stored users found');
          Alert.alert('Error', 'No stored users found');
          // Handle case where no users are stored
        }
    } catch (error) {
        console.error('Error resetting password:', error);
        // Handle other errors (e.g., show an error message)
    }
    
  };

  const navigateToLogin = () => {
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}} keyboardDismissMode='interactive'>
      <StatusBar backgroundColor="#0b2138" barStyle="light-content" />
      <Text style={styles.welcomeText}>Reset Password</Text>
      <Text style={styles.instructions}>Please enter a new password</Text>
        <TextInput
            style={styles.input}
            placeholder="New Password"
            placeholderTextColor="#97c4e1"
            onChangeText={text => setPassword(text)}
            value={password}
            secureTextEntry={true}
            autoCapitalize='none'
        />
        <TextInput
            style={styles.input}
            placeholder="Confirm New Password"
            placeholderTextColor="#97c4e1"
            onChangeText={text => setConfirmPassword(text)}
            value={confirmPassword}
            secureTextEntry={true}
            autoCapitalize='none'
        />
      <TouchableOpacity style={styles.button} onPress={doResetPassword}>
        <Text style={styles.buttonText}>Reset Password</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginButton} onPress={navigateToLogin}>
        <Text style={styles.loginButtonText}>Cancel</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b2138',
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
    fontSize: 28,
    fontWeight: '600',
    marginBottom: '2%',
    marginTop: 350,
  },
  instructions: {
    color: 'white',
    fontSize: 14,
    fontWeight: '300',
    marginBottom: '10%',
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
  }
});

export default ResetPassword;