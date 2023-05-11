// Import dependencies
import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  useCameraDevices,
  Camera,
  useFrameProcessor,
} from "react-native-vision-camera";
import classifyImage from "./ImageClassifier";

export function CartContainer({ goToPaymentScreen }) {
  const devices = useCameraDevices();
  const device = devices.back;
  const [topClass, setTopClass] = React.useState(
    "Press capture button to classify what's in the camera view!"
  );

  const frameProcessor = useFrameProcessor(
    (frame) => {
      "worklet";
      // Call the classify image function with the camera image
      const result = classifyImage(frame);
      // Set result as top class label state
      setTopClass(result);
      // Release the image from memory
      image.release();
      console.log("I am working fine");
    },
    [topClass]
  );

  if (device == null) return <Text>Hello World</Text>;
  return (
    <Camera
      style={StyleSheet.absoluteFill}
      device={device}
      isActive={true}
      frameProcessor={frameProcessor}
      fps={2}
    >
      <View style={styles.labelContainer}>
        {/* Change the text to render the top class label */}
        <Text>{topClass}</Text>
      </View>
    </Camera>
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
