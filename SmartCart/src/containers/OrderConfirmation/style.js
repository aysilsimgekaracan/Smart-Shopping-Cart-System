import { StyleSheet } from "react-native";
import { StyleVariables } from "@Styles/index";

export default StyleSheet.create({
  container: {
    flex: 1,
    width: StyleVariables.width * 0.9,
    justifyContent: "space-evenly",
    alignItems: "center",
    alignSelf: "center",
  },
  headerText: {
    fontFamily: "robotoBold",
  },

  button: {
    width: StyleVariables.width * 0.8,
    height: 40,
    textAlign: "center",
  },
});
