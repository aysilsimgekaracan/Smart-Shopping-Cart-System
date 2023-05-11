// Import dependencies
import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Camera } from "react-native-pytorch-core";
import { useSafeAreaInsets } from "react-native-safe-area-context";
// Import classify image function
import classifyImage from "./ImageClassifier";

export function CartContainer({ goToPaymentScreen }) {
  // Safe area insets to compensate for notches and bottom bars
  const insets = useSafeAreaInsets();
  // Create a React state to store the top class returned from the
  // classifyImage function
  const [topClass, setTopClass] = React.useState(
    "Press capture button to classify what's in the camera view!"
  );

  // Function to handle images whenever the user presses the capture button
  async function handleImage(image) {
    // Call the classify image function with the camera image
    const result = await classifyImage(image);
    // Set result as top class label state
    setTopClass(result);
    // Release the image from memory
    image.release();
  }
  return (
    <View style={StyleSheet.absoluteFill}>
      {/* Render camara and make it parent filling */}
      <Camera
        style={[StyleSheet.absoluteFill, { bottom: insets.bottom }]}
        // Add handle image callback on the camera component
        onCapture={handleImage}
      />
      {/* Label container with custom render style and a text */}
      <View style={styles.labelContainer}>
        {/* Change the text to render the top class label */}
        <Text>{topClass}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  labelContainer: {
    padding: 20,
    margin: 20,
    marginTop: 40,
    borderRadius: 10,
    backgroundColor: "white",
  },
});
