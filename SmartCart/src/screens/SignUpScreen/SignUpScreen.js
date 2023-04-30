import { useState } from "react"
import { SignUpContainer } from "../../containers"
import { useNavigation } from "@react-navigation/native"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"

export function SignUpScreen() {
    const navigation = useNavigation()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)

    const auth = getAuth()

    const signUp = () => {
        createUserWithEmailAndPassword(auth, email, password)
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
        <SignUpContainer
            error={error}
            setEmail={setEmail}
            setPassword={setPassword}
            navigateToSignIn={() => navigation.navigate("SignIn")}
            signUp={signUp} />
    )
}