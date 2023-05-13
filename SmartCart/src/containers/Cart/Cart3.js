import "react-native-reanimated";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import "react-native-reanimated";
import {
  useCameraDevices,
  Camera,
  useFrameProcessor,
} from "react-native-vision-camera";
import { useState, useRef } from "react";
import axios from "axios";

export function CartContainer({ goToPaymentScreen }) {
  const devices = useCameraDevices("wide-angle-camera");
  const device = devices.back;
  const [boxes, setBoxes] = useState([]);
  const [fps, setFps] = useState(0);
  const windowWidth = Dimensions.get("screen").width;
  const windowHeight = Dimensions.get("screen").height;
  var lastRunTime = Date.now();
  const camera = useRef < Camera > null;

  const updateBboxes = (bs) => {
    setFps(1 / ((Date.now() - lastRunTime) / 1000));

    setBoxes(bs);
    lastRunTime = Date.now();
  };

  const frameProcessor = useFrameProcessor((frame) => {
    "worklet";
    // axios({
    //   method: "POST",
    //   url: "https://detect.roboflow.com/?model=smart-shopping-cart-fjhoz/1",
    //   params: {
    //     api_key: "STt5Fgt2RnmqRK1C3y4d",
    //   },
    //   data: frame,
    //   headers: {
    //     "Content-Type": "application/x-www-form-urlencoded",
    //   },
    // })
    //   .then(function (response) {
    //     console.log(response.data);
    //   })
    //   .catch(function (error) {
    //     console.log(error.message);
    //   });
    console.log("Seems working");
  }, []);

  if (device == null) return <Text>Hello World</Text>;
  return (
    <View style={{ flex: 1 }}>
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        frameProcessor={frameProcessor}
        fps={30}
      ></Camera>
    </View>
  );
}
