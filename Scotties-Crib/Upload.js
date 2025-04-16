import React, { useState, useSyncExternalStore } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, Platform, KeyboardAvoidingView } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { globalStyles } from './styles.js';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage'
import fetchListings from './Home.js'
import { AntDesign } from 'react-native-vector-icons'
import ImageModalComponent from './ImageModal.js';

const UploadScreen = ({ navigation, route }) => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');


  const [isModalVisible, setIsModalVisible] = useState(false);

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

        // console.log('Profile Picture:', profilePic);
        // console.log('Profile Name:', profileName);
        if (image != null && name != '' && price != '' && description != ''){
          existingUsers[userIndex]['listings'].push([image, name, price, description, loggedInUserEmail]);
          console.log(existingUsers[userIndex]);
          setImage(null);
          setName('');
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
        else if (name == '') {
          alert('Please enter a name');
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
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView keyboardDismissMode='interactive'>
        {/* <Text style={styles.welcomeText}>Upload an Image of the Item:</Text> */}
        {!image && <View style={styles.uploadImageContainer}>
            <TouchableOpacity style={styles.uploadImageButton} onPress={pickImage} Text={'Hello'}>
              <Text style={styles.uploadImageText}>Upload Image</Text>
              <AntDesign name="picture" size={30} color={'white'}/>
            </TouchableOpacity>
          </View>
        }
        
        {image && <>
            <TouchableOpacity style={styles.changeImageButton} onPress={pickImage} Text={'Hello'}>
              <Text>Change Image</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setIsModalVisible(true)}>
              <View style={styles.exitContainer}>
                <TouchableOpacity onPress={() => setImage(null)}>
                  <Text style={styles.exitText}>X</Text>
                </TouchableOpacity>
              </View>

              <Image source={{ uri: image }} style={styles.image}/>
              
            </TouchableOpacity>
          </>
        }
        
        <Text style={styles.headerText}>Title</Text> 
        <TextInput 
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder='Name'
          placeholderTextColor={'#A9A9A9'}
        />
        <Text style={styles.headerText}>Price</Text>
        <TextInput
          style={styles.input}
          value={price}
          onChangeText={setPrice}
          placeholder="Price"
          keyboardType="numeric"
          placeholderTextColor={'#A9A9A9'}
        />
        <Text style={styles.headerText}>Item Description</Text>
        <TextInput
            style={[styles.input, styles.descriptionInput]}
            value={description}
            onChangeText={setDescription}
            placeholder="Description"
            multiline={true}
            placeholderTextColor={'#A9A9A9'}
        />
        <TouchableOpacity style={styles.uploadButton} onPress={handleUpload}>
          <Text>Upload</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={clearListings} style={styles.uploadImageButton}>
          <Text>Clear Listings</Text>
        </TouchableOpacity> */}
      </ScrollView>

      <ImageModalComponent
        isImageModalVisible={isModalVisible}
        setIsImageModalVisible={setIsModalVisible}
        image={image}  
      />

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
    color: 'white',
    marginTop: 20,
  },
  welcomeText: {
    fontSize: 25,
    color: 'white',
    marginTop: 40,
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
  uploadButton: {
    width: '100%',
    backgroundColor: '#97c4e1',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  uploadImageContainer: {
    alignSelf: 'center',
    width: 200,
    height: 150,
    marginTop: 40,
  },
  uploadImageButton: {
    width: 200,
    height: 150,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    alignSelf: "center",
    borderColor: 'gray',
    borderWidth: 1,
  },
  uploadImageText: {
    color: 'white',
    fontSize: 20,
    marginTop: 35,
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
  changeImageButton: {
    width: '100%',
    backgroundColor: '#97c4e1',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 40,
  },
  exitContainer: {
    width: 40,
    position: "absolute",
    zIndex: 1,
  },
  exitText: {
    color: 'white',
    fontSize: 30,
    marginTop: 7,
    marginLeft: 7,
  },
});

export default UploadScreen;
