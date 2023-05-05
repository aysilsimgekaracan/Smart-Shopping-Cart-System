import { useState, useEffect } from "react"
import { SignUpContainer } from "../../containers"
import { useNavigation } from "@react-navigation/native"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "@Configs/firebaseConfig"

export function SignUpScreen() {
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

    const signUp = () => {
        createUserWithEmailAndPassword(auth, email, password)
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
        <SignUpContainer
            error={error}
            setEmail={setEmail}
            setPassword={setPassword}
            navigateToSignIn={() => navigation.navigate("SignIn")}
            signUp={signUp} />
    )
}