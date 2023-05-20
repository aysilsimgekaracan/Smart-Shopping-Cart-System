import React, { useState, useEffect } from "react";
import { ProfileContainer } from "../../containers";
import { useNavigation } from "@react-navigation/native";
import { getAuth } from "firebase/auth";

export function ProfileScreen() {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);

  const auth = getAuth();

  useEffect(() => {
    if (auth.currentUser != null) {
      setUser(auth);
    } else {
      setUser(null);
    }
  }, []);

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("SignIn");
      })
      .catch((error) => alert(error.message));
  };

  const navigateToOrdersScreen = () => {
    navigation.navigate("Orders", { userId: user.currentUser.uid });
  };

  return (
    <ProfileContainer
      handleSignOut={handleSignOut}
      user={user}
      navigateToOrdersScreen={navigateToOrdersScreen}
    />
  );
}
