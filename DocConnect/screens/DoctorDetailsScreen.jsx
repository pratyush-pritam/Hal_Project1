import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { colors, defaultStyle } from "../constants/styles";
import { Avatar } from "react-native-paper";
import firestore from "@react-native-firebase/firestore";
import { StatusBar } from "expo-status-bar";
const DoctorDetailsScreen = ({ route, navigation }) => {
  const [doctor, setDoctor] = useState(route?.params?.doctor);


  //Fetching the data from the firestore
  const getData = async () => {
    const dr = await firestore().collection("Doctors_SUM").get();
    const drData = dr.docs.map((doc) => doc.data().designation);
    console.log(drData);
  }
  getData();

  console.log({ doctor })


  return (
    <View style={{ ...defaultStyle, padding: 0 }}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          backgroundColor: colors.backgroundColor,
        }}
      >
        <StatusBar style="dark" />
        <Avatar.Icon
          icon={"arrow-left"}
          style={{
            backgroundColor: colors.backgroundColor,
            resizeMode: "contain",
          }}
          color={colors.secondaryColor}
        />
      </TouchableOpacity>
      <View
        style={{
          paddingHorizontal: 15,
          flex: 1,
          justifyContent: "space-around",
          alignItems: "center",
          gap: 25,
        }}
      >
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Avatar.Image
            size={150}
            source={{
              uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX4wVGjMQ37PaO4PdUVEAliSLi8-c2gJ1zvQ&usqp=CAU",
            }}
            color={colors.backgroundColor}
          />
          <Text style={{ fontSize: 30, fontWeight: "800" }}>{doctor.name}</Text>
          <Text style={{ fontSize: 19, fontWeight: "300" }}>
            {doctor.specialist}
          </Text>
        </View>
        <View>
          <Text
            style={{ fontSize: 25, textAlign: "center", fontWeight: "400" }}
          >
            {doctor.details}
          </Text>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: colors.mainColor,
            paddingHorizontal: 25,
            paddingVertical: 15,
            borderRadius: 10,
            width: "100%",
          }}
          onPress={() => navigation.navigate("Booking", { doctor })}
        >
          <Text style={{ color: "#ffffff", textAlign: "center", fontSize: 19 }}>
            Book
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DoctorDetailsScreen;

const styles = StyleSheet.create({});
