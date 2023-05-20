import {
  SafeAreaView,
  Alert,
  View,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import styles from "./style";
import { GoBackButton } from "@Components/index";
import {
  TextInput,
  Button,
  Text,
  Stack,
  Divider,
} from "@react-native-material/core";

export function PaymentContainer({
  goBack,
  totalAmount,
  cardNumber,
  setCardNumber,
  expiryDate,
  cvv,
  setCvv,
  isNumeric,
  isValidExpiryDate,
  handleChangeExpiryDate,
  goToOrderConfirmationScreen,
}) {
  const handleValidation = () => {
    if (cardNumber.length !== 16 || !isNumeric(cardNumber)) {
      Alert.alert(
        "Invalid Card Number",
        "Please enter a valid 16-digit card number."
      );
      return;
    }

    if (expiryDate.length !== 5 || !isValidExpiryDate(expiryDate)) {
      Alert.alert(
        "Invalid Expiry Date",
        "Please enter a valid expiry date in the format MM/YY."
      );
      return;
    }

    if (cvv.length !== 3 || !isNumeric(cvv)) {
      Alert.alert("Invalid CVV", "Please enter a valid 3-digit CVV.");
      return;
    }

    // The paymet details are valid, navigate to Order Confirmation Screen
    goToOrderConfirmationScreen();
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <SafeAreaView style={styles.container}>
        <GoBackButton onPress={goBack} />
        <Text variant="h3" style={styles.headerText}>
          Payment
        </Text>
        <View style={styles.mainContainer}>
          <Stack m={3} spacing={15}>
            <TextInput
              label="Card Number"
              variant="outlined"
              value={cardNumber}
              onChangeText={setCardNumber}
              keyboardType="numeric"
              maxLength={16}
              autoCapitalize="none"
            />
            <TextInput
              label="Expiry Date (MM/YY)"
              variant="outlined"
              value={expiryDate}
              onChangeText={handleChangeExpiryDate}
              keyboardType="numeric"
              maxLength={5}
              autoCapitalize="none"
            />
            <TextInput
              label="CVV"
              variant="outlined"
              value={cvv}
              onChangeText={setCvv}
              keyboardType="numeric"
              maxLength={3}
              autoCapitalize="none"
            />
          </Stack>
          <View>
            <Divider color="lightgrey" />
            <View style={styles.totalContainer}>
              <Text style={styles.totalText}>YOUR TOTAL</Text>
              <Text style={styles.totalAmountText}>{totalAmount}TL</Text>
            </View>

            <Button
              title="Purchase"
              mode="contained"
              color="#5a66ff"
              tintColor="white"
              onPress={handleValidation}
              style={styles.button}
            />
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
