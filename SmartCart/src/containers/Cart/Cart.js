import { Button, StyleSheet, Text, View } from 'react-native';
import styles from "./style"

export function CartContainer({goToPaymentScreen}) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>This is the cart page</Text>
      <Button onPress={goToPaymentScreen} title="Purchase" />
    </View>
  );
}