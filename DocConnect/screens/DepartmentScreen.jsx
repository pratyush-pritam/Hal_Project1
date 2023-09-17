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
      <View style={{ ...defaultStyle, padding: 0, backgroundColor: colors.mainColor }}>
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
            {visible && (
              <View style={styles.menu}>
                <Text style={styles.boxTitle}>Help</Text>
                <Text style={styles.boxTitle}>Contact Us</Text>
              </View>
            )}
          </View>
          <View style={{ height: "7%" }} />
          <View style={{ marginBottom: 10 }}>
            <Text
              style={{
                paddingHorizontal: 25,
                fontSize: 30,
                fontWeight: "bold",
                color: colors.backgroundColor
              }}
            >
              Departments
            </Text>
          </View>
          <View
            style={{
              borderWidth: 1,
              borderTopLeftRadius: 100,
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
                      borderRadius: 12,
                      marginBottom: 15,
                      flexDirection: "row",
                      height: 60,
                      elevation: 5,
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

export default DepartmentScreen;

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
