import styles from "./style";
import { ListItem, Text, Avatar } from "@react-native-material/core";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const data = [
  {
    id: "1",
    color: ["#5B247A", "#1BCEDF"],
    description: "Swipe for the instructions",
  },
  {
    id: "2",
    color: ["#184E68", "#57CA85"],
    description:
      "Go to Cart Page and start shopping by putting items to your cart.",
  },
  {
    id: "3",
    color: ["#F7B733", "#FC4A1A"],
    description:
      "Check the cart screen periodically to keep track of the items you have selected and their prices.",
  },
  {
    id: "4",
    color: ["#FC4A1A", "#F7B733"],
    description:
      "When you have finished shopping, proceed to the payment screen to complete your purchase.",
  },
  {
    id: "5",
    color: ["#5B247A", "#1BCEDF"],
    description: "Review your order details and enter your payment details.",
  },
  {
    id: "6",
    color: ["#184E68", "#57CA85"],
    description:
      "Once your payment has been processed, you will receive an order confirmation screen with a summary of your purchase.",
  },
  {
    id: "7",
    color: ["#F7B733", "#FC4A1A"],
    description: "Collect your items from the cart and exit the store.",
  },
  {
    id: "8",
    color: ["#5B247A", "#1BCEDF"],
    description:
      "Here are the things you need to do, it's that easy. Let's start shopping now!",
  },
];

export function HomeContainer({ products }) {
  const renderItem = ({ item }) => (
    <LinearGradient style={styles.itemContainer} colors={item.color}>
      <Text style={styles.itemText}>{item.description}</Text>
    </LinearGradient>
  );

  return (
    <SafeAreaView>
      <Text variant="h3" style={styles.headerText}>
        Home
      </Text>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        <FlatList
          horizontal
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          showsHorizontalScrollIndicator={false}
        />
        <>
          <Text style={styles.productsText}>Products</Text>
          {products.map((product) => {
            return (
              <ListItem
                leadingMode="image"
                leading={<Avatar image={{ uri: product.image }} />}
                key={product.id}
                title={product.name}
                secondaryText={product.description}
                trailing={(props) => (
                  <Text variant="caption" {...props} style={{ fontSize: 10 }}>
                    {product.price}TL
                  </Text>
                )}
              />
            );
          })}
        </>
      </ScrollView>
    </SafeAreaView>
  );
}
