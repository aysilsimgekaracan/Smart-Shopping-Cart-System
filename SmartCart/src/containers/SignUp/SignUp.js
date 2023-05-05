import { View } from 'react-native'
import styles from "./style"
import { Text, Stack, TextInput, Button, Divider } from "@react-native-material/core"
import { SafeAreaView } from "react-native-safe-area-context"
import { FontAwesome } from '@expo/vector-icons'

export function SignUpContainer({ error, setEmail, setPassword, navigateToSignIn, signUp }) {
  return (
    <SafeAreaView style={styles.container}>

      <Text variant='h3' style={styles.headerText} >Sign Up</Text>
      <View style={styles.contentContainer}>
        <FontAwesome name="opencart" size={100} color="black" />
        <Text variant='h3' style={styles.appText} >Smart Shopping Cart</Text>
        <Stack m={4} spacing={10}>
          <TextInput
            label="Email"
            variant="outlined"
            style={styles.textInput}
            textContentType="emailAddress"
            onChangeText={setEmail}
          />
          <TextInput
            label="Password"
            variant="outlined"
            style={styles.textInput}
            secureTextEntry
            onChangeText={setPassword}
          />
          <Button title="Sign Up" style={styles.signInButton} onPress={signUp} />
          {error != null && (
            <Text variant='body1' style={styles.errorText}>{error}</Text>
          )}
        </Stack>
        <View>

          <Divider inset={1} color='lightgrey' style={styles.divider} />
          <Text style={styles.signUpText}  >Already have an account?</Text>
          <Button variant="text" title="SIGN IN" onPress={navigateToSignIn} />

        </View>

      </View>

    </SafeAreaView>
  )
}