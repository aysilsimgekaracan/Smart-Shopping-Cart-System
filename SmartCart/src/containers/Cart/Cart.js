import { useEffect } from "react";
import { Text, View, ScrollView, Alert } from "react-native";
import { Camera } from "expo-camera";
import { Linking } from "react-native";
import * as Crypto from "expo-crypto";
import { MaterialIcons } from "@expo/vector-icons";
import { Divider } from "@react-native-material/core";
import { ListItem, Avatar, Button } from "@react-native-material/core";
import { LinearGradient } from "expo-linear-gradient";
import { CircularIconButton } from "@Components/index";
import styles from "./style";

// Alias for torchvision transforms
import axios from "axios";
import { ROBOFLOW_API_KEY, ROBOFLOW_URL } from "@env";

let camera: Camera;

export function CartContainer({
  goToCartDetailScreen,
  products,
  getProduct,
  isOpened,
  setIsOpened,
  response,
  setResponse,
  isFocused,
  SECOND_MS,
}) {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  // useKeepAwake();

  // This useEffect starts the timer
  useEffect(() => {
    const interval = setInterval(() => {
      const takePicture = async () => {
        if (camera) {
          // // Define options for the photo
          const options = { quality: 0.5, base64: true, skipProcessing: true };

          // If so take the photo and wait for it to be taken
          const photo = await camera.takePictureAsync(options);

          axios({
            method: "POST",
            url: ROBOFLOW_URL,
            params: {
              api_key: ROBOFLOW_API_KEY,
            },
            data: photo.base64,
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          })
            .then(function (response) {
              console.log(response.data);

              if (
                response != null &&
                response.data.hasOwnProperty("predictions") &&
                response.data.predictions.length > 0
              ) {
                const filteredPredictions = response.data.predictions.filter(
                  (prediction) => prediction.confidence >= 0.1
                );

                response.predictions = filteredPredictions;
                setResponse(response);
              } else {
                setResponse(response.data);
              }
            })
            .catch(function (error) {
              console.log(error.message);
            });
        }
      };
      takePicture();
    }, SECOND_MS);

    return () => clearInterval(interval);
  }, []);

  const getPermission = () => {
    console.log(permission);
    if (permission.status == "denied") {
      Alert.alert(
        "You need to give permission for camera",
        "Please Go to Settings and Turn On Camera Access"
      );
    } else {
      requestPermission();
    }
  };

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={styles.permissionText}>
          We need your permission to show the camera
        </Text>
        <Button
          onPress={() => {
            getPermission();
          }}
          title="grant permission"
        />
      </View>
    );
  }

  if (permission && permission.granted && isFocused) {
    return (
      <View>
        <Camera
          style={styles.camera}
          type={Camera.Constants.Type.back}
          ref={(r) => {
            camera = r;
          }}
        >
          <View style={styles.responseView}>
            <View style={styles.cartView}>
              <Text style={styles.cartText}>Cart</Text>
            </View>

            <View>
              <CircularIconButton
                iconName={isOpened ? "open-in-full" : "close-fullscreen"}
                onPress={() => {
                  setIsOpened(!isOpened);
                }}
              />
              <ScrollView
                style={[styles.scrollView, { height: isOpened ? 300 : 0 }]}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={styles.productsText}>Products</Text>

                  <Button
                    title="Purchase"
                    style={styles.purchaseButton}
                    color="#5a66ff"
                    tintColor="white"
                    leading={(props) => (
                      <MaterialIcons name="payment" size={24} color="white" />
                    )}
                    onPress={() => goToCartDetailScreen(response.predictions)}
                    disabled={
                      response == null ||
                      (response.hasOwnProperty("predictions") &&
                        response.predictions.length == 0)
                    }
                  />
                </View>

                <Divider color="lightgrey" />
                {response != null &&
                response.hasOwnProperty("predictions") &&
                response.predictions.length != 0 ? (
                  <>
                    {response.predictions.map((prediction) => {
                      let product = getProduct(prediction.class);
                      return (
                        <ListItem
                          leadingMode="image"
                          leading={<Avatar image={{ uri: product.image }} />}
                          key={Crypto.randomUUID()}
                          title={product.name}
                          trailing={(props) => (
                            <Text
                              variant="caption"
                              {...props}
                              style={{ fontSize: 10 }}
                            >
                              {product.price}TL
                            </Text>
                          )}
                        />
                      );
                    })}
                  </>
                ) : (
                  <></>
                )}
              </ScrollView>
            </View>
          </View>
        </Camera>
      </View>
    );
  }
}
