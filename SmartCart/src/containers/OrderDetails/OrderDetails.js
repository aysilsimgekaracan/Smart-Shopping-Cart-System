import {
  SafeAreaView,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";
import styles from "./style";
import { GoBackButton } from "@Components/index";
import { Text } from "@react-native-material/core";

export function OrderDetailsContainer({ goBack }) {
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <SafeAreaView style={styles.container}>
        <GoBackButton onPress={goBack} />
        <Text variant="h3" style={styles.headerText}>
          Order Details Screen Here
        </Text>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
