import { useState, useEffect } from "react"
import { SignInContainer } from "../../containers"
import { useNavigation } from "@react-navigation/native"
import { auth } from "@Configs/firebaseConfig"
import { signInWithEmailAndPassword } from "firebase/auth"

export function SignInScreen() {
    const navigation = useNavigation()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)


    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                navigation.navigate("HomeStack")
            }
        })

        return unsubscribe
    }, [])


    const signIn = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                // Signed in 
                setError(null)
                // const user = userCredential.user
                // console.log(user)
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