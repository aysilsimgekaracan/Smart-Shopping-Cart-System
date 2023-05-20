import {
  SafeAreaView,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import styles from "./style";
import { GoBackButton } from "@Components/index";
import { Text, ListItem, Avatar } from "@react-native-material/core";

export function OrderDetailsContainer({
  goBack,
  loading,
  orderDetails,
  orderId,
}) {
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <SafeAreaView style={styles.container}>
        <GoBackButton onPress={goBack} />
        <Text variant="h3" style={styles.headerText}>
          Order Detail
        </Text>
        <Text variant="h6" style={styles.orderIdText}>
          Order ID: {orderId}
        </Text>

        {loading ? (
          <ActivityIndicator />
        ) : (
          orderDetails.length > 0 && (
            <ScrollView>
              <Text variant="h6" style={styles.productsText}>
                Purchased Items
              </Text>
              {orderDetails.map((order) => (
                <ListItem
                  key={order.product_id}
                  secondaryText={`Count: ${order.quantity}`}
                  title={order.product.name}
                  // Add other desired order details
                  overline="PRODUCT"
                  meta={`${order.product.price} TL`}
                  leadingMode="image"
                  leading={<Avatar image={{ uri: order.product.image }} />}
                />
              ))}
            </ScrollView>
          )
        )}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
