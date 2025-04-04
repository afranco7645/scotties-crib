import { View, Text, StyleSheet, ScrollView, Image } from "react-native";

const ListingScreen = ({ navigation, route }) => {
    const { image, name, price, description } = route.params;

    if (image) {console.log("Image exists");}
    console.log("Name:", name);
    console.log("Price:", price);
    console.log("Description:", description);
    return (
        <ScrollView style={styles.container} contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}>
            <Text style={styles.name}>{name}</Text>
            <Image source={{ uri: image }} style={styles.image}/>
            <Text style={styles.price}>{price}</Text>
            <Text style={styles.description}>{description}</Text>
        </ScrollView>
    );
};

export default ListingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#0b2138',
    },
    image: {
        width: 300,
        height: 300,
        marginTop: 15,
    },
    name: {
        color: 'white',
        fontSize: 40,
        marginTop: 50,
    },
    price: {
        color: 'white',
        fontSize: 40,
        marginRight: 250,
    },
    description: {
        color: 'white',
        fontSize: 20,
        marginTop: 30,
    },
});