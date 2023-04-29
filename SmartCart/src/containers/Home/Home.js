import { StyleSheet, Text, View } from 'react-native';
import styles from "./style"

export function HomeContainer() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>This is the home page</Text>
    </View>
  );
}