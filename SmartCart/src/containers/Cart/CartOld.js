// Import dependencies
import * as React from "react";
import { useCallback, useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import detectObjects from "./ObjectDetector";
import CameraScreen from "./screens/CameraScreen";
import LoadingScreen from "./screens/LoadingScreen";
import ResultsScreen from "./screens/ResultsScreen";

const ScreenStates = {
  CAMERA: 0,
  LOADING: 1,
  RESULTS: 2,
};

export function CartContainer({ goToPaymentScreen }) {
  const [image, setImage] = useState(null);
  const [boundingBoxes, setBoundingBoxes] = useState(null);
  const [screenState, setScreenState] = useState(ScreenStates.CAMERA);

  // Handle the reset button and return to the camera capturing mode
  const handleReset = useCallback(async () => {
    setScreenState(ScreenStates.CAMERA);
    if (image != null) {
      await image.release();
    }
    setImage(null);
    setBoundingBoxes(null);
  }, [image, setScreenState]);

  // This handler function handles the camera's capture event
  async function handleImage(capturedImage) {
    setImage(capturedImage);
    // Wait for image to process through YOLOv5 model and draw resulting image
    setScreenState(ScreenStates.LOADING);
    try {
      const newBoxes = await detectObjects(capturedImage);
      setBoundingBoxes(newBoxes);
      // Switch to the ResultsScreen to display the detected objects
      setScreenState(ScreenStates.RESULTS);
    } catch (err) {
      // In case something goes wrong, go back to the CameraScreen to take a new picture
      handleReset();
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      {screenState === ScreenStates.CAMERA && (
        <CameraScreen onCapture={handleImage} />
      )}
      {screenState === ScreenStates.LOADING && <LoadingScreen />}
      {screenState === ScreenStates.RESULTS && (
        <ResultsScreen
          image={image}
          boundingBoxes={boundingBoxes}
          onReset={handleReset}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
