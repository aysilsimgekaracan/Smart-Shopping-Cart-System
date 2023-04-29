import React from "react"
import { SignInContainer } from "../../containers"
import { useNavigation } from "@react-navigation/native"

export function SignInScreen() {
    const navigation = useNavigation()

    return (
        <SignInContainer navigateToSignUp={() => navigation.navigate("SignUp")} />
    )
}