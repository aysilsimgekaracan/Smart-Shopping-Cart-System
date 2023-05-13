import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  Camera,
  Image,
  media,
  MobileModel,
  Module,
  Tensor,
  torch,
  torchvision,
} from "react-native-pytorch-core";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { getBase64String } from "react-native-image-base64";
// Alias for torchvision transforms
import axios, { isCancel, AxiosError } from "axios";
const T = torchvision.transforms;

import COCO_CLASSES from "./CocoClasses.json";
const IMAGE_SIZE = 640;

// Variable to hold a reference to the loaded ML model
let model = null;

// Variable to hold a reference to the ImageNet classes
let imageNetClasses = null;

export function CartContainer({ goToPaymentScreen }) {
  // Safe area insets to compensate for notches and bottom bars
  const insets = useSafeAreaInsets();
  // Create a React state to store the top class returned from the
  // classifyImage function
  const [topClass, setTopClass] = React.useState(
    "Press capture button to classify what's in the camera view!"
  );

  const imageToBase64 = async (imageObject) => {
    try {
      const base64String = await getBase64String(imageObject);

      return base64String;
    } catch (error) {
      console.error(error);
    }
  };

  function outputsToNMSPredictions(
    prediction,
    imgScaleX,
    imgScaleY,
    startX,
    startY
  ) {
    const predictionThreshold = 0.8;
    const iOUThreshold = 0.8;
    const nMSLimit = 25;
    const results = [];
    const rows = prediction.shape[0];
    const numberOfClass = prediction.shape[1] - 5;
    for (let i = 0; i < rows; i++) {
      const outputs = prediction[i].data();
      // Only consider an object detected if it has a confidence score of over predictionThreshold
      const score = outputs[4];
      if (score > predictionThreshold) {
        // Find the detected objct calss with max score and get the classIndex
        let max = outputs[5];
        let classIndex = 0;
        for (let j = 0; j < numberOfClass; j++) {
          if (outputs[j + 5] > max) {
            max = outputs[j + 5];
            classIndex = j;
          }
        }

        // Calulate the bound of the detected object bounding box
        const x = outputs[0];
        const y = outputs[1];
        const w = outputs[2];
        const h = outputs[3];

        const left = imgScaleX * (x - w / 2);
        const top = imgScaleY * (y - h / 2);

        const bound = [
          startX + left,
          startY + top,
          w * imgScaleX,
          h * imgScaleY,
        ];

        // Construct result and add it to results array
        const result = {
          classIndex: classIndex,
          score: score,
          bounds: bound,
        };
        results.push(result);
      }
    }
    return nonMaxSuppression(results, nMSLimit, iOUThreshold);
  }

  function nonMaxSuppression(boxes, limit, threshold) {
    // Do an argsort on the confidence scores, from high to low.
    const newBoxes = boxes.sort((a, b) => {
      return a.score - b.score;
    });

    const selected = [];
    const active = new Array(newBoxes.length).fill(true);
    let numActive = active.length;

    // The algorithm is simple: Start with the box that has the highest score.
    // Remove any remaining boxes that overlap it more than the given threshold
    // amount. If there are any boxes left (i.e. these did not overlap with any
    // previous boxes), then repeat this procedure, until no more boxes remain
    // or the limit has been reached.
    let done = false;
    for (let i = 0; i < newBoxes.length && !done; i++) {
      if (active[i]) {
        const boxA = newBoxes[i];
        selected.push(boxA);
        if (selected.length >= limit) break;

        for (let j = i + 1; j < newBoxes.length; j++) {
          if (active[j]) {
            const boxB = newBoxes[j];
            if (IOU(boxA.bounds, boxB.bounds) > threshold) {
              active[j] = false;
              numActive -= 1;
              if (numActive <= 0) {
                done = true;
                break;
              }
            }
          }
        }
      }
    }
    return selected;
  }

  function IOU(a, b) {
    let areaA = (a[2] - a[0]) * (a[3] - a[1]);
    if (areaA <= 0.0) return 0.0;

    let areaB = (b[2] - b[0]) * (b[3] - b[1]);
    if (areaB <= 0.0) return 0.0;

    const intersectionMinX = Math.max(a[0], b[0]);
    const intersectionMinY = Math.max(a[1], b[1]);
    const intersectionMaxX = Math.min(a[2], b[2]);
    const intersectionMaxY = Math.min(a[3], b[3]);
    const intersectionArea =
      Math.max(intersectionMaxY - intersectionMinY, 0) *
      Math.max(intersectionMaxX - intersectionMinX, 0);
    return intersectionArea / (areaA + areaB - intersectionArea);
  }

  // Function to handle images whenever the user presses the capture button
  async function handleImage(image) {
    // Get image width and height
    const width = image.getWidth();
    const height = image.getHeight();

    // Convert image to blob, which is a byte representation of the image
    // in the format height (H), width (W), and channels (C), or HWC for short
    const blob = media.toBlob(image);

    // Get a tensor from image the blob and also define in what format
    // the image blob is.
    let tensor = torch.fromBlob(blob, [height, width, 3]);

    // Rearrange the tensor shape to be [CHW]
    tensor = tensor.permute([2, 0, 1]);

    // Divide the tensor values by 255 to get values between [0, 1]
    tensor = tensor.div(255);

    // Crop the image in the center to be a squared image
    const centerCrop = T.centerCrop([IMAGE_SIZE]);
    tensor = centerCrop(tensor);

    // Resize the image tensor to 3 x 224 x 224
    const resize = T.resize([IMAGE_SIZE, IMAGE_SIZE]);
    tensor = resize(tensor);

    // Unsqueeze adds 1 leading dimension to the tensor
    tensor = tensor.unsqueeze(0);

    // If the model has not been loaded already, it will be downloaded from
    // the URL and then loaded into memory.
    if (model === null) {
      console.log("Loading model...");
      const model_url = require("../../model/last.torchscript.ptl");
      const filePath = await MobileModel.download(model_url);
      console.log(filePath);
      model = await torch.jit._loadForMobile(filePath);
      console.log("Model successfully loaded");
    }

    // Run the ML inference with the pre-processed image tensor
    const output = await model.forward(tensor);

    const prediction = output[0];
    const imgScaleX = width / IMAGE_SIZE;
    const imgScaleY = height / IMAGE_SIZE;

    const results = outputsToNMSPredictions(
      prediction[0],
      imgScaleX,
      imgScaleY,
      0,
      0
    );
    console.log(results);

    const resultBoxes = [];
    for (let i = 0; i < results.length; i++) {
      const result = results[i];
      const nameIdx = result.classIndex;
      const name = COCO_CLASSES[nameIdx];
      const score = result.score;

      const match = {
        objectClass: name,
        bounds: result.bounds,
      };

      if (score >= 0.8) {
        resultBoxes.push(name);
      }
    }

    // Resolve the most likely class label and return it
    const result = resultBoxes.toString();

    // Set result as top class label state
    setTopClass(result);

    // Release the image from memory
    // const captureAndConvertToBase64 = async (image) => {
    //   const photo = await captureRef(image, {
    //     format: "jpg",
    //     quality: 0.8,
    //     result: "base64",
    //   });
    //   return ImageBase64.getBase64String(`data:image/jpg;base64,${photo}`);
    // };
    // const base64Image = await image.uriToBase64(options);

    // axios({
    //   method: "POST",
    //   url: "https://detect.roboflow.com/smart-shopping-cart-fjhoz/1",
    //   params: {
    //     api_key: "APIKEYHERE",
    //   },
    //   data: base64Image.base64,
    //   headers: {
    //     "Content-Type": "application/x-www-form-urlencoded",
    //   },
    // })
    //   .then(function (response) {
    //     console.log(response.data);
    //   })
    //   .catch(function (error) {
    //     console.log(error.message);
    //     console.log(error);
    //   });

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

// Custom render style for label container
const styles = StyleSheet.create({
  labelContainer: {
    padding: 20,
    margin: 20,
    marginTop: 40,
    borderRadius: 10,
    backgroundColor: "white",
  },
});
