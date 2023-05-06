import { Button, StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import styles from "./style";
import { torch } from "react-native-pytorch-core";

export function CartContainer({ goToPaymentScreen }) {
  const [tensor, _setTensor] = useState(torch.rand([2, 3]));
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>This is the cart page</Text>
      <Text>{`Random tensor of shape ${
        tensor.shape
      } with data ${tensor.data()}`}</Text>
      <Button onPress={goToPaymentScreen} title="Purchase" />
    </View>
  );
}
