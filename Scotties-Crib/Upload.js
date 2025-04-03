import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, Platform, KeyboardAvoidingView, Keyboard} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { globalStyles } from './styles.js';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage'
import fetchListings from './Home.js'

const UploadScreen = ({ navigation, route }) => {
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  const clearListings = async () => {
    try {
        
      // Retrieve the existing users from AsyncStorage
      const existingUsersJson = await AsyncStorage.getItem('users');
      const existingUsers = existingUsersJson ? JSON.parse(existingUsersJson) : [];
      
      // Retrieve the currently logged-in user's email from AsyncStorage
      const loggedInUserEmail = await AsyncStorage.getItem('loggedInUserEmail');
      console.log(loggedInUserEmail)
      const userIndex = existingUsers.findIndex(user => user.email === loggedInUserEmail);
      // console.log(userIndex)
      if (userIndex !== -1) {
        console.log(existingUsers[userIndex])
        existingUsers[userIndex]['listings'] = [];

        await AsyncStorage.setItem('users', JSON.stringify(existingUsers));
        console.log('Listings cleared.');
        alert('Listings cleared');
        
      } else {
        console.log('Logged-in user not found in AsyncStorage.');
      }
    } catch (error) {
      console.error('Error saving profile data:', error);
    }

  };

  const handleUpload = async () => {
    try {
        
        // Retrieve the existing users from AsyncStorage
        const existingUsersJson = await AsyncStorage.getItem('users');
        const existingUsers = existingUsersJson ? JSON.parse(existingUsersJson) : [];
        
        // Retrieve the currently logged-in user's email from AsyncStorage
        const loggedInUserEmail = await AsyncStorage.getItem('loggedInUserEmail');
        console.log(loggedInUserEmail)
    
        // Find the index of the logged-in user in the existing users array
        const userIndex = existingUsers.findIndex(user => user.email === loggedInUserEmail);
        if (userIndex !== -1) {
          // Update the user's profile data
        //   existingUsers[userIndex]['listings']
        if (image != null && price != '' && description != ''){
          existingUsers[userIndex]['listings'].push([image, price, description]);
          console.log(existingUsers[userIndex]);
          setImage(null);
          setPrice('');
          setDescription('');
          
          // console.log(year)
          // console.log(major)
          // console.log(bio)
          // console.log(existingUsers[userIndex])
          // Save the updated users array back to AsyncStorage
          

          await AsyncStorage.setItem('users', JSON.stringify(existingUsers));
    
          console.log('Profile data saved successfully.');
          alert('Listing data successfully saved');
          

        }
        if (image == null) {
          alert('Please upload an image');
        }
        else if (price == '') {
          alert('Please enter a price');
        }
        else if (description == '') {
          alert('Please enter a description');
        }
    
          // Navigate back to the Profile screen
        } else {
          console.log('Logged-in user not found in AsyncStorage.');
          // Handle case where logged-in user is not found
        }
      } catch (error) {
        console.error('Error saving profile data:', error);
        // Handle error while saving profile data
      }
    // Logic to handle the upload process
    // console.log('Image:', image);
    // console.log('Price:', price);
    // console.log('Description:', description);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log("Image picker result:", result);

    if (!result.cancelled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -200} // Adjust this value according to your needs
    >
      <ScrollView>
        <Text style={styles.headerText}>Upload an Image of the Item:</Text>
        <TouchableOpacity style={styles.uploadImageButton} onPress={pickImage} Text={'Hello'}>
          <Text>Upload Image</Text>
        </TouchableOpacity>
        {image && <Image source={{ uri: image }} style={styles.image} />}
        <Text style={styles.headerText}>Price:</Text>
        <TextInput
          style={styles.input}
          value={price}
          onChangeText={setPrice}
          placeholder="Price"
          keyboardType="numeric"
          placeholderTextColor={'#A9A9A9'}
        />
        <Text style={styles.headerText}>Item Description:</Text>
        <TextInput
            style={[styles.input, styles.descriptionInput]}
            value={description}
            onChangeText={setDescription}
            placeholder="Description"
            multiline={true}
            placeholderTextColor={'#A9A9A9'}
        />
        <TouchableOpacity style={styles.uploadImageButton} onPress={handleUpload}>
          <Text>Upload</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={clearListings}>
          <Text>Clear Listings</Text>
        </TouchableOpacity> */}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#0b2138',
    padding: 20,
  },
  headerText: {
    fontSize: 25,
    marginBottom: 10,
    marginTop: 60,
    color: 'white',
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    fontSize: 16,
    color: 'white',
  },
  descriptionInput: {
    height: 100,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  uploadImageButton: {
    width: '100%',
    backgroundColor: '#97c4e1',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  button: {
    width: '80%',
    backgroundColor: '#97c4e1',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
    justifyContent: 'center',
  },
});

export default UploadScreen;
