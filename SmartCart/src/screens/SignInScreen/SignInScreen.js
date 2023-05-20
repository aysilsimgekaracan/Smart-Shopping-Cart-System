import { useState, useEffect } from "react";
import { SignInContainer } from "../../containers";
import { useNavigation } from "@react-navigation/native";
import { auth } from "@Configs/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

export function SignInScreen() {
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
      "auth/invalid-email": "Invalid email address.",
      "auth/user-disabled": "User account has been disabled.",
      "auth/user-not-found": "User not found.",
      "auth/wrong-password": "Invalid password.",
      // Add more error code mappings for signInWithEmailAndPassword
      "auth/operation-not-allowed": "Sign-in method is not enabled.",
      "auth/too-many-requests":
        "Too many unsuccessful login attempts. Please try again later.",
      // Add more error code mappings as needed
    };

    // Check if the error code has a mapped message
    if (error.code in errorMessages) {
      return errorMessages[error.code];
    }

    // Return the default error message if no mapping is found
    return "An error occurred. Please try again later.";
  }

  const signIn = () => {
    signInWithEmailAndPassword(auth, email, password)
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
    <SignInContainer
      error={error}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      navigateToSignUp={() => navigation.navigate("SignUp")}
      signIn={signIn}
    />
  );
}
