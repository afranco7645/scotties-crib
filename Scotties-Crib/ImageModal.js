import { View, TouchableOpacity, Modal, StyleSheet, Text, Image, Dimensions } from 'react-native';
import { Gesture, GestureDetector, } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'

            
const ImageModalComponent = ({ isImageModalVisible, setIsImageModalVisible, image }) =>
{
    const translationX = useSharedValue(0);
    const translationY = useSharedValue(0);
    const prevTranslationX = useSharedValue(0);
    const prevTranslationY = useSharedValue(0);

    const scale = useSharedValue(1);
    const prevScale = useSharedValue(1);

    const imageWidth = 560;
    const imageHeight = 560;
    const screenWidth = Dimensions.get('screen').width;
    const screenHeight = Dimensions.get('screen').height;
    
    // const [imageDimensions, setImageDimensions] = useState({width: 0, height: 0});
    // useEffect(() => {
    //     if (image) {
    //         Image.getSize(
    //             image,
    //             (width, height) => setImageDimensions({width, height}),
    //             (error) => console.error("Failed to get image dimensions:", error)
    //         );
            
    //     }
        
    // }, [image]);
    
    const panGesture = Gesture.Pan()    
        .onStart(() => {
            prevTranslationX.value = translationX.value;
            prevTranslationY.value = translationY.value;
        })
        .onUpdate((event) => {
            if (scale.value > 1) {
                const scaledImageWidth = imageWidth * scale.value;
                const scaledImageHeight = imageHeight * scale.value;
                const maxTranslationX = Math.max((scaledImageWidth - screenWidth) / 2, 0);
                const maxTranslationY = Math.max((scaledImageHeight - screenHeight) / 2, 0);

                translationX.value = Math.min(
                Math.max(prevTranslationX.value + event.translationX, -maxTranslationX),
                maxTranslationX
                );
                translationY.value = Math.min(
                Math.max(prevTranslationY.value + event.translationY, -maxTranslationY),
                maxTranslationY
                );
            }
        })

    const pinchGesture = Gesture.Pinch()
        .onStart(() => {
            prevScale.value = scale.value;
        })
        .onUpdate((event) => {
            // console.log("Pinching:", event.scale);
            // console.log("Current scale:", scale.value);
            const maxZoom = 3;
            scale.value = Math.min(prevScale.value * event.scale, maxZoom);
            
        })
        .onEnd(() => {
            prevScale.value = scale.value;

            if (scale.value < 1) {
                scale.value = withSpring(1);
                prevScale.value = withSpring(1);
                translationX.value = withSpring(0);
                translationY.value = withSpring(0);
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
            visible={isImageModalVisible} animationType="slide"
            onRequestClose={() => setIsImageModalVisible(false)}  
            presentationStyle="pageSheet"          
        >
            <View style={styles.container}>
                <View style={styles.exitContainer}>
                    <TouchableOpacity onPress={() => setIsImageModalVisible(false)}>
                        <Text style={styles.exitText}>X</Text>
                    </TouchableOpacity>
                </View>
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
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    exitContainer: {
        // backgroundColor: 'red',
        width: 60,
        height: 70,
        marginBottom: 80,
    },
    exitText: {
        color: 'white',
        fontSize: 30,
        marginTop:  15,
        marginLeft: 15,
    },
    image: {
        width: '100%',
        height: 420,
    },
});

export default ImageModalComponent;