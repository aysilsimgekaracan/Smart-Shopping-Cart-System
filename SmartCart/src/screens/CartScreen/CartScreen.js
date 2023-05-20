import { useState, useEffect } from "react";
import { CartContainer } from "../../containers";
import { useNavigation } from "@react-navigation/native";
import { db } from "@Configs/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { useIsFocused } from "@react-navigation/native";

export function CartScreen() {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const [isOpened, setIsOpened] = useState(false);
  const [response, setResponse] = useState(null);
  const isFocused = useIsFocused();
  const SECOND_MS = 10000;

  useEffect(() => {
    async function getProducts() {
      const productsCollection = collection(db, "products");
      const querySnapshot = await getDocs(productsCollection);
      const productsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setProducts(productsData);
    }

    getProducts();
  }, []);

  const getProduct = (className) => {
    return products.find((item) => item.id === className);
  };

  const goToCartDetailScreen = (itemsInCart) => {
    const serializedItemsInCart = {};
    itemsInCart.map((item) => {
      let itemClass = item.class;
      if (serializedItemsInCart.hasOwnProperty(itemClass)) {
        serializedItemsInCart[itemClass] = serializedItemsInCart.itemClass + 1;
      } else {
        serializedItemsInCart[itemClass] = 1;
      }
    });

    console.log(serializedItemsInCart);

    navigation.navigate("CartDetail", { itemsInCart: serializedItemsInCart });
  };

  return (
    <CartContainer
      goToCartDetailScreen={goToCartDetailScreen}
      products={products}
      getProduct={getProduct}
      isOpened={isOpened}
      setIsOpened={setIsOpened}
      response={response}
      setResponse={setResponse}
      isFocused={isFocused}
      SECOND_MS={SECOND_MS}
    />
  );
}
