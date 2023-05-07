/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Add import for MobileModel from PyTorch Live SDK
import {
  MobileModel,
  torch,
  torchvision,
  media,
} from "react-native-pytorch-core";
// Import the ImageNetClasses JSON file, which is used below to map the
// processed model result to a class label
import * as ImageNetClasses from "./ImageNetClasses.json";

// Alias for torchvision transforms
const T = torchvision.transforms;

// URL to the image classification model that is used int his example
const MODEL_URL =
  "https://github.com/pytorch/live/releases/download/v0.1.0/mobilenet_v3_small.ptl";

// Variable to hold a reference to the loaded ML model
let model = null;

// The classifyImage function that will process an image and return the top
// class label
export default async function classifyImage(image) {
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
  const centerCrop = T.centerCrop(Math.min(width, height));
  tensor = centerCrop(tensor);

  // Resize the image tensor to 3 x 224 x 224
  const resize = T.resize(224);
  tensor = resize(tensor);

  // Normalize the tensor image with mean and standard deviation
  const normalize = T.normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225]);
  tensor = normalize(tensor);

  // Unsqueeze adds 1 leading dimension to the tensor
  tensor = tensor.unsqueeze(0);

  // If the model has not been loaded already, it will be downloaded from
  // the URL and then loaded into memory.
  if (model == null) {
    const filePath = await MobileModel.download(MODEL_URL);
    model = await torch.jit._loadForMobile(filePath);
  }

  // Run the ML inference with the pre-processed image tensor
  const output = await model.forward(tensor);

  // Get the index of the value with the highest probability
  const maxIdx = output.argmax().item();

  // Resolve the most likely class label and return it
  return ImageNetClasses[maxIdx];
}
