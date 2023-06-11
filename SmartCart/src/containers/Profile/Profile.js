import { View, SafeAreaView, ActivityIndicator } from "react-native";
import { Button, Text, ListItem } from "@react-native-material/core";
import styles from "./style";
import { Ionicons } from "@expo/vector-icons";

export function ProfileContainer({
  handleSignOut,
  user,
  navigateToOrdersScreen,
}) {
  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <Text variant="h3" style={styles.headerText}>
        Profile
      </Text>
      {user == null ? (
        <ActivityIndicator />
      ) : (
        <View style={styles.container}>
          <Text style={styles.welcomeText}>Hi, {user.currentUser.email}!</Text>
          <ListItem
            title="Orders"
            leading={<Ionicons name="basket-outline" size={24} color="black" />}
            trailing={(props) => (
              <Ionicons name="arrow-forward-outline" size={24} color="black" />
            )}
            onPress={navigateToOrdersScreen}
          />
          <Button title="Sign Out" color="error" onPress={handleSignOut} />
        </View>
      )}
    </SafeAreaView>
  );
}
