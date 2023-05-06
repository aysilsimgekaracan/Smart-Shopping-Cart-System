import React from "react"
import { ProfileContainer } from "../../containers"
import { auth } from "@Configs/firebaseConfig"
import { useNavigation } from "@react-navigation/native"


export function ProfileScreen() {
    const navigation = useNavigation()

    const handleSignOut = () => {
        auth.signOut()
            .then(() => {
                navigation.replace("SignIn")
            })
            .catch((error) => alert(error.message))
    }

    return (
        <ProfileContainer handleSignOut={handleSignOut} />
    )
}