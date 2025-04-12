import { useEffect, useState } from 'react';
import { View, TouchableOpacity, Modal, StyleSheet, Text, Image, Dimensions } from 'react-native';
import { Gesture, GestureDetector, } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'
            
const ListingModalComponent = ({ isModalVisible, setIsModalVisible, image }) =>
{
    const translationX = useSharedValue(0);
    const translationY = useSharedValue(0);
    const prevTranslationX = useSharedValue(0);
    const prevTranslationY = useSharedValue(0);

    const scale = useSharedValue(1);
    const prevScale = useSharedValue(1);

    const [imageDimensions, setImageDimensions] = useState({width: 0, height: 0});
    const screenWidth = Dimensions.get('screen').width;
    const screenHeight = Dimensions.get('screen').height;
    // console.log(screenHeight);

    useEffect(() => {
        if (image) {
            Image.getSize(
                image,
                (width, height) => setImageDimensions({width, height}),
                (error) => console.error("Failed to get image dimensions:", error)
            );

        }
    }, [image]);
    
    const panGesture = Gesture.Pan()    
        .onStart(() => {
            prevTranslationX.value = translationX.value;
            prevTranslationY.value = translationY.value;
        })
        .onUpdate((event) => {
            if (scale.value > 1) {
                // console.log("Panning");
                translationX.value = prevTranslationX.value + event.translationX;
                translationY.value = prevTranslationY.value + event.translationY;
                // console.log(translationY.value);
            }
        })
        .onEnd(() => {
            translationX.value = 0;
            translationY.value = 0;
        })

    const pinchGesture = Gesture.Pinch()
        .onStart(() => {
            prevScale.value = scale.value;
        })
        .onUpdate((event) => {
            // console.log("Pinching:", event.scale);
            // console.log("Current scale:", scale.value);
            scale.value = prevScale.value * event.scale;
            
        })
        .onEnd(() => {
            prevScale.value = scale.value;

            if (scale.value < 1) {
                scale.value = withSpring(1);
                prevScale.value = withSpring(1);
            }
        });


    const combinedGesture = Gesture.Simultaneous(panGesture, pinchGesture);     

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            { translateX: translationX.value },
            { translateY: translationY.value },
            { scale: scale.value },
        ],
    }));
    

    return (
        <Modal 
            visible={isModalVisible} animationType="slide"
            onRequestClose={() => setIsModalVisible(false)}  
            presentationStyle="pageSheet"          
        >
            <View style={styles.modalContainer}>
                <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                    <Text style={styles.modalExitButton}>X</Text>
                </TouchableOpacity>
            
                <GestureDetector gesture={combinedGesture}>
                    <Animated.View style={animatedStyle}>
                        <Image source={{ uri: image }} style={styles.image}/>
                    </Animated.View>
                </GestureDetector>
            </View>
        </Modal>

    );
};


const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: 'black',
        borderColor: 'red',
        borderWidth: 4,
    },
    modalExitButton: {
        color: 'white',
        fontSize: 40,
        marginTop: 20,
        marginLeft: 20,
        marginBottom: 90,
    },
    image: {
        width: '100%',
        height: 420,
        borderColor: 'red',
        borderWidth: 4,
    },
});

export default ListingModalComponent;