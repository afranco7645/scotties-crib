import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { useState } from "react";
import { use } from "react";
import { useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Modal } from "react-native";
import { Gesture, GestureDetector, } from "react-native-gesture-handler";
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated'

const ListingScreen = ({ navigation, route }) => {
    const { image, name, price, description, sellerEmail } = route.params;

    const [profilePic, setProfilePic] = useState(null);
    const [profileName, setProfileName] = useState('');
    const [profileBio, setProfileBio] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);

    const fetchSellerInfo = async () => {
        try {
            const usersJson = await AsyncStorage.getItem('users');
            const users = usersJson ? JSON.parse(usersJson) : [];
            const seller = users.find(user => user.email === sellerEmail);
            console.log("Seller Email:", seller.email);
            console.log("Seller Image:", seller.image);

            setProfilePic(seller.image);
            setProfileName(seller.name);
            setProfileBio(seller.bio);
        } catch(error) {
            console.error("Error fetching seller info:", error);
        }
    };

    useEffect(() => {
        fetchSellerInfo();
    }, []);

    const translationX = useSharedValue(0);
    const translationY = useSharedValue(0);
    const prevTranslationX = useSharedValue(0);
    const prevTranslationY = useSharedValue(0);
    
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            { translateX: translationX.value },
            { translateY: translationY.value },
        ],
    }));

    const panGesture = Gesture.Pan()
        .onStart(() => {
            prevTranslationX.value = translationX.value;
            prevTranslationY.value = translationY.value;
        })
        .onUpdate((event) => {
            translationX.value = prevTranslationX.value + event.translationX;
            translationY.value = prevTranslationY.value + event.translationY;
        });
    // if (image) {console.log("Image exists");}
    // console.log("Name:", name);
    // console.log("Price:", price);
    // console.log("Description:", description);
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
                    </View>
                </View>
                <TouchableOpacity onPress={() => setIsModalVisible(true)}>
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

            <Modal 
                visible={isModalVisible} animationType="slide"
                onRequestClose={() => setIsModalVisible(false)}  
                presentationStyle="pageSheet"          
            >
                <View style={styles.modalContainer}>
                    <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                        <Text style={styles.modalExitButton}>X</Text>
                    </TouchableOpacity>
                
                    
                    <GestureDetector gesture={panGesture}>
                        <Animated.View style={animatedStyle}>
                            <Image source={{ uri: image }} style={styles.image}/>
                        </Animated.View>
                    </GestureDetector>
                </View>
            </Modal>
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
    },
    topBar: {
        backgroundColor: 'white',
        height: 110,
        width: '100%',
    },
    exitContainer: {
        color: 'black',
        // backgroundColor: 'black',
        borderRadius: 10,
        height: 45,
        width: 40,
        marginLeft: 15,
        marginTop: 55,
        fontFamily: "Roboto",
    },
    exitText: {
        fontSize: 30,
        marginTop: 10,
        marginLeft: 7,
    },
    line: {
        borderBottomColor: 'white',
        borderBottomWidth: 0.6,
        width: '95%',
        marginTop: 15,
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'black',
    },
    modalExitButton: {
        color: 'white',
        fontSize: 40,
        marginTop: 20,
        marginLeft: 20,
        marginBottom: 90,
    },
});