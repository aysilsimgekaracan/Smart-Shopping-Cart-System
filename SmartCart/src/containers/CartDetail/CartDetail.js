import { SafeAreaView, ScrollView, View } from "react-native";
import styles from "./style";
import { GoBackButton } from "@Components/index";
import {
  Text,
  ListItem,
  Avatar,
  Divider,
  Button,
} from "@react-native-material/core";
import { MaterialIcons } from "@expo/vector-icons";

export function CartDetailContainer({
  goBack,
  goToPaymentScreen,
  products,
  itemsInCart,
  totalAmount,
}) {
  return (
    <SafeAreaView style={styles.container}>
      <GoBackButton onPress={goBack} />
      <Text variant="h3" style={styles.headerText}>
        Items In Cart
      </Text>

      {products.lenght == 0 ? (
        <Text>Loading products</Text>
      ) : itemsInCart.lenght == 0 ? (
        <Text style={styles.emptyCartText}>
          Your Cart is Empty. Continue Shopping!
        </Text>
      ) : (
        <View style={styles.contentContainer}>
          <ScrollView>
            {products.map((product) => {
              return (
                <ListItem
                  leadingMode="image"
                  leading={<Avatar image={{ uri: product.image }} />}
                  key={product.id}
                  title={product.name}
                  secondaryText={
                    (product.price * product.count).toString() + " TL"
                  }
                  trailing={(props) => (
                    <Text variant="caption" {...props} style={styles.countText}>
                      {product.count}
                    </Text>
                  )}
                />
              );
            })}
          </ScrollView>
          <View>
            <Divider color="lightgrey" />
            <View style={styles.totalContainer}>
              <Text style={styles.totalText}>YOUR TOTAL</Text>
              <Text style={styles.totalAmountText}>{totalAmount}TL</Text>
            </View>

            <Button
              title="Purchase"
              leading={(props) => (
                <MaterialIcons name="payment" size={24} color="white" />
              )}
              onPress={goToPaymentScreen}
              disabled={totalAmount == 0}
            />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}
