import { StyleSheet, Platform, StatusBar } from "react-native";

export const colors = {
  primaryColor: "#2987b1",
  secondaryColor: "#6270DD",
  backgroundColor: "#f5f8f8",
  buttonColor: "#031d49",
  textColor: "#000000",
  br: 10,
  mainColor: "#094067",
  headingColor: "#094673",
};
export const defaultStyle = StyleSheet.create({
  paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  padding: 35,
  flex: 1,
  backgroundColor: colors.backgroundColor,
});
export const inputOptions = {
  style: inputStyling,
  mode: "outlined",
  activeOutlineColor: colors.mainColor,
};
export const inputStyling = {
  height: 50,
  backgroundColor: colors.backgroundColor,
  marginVertical: 10,
  marginHorizontal: 20,
};
