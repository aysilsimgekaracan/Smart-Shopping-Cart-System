import { useState, useEffect } from "react";
import { CartContainer } from "../../containers";
import { useNavigation } from "@react-navigation/native";
import { db } from "@Configs/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export function CartScreen() {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);

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

  const goToPaymentScreen = () => {
    navigation.navigate("Payment");
  };

  return (
    <CartContainer goToPaymentScreen={goToPaymentScreen} products={products} />
  );
}
