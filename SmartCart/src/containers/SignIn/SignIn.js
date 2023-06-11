import {
  View,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from "react-native";
import styles from "./style";
import {
  Text,
  Stack,
  TextInput,
  Button,
  Divider,
} from "@react-native-material/core";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";

export function SignInContainer({
  error,
  setEmail,
  setPassword,
  navigateToSignUp,
  signIn,
  email,
  password,
}) {
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <SafeAreaView style={styles.container}>
          <View style={styles.contentContainer}>
            <FontAwesome name="opencart" size={100} color="black" />
            <Text variant="h3" style={styles.appText}>
              Smart Shopping Cart
            </Text>
            <Stack m={4} spacing={10}>
              <TextInput
                label="Email"
                variant="outlined"
                style={styles.textInput}
                textContentType="emailAddress"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
              />
              <TextInput
                label="Password"
                variant="outlined"
                style={styles.textInput}
                secureTextEntry
                onChangeText={setPassword}
                value={password}
                autoCapitalize="none"
              />
              <Button
                title="Sign In"
                style={styles.signInButton}
                onPress={signIn}
              />
              {error != null && (
                <Text variant="body1" style={styles.errorText}>
                  {error}
                </Text>
              )}
            </Stack>
            <View>
              <Divider inset={1} color="lightgrey" style={styles.divider} />
              <Text style={styles.signUpText}>Need an account?</Text>
              <Button
                variant="text"
                title="SIGN UP"
                onPress={navigateToSignUp}
              />
            </View>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
