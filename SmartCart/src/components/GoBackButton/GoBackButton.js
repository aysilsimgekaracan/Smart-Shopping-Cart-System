import React from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export function GoBackButton({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <View style={styles.iconContainer}>
        <Ionicons name="ios-arrow-back-outline" size={24} color="black" />
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  button: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    borderColor: "#333333",
    borderWidth: 3,
    margin: 5,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
