import { Button, StyleSheet, Text, View } from "react-native"
import styles from "./style"
import { useState } from 'react'
import { torch } from 'react-native-pytorch-core'

export function CartContainer({ goToPaymentScreen }) {
  const [tensor, _setTensor] = useState(torch.rand([2, 3]))
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>This is the cart page</Text>
      <Button onPress={goToPaymentScreen} title="Purchase" />
      <Text>{`Random tensor of shape ${tensor.shape} with data ${tensor.data()}`}</Text>
    </View>
  )
}