import { useState } from "react"
import { SignInContainer } from "../../containers"
import { useNavigation } from "@react-navigation/native"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"

export function SignInScreen() {
    const navigation = useNavigation()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)

    const auth = getAuth()

    const signIn = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                setError(null)
                const user = userCredential.user
                console.log(user)
                navigation.navigate("HomeStack")
            })
            .catch((error) => {
                // const errorCode = error.code
                const errorMessage = error.message
                setError(errorMessage)
            })
    }

    return (
        <SignInContainer
            error={error}
            setEmail={setEmail}
            setPassword={setPassword}
            navigateToSignUp={() => navigation.navigate("SignUp")}
            signIn={signIn}
        />
    )
}