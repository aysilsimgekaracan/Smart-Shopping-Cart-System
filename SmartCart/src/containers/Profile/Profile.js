import { Text, View } from "react-native"
import { Button } from "@react-native-material/core";
import styles from "./style"

export function ProfileContainer({ handleSignOut }) {
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text>This is the profile page</Text>
            <Button title="Sign Out" color="error" onPress={handleSignOut} />
        </View>
    )
}