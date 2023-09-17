import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { defaultStyle, colors } from "../constants/styles";
import { Avatar } from "react-native-paper";
import SquareMenuButton from "../components/SquareMenuButton";
import Tab from "../components/Tab";
import { healthCategories } from "../constants/data";
import { Entypo } from "@expo/vector-icons";
import ChartComponent from "../components/ChartComponent";

const HospitalScreen = ({ navigation }) => {
  const [visible, setVisible] = useState(false);
  const closeMenu = () => {
    setVisible(false);
  };
  return (
    <TouchableWithoutFeedback onPress={closeMenu}>
      <View style={{ ...defaultStyle, padding: 0 }}>
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
                  backgroundColor: colors.backgroundColor,
                  resizeMode: "contain",
                }}
                color={colors.textColor}
              />
            </TouchableOpacity>
            <SquareMenuButton onPress={() => setVisible(!visible)} />
            {visible && (
              <View style={styles.menu}>
                <Text style={styles.boxTitle}>Help</Text>
                <Text style={styles.boxTitle}>Contact Us</Text>
              </View>
            )}
          </View>
          <View style={{ height: "12%" }} />
          <View style={{ marginBottom: 10, paddingLeft: 25 }}>
            <Text
              style={{
                fontSize: 30,
                fontWeight: "bold",
              }}
            >
              Apollo
            </Text>
            <View style={{ flexDirection: "row" }}>
              {[1, 2, 3, 4, 5].map((item) => (
                <Entypo key={item} name="star" size={24} color="black" />
              ))}
            </View>
          </View>
          <View
            style={{
              borderWidth: 1,
              borderTopLeftRadius: 100,
              borderColor: colors.textColor,
              flex: 1,
            }}
          >
            <View style={{ height: "10%" }} />
            <Text style={{ paddingLeft: 26, fontSize: 20, paddingBottom: 10 }}>
              Departments
            </Text>
            <View style={{ alignItems: "center" }}>
              <ScrollView
                showsHorizontalScrollIndicator={false}
                style={{ width: "90%" }}
                horizontal
                contentContainerStyle={{ gap: 10 }}
              >
                {healthCategories.map((item, index) => (
                  <Tab key={index} text={item} />
                ))}
              </ScrollView>
            </View>
            <Text
              style={{ paddingLeft: 26, fontSize: 20, paddingVertical: 10 }}
            >
              Maps
            </Text>
            <View style={{ flexDirection: "row", paddingLeft: 26, gap: 10 }}>
              <Tab text={"1"} />
              <Tab text={"2"} />
            </View>
            <ChartComponent />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default HospitalScreen;

const styles = StyleSheet.create({
  heading: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    alignItems: "center",
  },
  menu: {
    position: "absolute",
    top: 60,
    right: 25,
    zIndex: 1,
    backgroundColor: "#fff",
    borderRadius: 7,
    height: 70,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },
  boxTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.textColor,
    textAlign: "center",
  },
});
