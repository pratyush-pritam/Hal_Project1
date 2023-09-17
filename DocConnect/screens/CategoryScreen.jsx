import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useState } from "react";
import { defaultStyle, colors } from "../constants/styles";
import { allCategories } from "../constants/data";
import { Avatar } from "react-native-paper";
import SquareMenuButton from "../components/SquareMenuButton";
import { StatusBar } from "expo-status-bar";
import Menu from "../components/Menu";

const CategoryScreen = ({ navigation }) => {
  const [visible, setVisible] = useState(false);
  const closeMenu = () => {
    setVisible(false);
  };
  const navigateTo = (item) => {
    navigation.navigate(item.split(" ")[0]);
  };
  return (
    <TouchableWithoutFeedback onPress={closeMenu}>
      <View style={{ ...defaultStyle, padding: 0, backgroundColor: colors.headingColor }}>
        <View
          style={{
            flex: 1,
            position: "relative",
          }}
        >
          <View style={styles.heading}>
            <TouchableOpacity onPress={() => navigation.navigate("Home")}>
              <Avatar.Icon
                icon={"arrow-left"}
                style={{
                  backgroundColor: "transparent",
                  resizeMode: "contain",
                }}
                color={colors.backgroundColor}
              />
            </TouchableOpacity>
            <SquareMenuButton onPress={() => setVisible(!visible)} color={"#ffff"} />
            {visible && <Menu />}
          </View>
          <View style={{ marginBottom: 10 }}>
            <Text
              style={{
                paddingHorizontal: 25,
                fontSize: 35,
                fontWeight: "bold",
                color: colors.backgroundColor,
                textAlign: "center",
              }}
            >
              Categories
            </Text>
            <View style={{ height: "7%" }} />
          </View>
          <View
            style={{
              borderWidth: 1,
              borderTopLeftRadius: 70,
              borderColor: colors.textColor,
              flex: 2,
              backgroundColor: colors.backgroundColor,
            }}
          >
            <View style={{ height: "10%", }} />
            <View style={{ flex: 1, alignItems: "center" }}>
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ width: "85%" }}
              >
                {allCategories.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={{
                      width: "100%",
                      backgroundColor: colors.mainColor,
                      borderRadius: 12,
                      marginBottom: 15,
                      flexDirection: "row",
                      height: 60,
                      elevation: 4,
                      alignItems: "center",
                      justifyContent: "center",
                      borderWidth: 1,
                    }}
                    onPress={() => navigateTo(item)}
                  >
                    <Text style={{ textAlign: "center", fontSize: 20, color: colors.backgroundColor }}>
                      {item}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CategoryScreen;

const styles = StyleSheet.create({
  heading: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    alignItems: "center",
  },

});
