import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SearchBar from './searchBar';


const HomeScreen = ({navigation, route}) => {
  const [listings, setListings] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState('');

  const fetchListings = async () => {
    try {
      const existingUsersJson = await AsyncStorage.getItem('users');
      const existingUsers = existingUsersJson ? JSON.parse(existingUsersJson) : [];
      
      const allListings = existingUsers.flatMap(user => user.listings);
      setListings(allListings);
      const loggedInUserEmail = await AsyncStorage.getItem('loggedInUserEmail');
      setLoggedInUser(loggedInUserEmail);
    } catch (error) {
      console.error('Error fetching listings:', error);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('loading data');
      fetchListings();
    });
  
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.space} />
      <SearchBar />
      <ScrollView contentContainerStyle={styles.scrollViewContent} keyboardDismissMode='interactive'>
        {listings.map((listing, index) => (
          <View key={index} style={styles.listingContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('Listing', { image: listing[0], name: listing[1], price: listing[2], description: listing[3], sellerEmail: listing[4]})}>
              <Image source={{ uri: listing[0] }} style={styles.image} />
              {/* <Text style={styles.price}>{listing[0]}</Text> */}
              <Text style={styles.price}>${listing[2]}</Text>
              <Text style={styles.description}>{listing[1]}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b2138',
  },
  scrollViewContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
  },
  listingContainer: {
    width: '48%',
    marginBottom: 20,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
    color: 'white',
  },
  description: {
    fontSize: 14,
    marginTop: 5,
    color: 'white',
  },
  space: {
    height: 33, // Adjust the height as needed
  },
});

export default HomeScreen;
