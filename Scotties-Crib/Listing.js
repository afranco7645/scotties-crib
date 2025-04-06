import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Platform } from "react-native";

const ListingScreen = ({ navigation, route }) => {
    const { image, name, price, description, profilePic, profileName, profileBio } = route.params;

    if (image) {console.log("Image exists");}
    console.log("Name:", name);
    console.log("Price:", price);
    console.log("Description:", description);
    if (profilePic) {console.log("ProfilePic exists")};
    console.log(profileName);
    console.log(profileBio);
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
                <Image source={{ uri: image }} style={styles.image}/>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.price}>${price}</Text>
                <View style={styles.line}/>
                <Text style={styles.description}>Description</Text>
                <Text style={styles.descriptionText}>{description}</Text>
                <View style={styles.line}/>
                <Text style={styles.sellerInfo}>Seller Information</Text>
                <View style={styles.sellerContainer}>
                    <Image source={{uri: profilePic}} style={styles.sellerImage}></Image>
                    <Text style={styles.sellerName}>{profileName}</Text>
                    <Text style={styles.sellerBio}>{profileBio}</Text>
                </View>
            </ScrollView>
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
        marginTop: 45,
        position: 'absolute',
        left: 100,
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
});