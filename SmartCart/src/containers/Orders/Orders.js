import {
  SafeAreaView,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator,
  ScrollView,
  View,
} from "react-native";
import styles from "./style";
import { GoBackButton } from "@Components/index";
import { Text, ListItem } from "@react-native-material/core";

export function OrdersContainer({
  goBack,
  orders,
  loading,
  goToOrdersDetailScreen,
}) {
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <SafeAreaView style={styles.container}>
        <GoBackButton onPress={goBack} />
        <Text variant="h3" style={styles.headerText}>
          Orders
        </Text>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <ScrollView>
            {orders.map((order) => (
              <ListItem
                key={order.id}
                secondaryText={`Order ID: ${order.id}`}
                title={`Date: ${new Date(
                  order.createdDate.toDate()
                ).toLocaleString()}`}
                // Add other desired order details
                overline="ORDER"
                meta={`${order.totalAmount} TL`}
                onPress={() => {
                  goToOrdersDetailScreen(order.id);
                }}
              />
            ))}
          </ScrollView>
        )}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
