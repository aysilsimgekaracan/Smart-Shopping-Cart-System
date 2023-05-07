import { Button, StyleSheet, Text, View, Image } from "react-native";
import { useState } from "react";
import styles from "./style";
import { torch, media, torchvision } from "react-native-pytorch-core";
import productClasses from "../../model/ModelClasses.json";

export function CartContainer({ goToPaymentScreen, isReady, model }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>This is the cart page</Text>
      <Image
        source={{
          uri: "https://github.com/aysilsimgekaracan/Smart-Shopping-Cart-System/blob/model/Products/cocacola.jpg?raw=true",
        }}
        style={{ width: 200, height: 200 }}
      />
      <Button onPress={goToPaymentScreen} title="Purchase" />
    </View>
  );
}
