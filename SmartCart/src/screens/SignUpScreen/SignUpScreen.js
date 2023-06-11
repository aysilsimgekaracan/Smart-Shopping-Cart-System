import { useState, useEffect } from "react";
import { SignUpContainer } from "../../containers";
import { useNavigation } from "@react-navigation/native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@Configs/firebaseConfig";

export function SignUpScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate("HomeStack");
      }
    });

    return unsubscribe;
  }, []);

  function formatFirebaseErrorMessage(error) {
    // Map Firebase error codes to user-friendly messages
    const errorMessages = {
      "auth/email-already-in-use": "Email is already in use.",
      "auth/invalid-email": "Invalid email address.",
      "auth/operation-not-allowed": "Sign-up is not allowed.",
      "auth/weak-password": "Password is too weak.",
      "auth/missing-email": "Email is missing.",
      "auth/user-disabled":
        "The user account has been disabled. Please contact support for assistance.",
      "auth/too-many-requests":
        "Too many sign-up requests. Please try again later.",
      "auth/invalid-credential": "The credential is invalid.",
      // Add more error code mappings for createUserWithEmailAndPassword
    };

    // Check if the error code has a mapped message
    if (error.code in errorMessages) {
      return errorMessages[error.code];
    }

    // Return the default error message if no mapping is found
    return "An error occurred. Please try again later.";
  }

  const signUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        // Signed in
        setError(null);
        // const user = userCredential.user
        // console.log(user)
      })
      .catch((error) => {
        // const errorCode = error.code
        const errorMessage = formatFirebaseErrorMessage(error);
        setError(errorMessage);
      });
  };

  return (
    <SignUpContainer
      error={error}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      navigateToSignIn={() => navigation.navigate("SignIn")}
      signUp={signUp}
    />
  );
}
