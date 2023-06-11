import { SafeAreaView } from "react-native";
import styles from "./style";
import { Button, Text } from "@react-native-material/core";
import { Ionicons } from "@expo/vector-icons";

export function OrderConfirmationContainer({ navigateToHomeScreen }) {
  return (
    <SafeAreaView style={styles.container}>
      <Ionicons
        name="md-checkmark-done-circle-outline"
        size={(350, 350)}
        color="green"
      />
      <Text variant="h3" style={styles.headerText}>
        ORDER COMPLETE!
      </Text>
      <Text>Thank you for your purchase.</Text>
      <Button
        title="Continue Shopping"
        color="#6dff63"
        tintColor="darkgreen"
        style={styles.button}
        onPress={navigateToHomeScreen}
      />
    </SafeAreaView>
  );
}
