// Import dependencies
import * as React from "react";
import "react-native-reanimated";
import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  useCameraDevices,
  Camera,
  useFrameProcessor,
} from "react-native-vision-camera";
import classifyImage from "./ImageClassifier";
import { runOnJS } from "react-native-reanimated";
import { useIsFocused } from "@react-navigation/native";

export function CartContainer({ goToPaymentScreen }) {
  const devices = useCameraDevices();
  const device = devices.back;
  const [topClass, setTopClass] = React.useState(
    "Press capture button to classify what's in the camera view!"
  );

  const focused = useIsFocused();

  const frameProcessor = useFrameProcessor(
    (frame) => {
      "worklet";
      // Call the classify image function with the camera image
      // const result = classifyImage(frame);
      // console.log(result);
      // // Set result as top class label state
      // runOnJS(setTopClass)(result);
      // // Release the image from memory
      // frame.release();

      const result = "asdasd";
      runOnJS(setTopClass)(result);
    },
    [topClass]
  );

  if (device == null) return <Text>Hello World</Text>;
  return (
    <Camera
      style={StyleSheet.absoluteFill}
      device={device}
      isActive={focused}
      frameProcessor={frameProcessor}
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
