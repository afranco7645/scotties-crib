import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Modal, Alert } from "react-native";
import { Gesture, GestureDetector, } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated'
import DropdownComponent from "./DropDown";
import ListingModalComponent from "./ListingModal";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ListingScreen = ({ navigation, route }) => {
    const { image, name, price, description, sellerEmail } = route.params;

    const [profilePic, setProfilePic] = useState(null);
    const [profileName, setProfileName] = useState('');
    const [profileBio, setProfileBio] = useState('');
    const [isSeller, setIsSeller] = useState(false);

    const [isListingModalVisible, setisListingModalVisible] = useState(false);
    const [isDeleteTrue, setIsDeleteTrue] = useState(false);

    const fetchSellerInfo = async () => {
        try {
            const usersJson = await AsyncStorage.getItem('users');
            const users = usersJson ? JSON.parse(usersJson) : [];
            const seller = users.find(user => user.email === sellerEmail);

            const loggedInUserEmail = await AsyncStorage.getItem('loggedInUserEmail');
            // console.log("Logged in user email:", loggedInUserEmail);
            // console.log("Seller Email:", seller.email);
            // console.log("Seller Image:", seller.image);
            
            if (loggedInUserEmail === seller.email) {
                // console.log("The logged in user is the seller");
                setIsSeller(true);
            }
            setProfilePic(seller.image);
            setProfileName(seller.name);
            setProfileBio(seller.bio);
            
        } catch(error) {
            console.error("Error fetching seller info:", error);
        }
    };

    const deleteListingAlert = () => {
        Alert.alert('Delete Listing', 'Are you sure you want to delete this listing?', [
            {
              text: 'Cancel',
              onPress: () => console.log("Delete canceled"),
              style: 'cancel',
            },
            {text: 'Yes', onPress: deleteListing, style: 'destructive'},
          ]);
    }
    const deleteListing = async () => {
        try {
            const existingUsersJson = await AsyncStorage.getItem('users');
            const existingUsers = existingUsersJson ? JSON.parse(existingUsersJson) : [];

            const sellerIndex = existingUsers.findIndex(user => user.email === sellerEmail)
            if (sellerIndex === -1) {
                console.log("Seller not found in Async Storage");
                return;
            }

            // console.log(name)
            const sellerListings = existingUsers[sellerIndex]['listings'];
            const listingIndex = sellerListings.findIndex(listing => listing[1] === name);
            // console.log(listingArray);
            
            if (listingIndex === -1) {
                console.log("Listing not found for the seller");
                return;
            }

            // console.log('Found listing:', sellerListings[listingIndex][1]);
            sellerListings.splice(listingIndex, 1);
            await AsyncStorage.setItem('users', JSON.stringify(existingUsers));
            navigation.goBack();

        } catch (error) {
            console.error('Error deleting listing:', error);
        }
    };

    useEffect(() => {
        fetchSellerInfo();
    }, []);

    return (
        <>
            <ScrollView 
                style={styles.container} 
                contentContainerStyle={{justifyContent: 'center'}}
                stickyHeaderIndices={[0]}
            >
                <View style={styles.topBar}>
                    <View style={styles.exitContainer}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Text style={styles.exitText}>X</Text>
                        </TouchableOpacity>
                        {isSeller && <View style={styles.dotsContainer}>
                            <TouchableOpacity onPress={deleteListingAlert}>
                                <Icon name="trash-can" size={30} color="#900" style={styles.dotsText}/>
                            </TouchableOpacity>
                        </View>}
                    </View>
                </View>

                <TouchableOpacity onPress={() => setisListingModalVisible(true)}>
                    <Image source={{ uri: image }} style={styles.image}/>
                </TouchableOpacity>

                <Text style={styles.name}>{name}</Text>
                <Text style={styles.price}>${price}</Text>
                <View style={styles.line}/>
                <Text style={styles.description}>Description</Text>
                <Text style={styles.descriptionText}>{description}</Text>
                <View style={styles.line}/>
                
                <Text style={styles.sellerInfo}>Seller Information</Text>
                <View style={styles.sellerContainer}>
                    <Image source={profilePic === null ? require('./assets/grey_person.jpg') : {uri: profilePic}} style={styles.sellerImage}></Image>
                    <View>
                        <Text style={styles.sellerName}>{profileName}</Text>
                        <Text style={styles.sellerBio}>{profileBio}</Text>
                    </View>
                </View>
            </ScrollView>

            {isListingModalVisible && 
                <ListingModalComponent 
                    isListingModalVisible={isListingModalVisible} 
                    setisListingModalVisible={setisListingModalVisible}
                    image={image}
                />}

            
        </>
    );
};

export default ListingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#0b2138',
    },
    image: {
        width: '100%',
        height: 420,
    },
    name: {
        color: 'white',
        fontSize: 20,
        marginLeft: 10,
        marginTop: 10,
        fontWeight: 'bold',
    },
    price: {
        color: 'white',
        fontSize: 18,
        marginLeft: 10,
        marginTop: 5,
    },
    description: {
        color: 'white',
        fontSize: 20,
        marginTop: 15,
        marginLeft: 11,
        fontWeight: 'bold',
    },
    descriptionText: {
        color: 'white',
        fontSize: 18,
        marginLeft: 11,
        marginTop: 5,
    },
    sellerInfo: {
        color: 'white',
        fontSize: 20,
        marginTop: 15,
        marginLeft: 11,
        fontWeight: 'bold',
    },
    sellerContainer: {
        flexDirection: 'row',
    },
    sellerImage: {
        width: 75,
        height: 75,
        borderRadius: 100,
        marginTop: 5,
        marginLeft: 10,
    },
    sellerName: {
        color: 'white',
        fontSize: 18,
        marginTop: 20,
        marginLeft: 15,
        fontWeight: 'bold',
    },
    sellerBio: {
        color: 'white',
        fontSize: 16,
        marginTop: 8,
        marginLeft: 16,
        marginRight: 90,
    },
    topBar: {
        backgroundColor: 'white',
        height: 110,
        width: '100%',
    },
    exitContainer: {
        color: 'black',
        flexDirection: 'row',
        borderRadius: 10,
        height: '45%',
        width: "100%",
        marginLeft: 15,
        marginTop: 55,
        fontFamily: "Roboto",
    },
    exitText: {
        fontSize: 30,
        marginTop: 10,
        marginLeft: 7,
        width: "140%",
    },
    dotsContainer: {
        width: '10%',
        marginLeft: 335,
    },
    dotsText: {
        fontSize: 30,
        marginLeft: 7,
        marginTop: 10,
    },
    line: {
        borderBottomColor: 'white',
        borderBottomWidth: 0.6,
        width: '95%',
        marginTop: 15,
    },
});