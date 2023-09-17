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
import { healthCategories } from "../constants/data";
import { Avatar } from "react-native-paper";
import SquareMenuButton from "../components/SquareMenuButton";
import firestore from "@react-native-firebase/firestore";
import LinearGradient from "react-native-linear-gradient";
import Menu from "../components/Menu";

const DepartmentScreen = ({ navigation }) => {
  const [visible, setVisible] = useState(false);
  const closeMenu = () => {
    setVisible(false);
  };
  // Navigating to the particular department screen
  const navigateTo = (item) => {
    navigation.navigate("ParticularDepartment", {
      department: item,
    });
  };
//Fetching the data from the firestore
  const getData = async () => {
    const dr = await firestore().collection("Doctors_SUM").get();
    const drData = dr.docs.map((doc) => doc.data().department);
    console.log(drData);
  }
  getData();


  return (
    <TouchableWithoutFeedback onPress={closeMenu}>
      <LinearGradient
        colors={[colors.mainColor, "#f5f8f8"]}
        style={{ ...defaultStyle, padding: 0, backgroundColor: colors.headingColor }}>
        <View
          style={{
            flex: 1,
            position: "relative",
          }}
        >
          <View style={styles.heading}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
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
                textAlign: 'center'
              }}
            >
              Departments
            </Text>
            <View style={{ height: "7%" }} />
          </View>
          <View
            style={{
              // borderWidth: 1,
              borderTopLeftRadius: 70,
              borderColor: colors.textColor,
              flex: 2,
              backgroundColor: colors.backgroundColor
            }}
          >
            <View style={{ height: "10%" }} />
            <View style={{ flex: 1, alignItems: "center", }}>
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ width: "85%" }}
              >
                {healthCategories.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={{
                      width: "100%",
                      backgroundColor: colors.mainColor,
                      borderRadius: colors.br,
                      marginBottom: 15,
                      flexDirection: "row",
                      height: 60,
                      alignItems: "center",
                      justifyContent: "center",
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
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
};

export default DepartmentScreen;

const styles = StyleSheet.create({
  heading: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    alignItems: "center",
  },
});
