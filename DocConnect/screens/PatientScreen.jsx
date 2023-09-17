import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { colors, defaultStyle } from "../constants/styles";
import Tab from "../components/Tab";
import { Avatar } from "react-native-paper";

const arr = ["You", 1, 2, 3];
const PatientScreen = ({ navigation, route }) => {
  return (
    <View style={{ ...defaultStyle, padding: 0 }}>
      <View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>

            <Avatar.Icon
              icon={"arrow-left"}
              style={{
                backgroundColor: colors.backgroundColor,
                resizeMode: "contain",
              }}
              color={colors.textColor}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 25,
              fontWeight: "bold",
              textAlign: "center",
              flex: 1,
            }}
          >
            Patient Information
          </Text>
        </View>
        <View style={{ paddingHorizontal: 15 }}>
          <Text style={{ fontSize: 22, fontWeight: "bold" }}>Saved People</Text>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
              marginTop: 10,
            }}
          >
            {arr.map((item, index) => {
              return (
                <View
                  key={index}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingVertical: 10,
                    justifyContent: "center",
                  }}
                >
                  <Tab text={item} />
                </View>
              );
            })}
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: colors.mainColor,
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderRadius: 10,
              marginTop: 25,
            }}
            onPress={() => navigation.navigate("UpdateSaved")}
          >
            <Text
              style={{
                fontSize: 22,
                fontWeight: "bold",
                textAlign: "center",
                color: "#fff",
              }}
            >
              Add New
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: colors.mainColor,
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderRadius: 10,
              marginTop: 25,
            }}
            onPress={() => navigation.navigate("FinalBooking", { doctor: route.params.doctor })}
          >
            <Text
              style={{
                fontSize: 22,
                fontWeight: "bold",
                textAlign: "center",
                color: "#fff",
              }}
            >
              Book
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default PatientScreen;

const styles = StyleSheet.create({});
