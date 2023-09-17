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
import { doctors } from "../constants/data";
import { Avatar } from "react-native-paper";
import SquareMenuButton from "../components/SquareMenuButton";
import { Entypo } from "@expo/vector-icons";
import Menu from "../components/Menu";

const DepartmentParticularScreen = ({ route, navigation }) => {
  const [visible, setVisible] = useState(false);
  const closeMenu = () => {
    setVisible(false);
  };
// Navigating to the doctor details screen
  const navigateTo = (item) => {
    navigation.navigate("DoctorDetails", {
      doctor: item,
    });
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
            <SquareMenuButton onPress={() => setVisible(!visible)} color={"#fff"} />
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
              {route?.params?.department}
            </Text>
            <View style={{ height: "7%" }} />
          </View>
          <View
            style={{
              borderWidth: 1,
              borderTopLeftRadius: 70,
              borderColor: colors.textColor,
              flex: 2,
              backgroundColor: colors.backgroundColor
            }}
          >
            <View style={{ height: "10%" }} />
            <View style={{ flex: 1, alignItems: "center" }}>
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ width: "85%" }}
              >
                {doctors.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={{
                      width: "100%",
                      backgroundColor: colors.mainColor,
                      borderRadius: 12,
                      marginBottom: 15,
                      flexDirection: "row",
                      height: 100,
                      elevation: 5,
                      alignItems: "center",
                      justifyContent: "center",
                      borderWidth: 1,
                    }}
                    onPress={() => navigateTo(item)}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: 7,
                        gap: 7,

                      }}
                    >
                      <Avatar.Icon
                        icon={"doctor"}
                        style={{
                          backgroundColor: "transparent",
                        }}
                      />
                      <View
                        style={{
                          flex: 1,
                          flexDirection: "column",
                        }}
                      >
                        <View>
                          <Text style={{ fontSize: 20, fontWeight: "bold", color: colors.backgroundColor }}>
                            {item.name}
                          </Text>
                          <Text style={{ fontSize: 14, fontWeight: "400", color: colors.backgroundColor }}>
                            {item.specialist}
                          </Text>
                        </View>
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <Text style={{ fontSize: 18, color: colors.backgroundColor }}>
                            5
                            <Entypo name="star" color="white" size={18} />
                          </Text>
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                          >
                            <View
                              style={{
                                height: 15,
                                width: 15,
                                backgroundColor: "white",
                                borderRadius: 100,
                                marginRight: 5,
                              }}
                            />
                            <Text style={{ color: colors.backgroundColor }}>10:00AM - 3:00PM</Text>
                          </View>
                        </View>
                      </View>
                    </View>
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

export default DepartmentParticularScreen;

const styles = StyleSheet.create({
  heading: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    alignItems: "center",
  },

});
