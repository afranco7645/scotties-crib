import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';

const EditProfile = ({ navigation }) => {
  const [name, setName] = useState('');
  const [year, setYear] = useState('');
  const [major, setMajor] = useState('');
  const [bio, setBio] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    const loadProfileData = async () => {
      try {
        const loggedInUserEmail = await AsyncStorage.getItem('loggedInUserEmail');
        const usersJson = await AsyncStorage.getItem('users');
        const users = usersJson ? JSON.parse(usersJson) : [];
        const currentUser = users.find(user => user.email === loggedInUserEmail);

        if (currentUser) {
          setName(currentUser.name || '');
          setYear(currentUser.year || '');
          setMajor(currentUser.major || '');
          setBio(currentUser.bio || '');
          setImage(currentUser.image || null);
        } else {
          console.log('User not found');
        }
      } catch (error) {
        console.error('Error loading profile data:', error);
      }
    };

    loadProfileData();
  }, []);

  const saveProfile = async () => {
    try {
      const existingUsersJson = await AsyncStorage.getItem('users');
      const existingUsers = existingUsersJson ? JSON.parse(existingUsersJson) : [];
      const loggedInUserEmail = await AsyncStorage.getItem('loggedInUserEmail');

      const userIndex = existingUsers.findIndex(user => user.email === loggedInUserEmail);
      if (userIndex !== -1) {
        existingUsers[userIndex].name = name;
        existingUsers[userIndex].year = year;
        existingUsers[userIndex].major = major;
        existingUsers[userIndex].bio = bio;
        existingUsers[userIndex].image = image;

        await AsyncStorage.setItem('users', JSON.stringify(existingUsers));
        console.log('Profile data saved successfully.');
        navigation.goBack();
      } else {
        console.log('Logged-in user not found in AsyncStorage.');
      }
    } catch (error) {
      console.error('Error saving profile data:', error);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log('Image picker result:', result);

    if (!result.cancelled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={{flex:1}}>
      <View style={styles.container}>
        <Text style={styles.header}>Edit Profile</Text>

        {/* Profile Image */}
        <TouchableOpacity onPress={pickImage}>
          <View style={styles.circle}>
            <Image
              source={image === null ? require('./assets/grey_person.jpg') : { uri: image }}
              style={styles.image}
            />
          </View>
        </TouchableOpacity>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Enter your name"
            placeholderTextColor="#A9A9A9"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Year</Text>
          <TextInput
            style={styles.input}
            value={year}
            onChangeText={setYear}
            placeholder="Enter your year"
            placeholderTextColor="#A9A9A9"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Major</Text>
          <TextInput
            style={styles.input}
            value={major}
            onChangeText={setMajor}
            placeholder="Enter your major"
            placeholderTextColor="#A9A9A9"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Bio</Text>
          <TextInput
            style={[styles.input, styles.bioInput]}
            value={bio}
            onChangeText={setBio}
            placeholder="Write your bio here"
            placeholderTextColor="#A9A9A9"
            multiline
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={saveProfile}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#0b2138',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
    textAlign: 'center',
    marginTop: 40
  },
  circle: {
    width: 130,
    height: 130,
    borderRadius: 75,
    borderWidth: 2.7,
    backgroundColor: 'lightgrey',
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    alignSelf: 'center',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 75,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#A9A9A9',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    color: '#0b2138',
  },
  bioInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#97c4e1',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});