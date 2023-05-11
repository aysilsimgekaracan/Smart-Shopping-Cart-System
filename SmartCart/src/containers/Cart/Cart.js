// Import dependencies
import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  useCameraDevices,
  Camera,
  useFrameProcessor,
} from "react-native-vision-camera";

export function CartContainer({ goToPaymentScreen }) {
  const devices = useCameraDevices();
  const device = devices.back;

  if (device == null) return <Text>Hello World</Text>;
  return (
    <Camera style={StyleSheet.absoluteFill} device={device} isActive={true} />
  );
}
