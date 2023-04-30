import { View } from 'react-native'
import styles from "./style"
import { Text, Stack, TextInput, Button, Divider } from "@react-native-material/core"
import { SafeAreaView } from "react-native-safe-area-context"
import { Foundation } from '@expo/vector-icons'

export function SignInContainer({ error, setEmail, setPassword, navigateToSignUp, signIn }) {
  return (
    <SafeAreaView style={styles.container}>

      <Text variant='h3' style={styles.headerText} >Sign In</Text>
      <View style={styles.contentContainer}>
        <Foundation name="shopping-cart" size={150} color="black" />
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
          <Button title="Sign In" style={styles.signInButton} onPress={signIn} />
          {error != null && (
            <Text variant='body1' style={styles.errorText}>{error}</Text>
          )}
        </Stack>
        <View>

          <Divider inset={1} color='lightgrey' style={styles.divider} />
          <Text style={styles.signUpText}>Need an account?</Text>
          <Button variant="text" title="SIGN UP" onPress={navigateToSignUp} />

        </View>

      </View>

    </SafeAreaView>
  )
}