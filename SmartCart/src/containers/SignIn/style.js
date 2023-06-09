import { StyleSheet } from "react-native";
import { StyleVariables } from "@Styles/index";

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  headerText: {
    fontFamily: "robotoBold",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  appText: {
    fontFamily: "robotoMedium",
    textAlign: "center",
    paddingTop: 30,
  },
  textInput: {
    width: StyleVariables.width * 0.9,
    fontFamily: "robotoRegular",
  },
  signInButton: {
    width: StyleVariables.width * 0.9,
    fontFamily: "robotoRegular",
  },
  divider: {
    marginVertical: StyleVariables.height * 0.05,
    fontFamily: "robotoRegular",
  },
  signUpText: { fontFamily: "robotoRegular" },
  errorText: {
    color: "red",
  },
});
