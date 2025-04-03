import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Image, Text, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SearchBar from './searchBar';

const windowWidth = Dimensions.get('window').width;

const HomeScreen = ({navigation, route}) => {
  const [listings, setListings] = useState([]);

  const fetchListings = async () => {
    try {
      const existingUsersJson = await AsyncStorage.getItem('users');
      const existingUsers = existingUsersJson ? JSON.parse(existingUsersJson) : [];
      
      const allListings = existingUsers.flatMap(user => user.listings);
      setListings(allListings);
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
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {listings.map((listing, index) => (
          <View key={index} style={styles.listingContainer}>
            <Image source={{ uri: listing[0] }} style={styles.image} />
            <Text style={styles.price}>Price: ${listing[1]}</Text>
            <Text style={styles.description}>{listing[2]}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
    borderColor: '#ccc',
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
  },
  description: {
    fontSize: 14,
    marginTop: 5,
  },
  space: {
    height: 33, // Adjust the height as needed
  },
});

export default HomeScreen;
