import React, {useState, useEffect} from 'react';
import { View, TextInput, Text, StyleSheet, Image, StatusBar, ScrollView } from 'react-native';
import {TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage'



const ProfileScreen = ({ navigation, route }) => {

  const [name, setName] = useState('');
  const [year, setYear] = useState('');
  const [major, setMajor] = useState('');
  const [bio, setBio] = useState('');
  const [image, setImage] = useState(null);
  const [listings, setListings] = useState([]);


  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadProfileData();
      // if (isFirstLogin === 'false') {
      //   console.log("Profile Edited, isFirstLogin set to false");
      // }
      // else if (isFirstLogin === 'true') {
      //   console.log('This is the first login!');
      // }
      // else  {
      //   console.log("This is NOT the first login");
      // }
      
    });
  
    return unsubscribe;
  }, [navigation]);


  const loadProfileData = async () => {
    try {
      // Retrieve the currently logged-in user's email from AsyncStorage
      const loggedInUserEmail = await AsyncStorage.getItem('loggedInUserEmail');
      console.log('loading data')
      // Retrieve the list of users from AsyncStorage
      const usersJson = await AsyncStorage.getItem('users');
      const users = usersJson ? JSON.parse(usersJson) : [];
  
      // Find the user with the matching email
      const currentUser = users.find(user => user.email === loggedInUserEmail);
  
      if (currentUser) {
        // Set profile data based on the current user's information
        setName(currentUser.name || '');
        setYear(currentUser.year || '');
        setMajor(currentUser.major || '');
        setBio(currentUser.bio || '');

        setImage(currentUser.image || null);
        setListings(currentUser.listings || []);

      } else {
        console.log('User not found');
        // Handle case where the user is not found (e.g., show an error message)
      }
    } catch (error) {
      console.error('Error loading profile data:', error);
    }
  };


  return (
    <ScrollView style={styles.container} contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}>
      <View style={styles.bar}>
        <TouchableOpacity
        style={styles.editButton}
        onPress={() => navigation.navigate('EditProfile')}>
          <Text style={styles.linkText}>Edit</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.circle}>
        <Image
          source={image === null ? require('./assets/grey_person.jpg') : { uri: image }}
          style={styles.image}
        /> 
      </View>
        <Text style={styles.profileText}>{name}</Text>
        <Text style={styles.bioText}>Year: {year}{'\n'}</Text>
        <Text style={styles.bioText}>Major: {major}{'\n'}</Text>
        <Text style={styles.bioText}>{bio}{'\n'}</Text>
        <View style={styles.bar}>

        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={async () => {
            await AsyncStorage.removeItem('loggedInUserEmail');

            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            });
          }}
        >
          <Text style={styles.buttonText}>Sign Out</Text>
        </TouchableOpacity>

    </ScrollView>
  );
};



const styles = StyleSheet.create({
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#0b2138',
  },
  bar: {
    padding: 21,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%'
  },

  button: {
    width: '80%',
    backgroundColor: '#97c4e1',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
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
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 75, 
  },
  profileText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 30,
  },
  bioText: {
    color: 'white',
    fontSize: 16,
    alignSelf: 'flex-start',
  },
  linkText: {
    color: '#97c4e1',
    marginTop: 17,
    textAlign: 'center',
    fontSize: 20, 
    textDecorationLine: 'underline',
  },
  editButton: {
    padding: 10,
  },

  listingsContainer: {
    marginTop: 1,
  },
  button: {
    width: '80%',
    backgroundColor: '#97c4e1',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
});


export default ProfileScreen;
