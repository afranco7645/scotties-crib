import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Platform } from "react-native";

const ListingScreen = ({ navigation, route }) => {
    const { image, name, price, description } = route.params;

    if (image) {console.log("Image exists");}
    console.log("Name:", name);
    console.log("Price:", price);
    console.log("Description:", description);
    return (
        <>
            <ScrollView 
                onScrollToTop={() => console.log('Scrolled to top')} 
                style={styles.container} 
                contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}
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
        alignSelf: "baseline",
        fontWeight: 'bold',
    },
    price: {
        color: 'white',
        fontSize: 18,
        marginLeft: 10,
        marginTop: 5,
        alignSelf: "baseline",
    },
    description: {
        alignSelf: 'baseline',
        color: 'white',
        fontSize: 20,
        marginTop: 5,
        marginLeft: 11,
        fontWeight: 'bold',
    },
    descriptionText: {
        color: 'white',
        fontSize: 18,
        alignSelf: 'baseline',
        marginLeft: 11,
        marginTop: 5,
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