import { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Camera } from "expo-camera";
import { useIsFocused } from "@react-navigation/native";
import { useKeepAwake } from "expo-keep-awake";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { Divider } from "@react-native-material/core";
import { ListItem, Avatar, Button } from "@react-native-material/core";

// Alias for torchvision transforms
import axios from "axios";
import { ROBOFLOW_API_KEY, ROBOFLOW_URL } from "@env";

let camera: Camera;

export function CartContainer({ goToPaymentScreen, products }) {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [revealed, setRevealed] = useState(false);
  const SECOND_MS = 10000;
  const isFocused = useIsFocused();
  useKeepAwake();

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

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
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
              <Button
                title="Purchase"
                color="pink"
                tintColor="red"
                leading={(props) => <Icon name="delete" {...props} />}
              />
              <ScrollView style={styles.scrollView}>
                <Text style={styles.cartText}>Products</Text>

                <Divider color="lightgrey" />
                {products.map((product) => {
                  return (
                    <ListItem
                      leadingMode="image"
                      leading={<Avatar image={{ uri: product.image }} />}
                      key={product.id}
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
              </ScrollView>
            </View>
          </View>
        </Camera>
      </View>
    );
  }
}

// Custom render style for label container
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  camera: {
    width: "100%",
    height: "100%",
  },
  scrollView: {
    backgroundColor: "white",
    width: "100%",
    maxHeight: 300,
    alignContent: "flex-end",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  text: {
    fontSize: 42,
  },
  responseView: {
    flexGrow: 1,
    justifyContent: "space-between",
    flexDirection: "column",
  },
  cartView: {
    backgroundColor: "white",
    width: "80%",
    margin: "10%",
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    verticalAlign: "middle",
    alignItems: "center",
  },
  cartText: {
    fontSize: 36,
  },
});
