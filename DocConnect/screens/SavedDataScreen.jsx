import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { colors, defaultStyle, inputOptions } from "../constants/styles";
import { Avatar, TextInput } from "react-native-paper";
import Loader from "../components/Loader";
import LinearGradient from "react-native-linear-gradient";
import firestore from "@react-native-firebase/firestore";
import Toast from "react-native-toast-message";

const UpdateSavedScreen = ({ navigation }) => {
  const [userCredentials, setUserCredentials] = useState({
    name: "",
    email: "",
    avatar: null,
    mobile: "",
    adhar: "",
    age: "",
    occupation: "",
  });

  const {
    name,
    email,
    mobile,
    adhar,
    age,
    occupation,
  } = userCredentials;

  const [loading, setLoading] = useState(false);//TODO
  const handleSubmit = async () => {
    // make api call to store the realtives of the user in the database
    setLoading(true)
    await firestore().collection("User_Family").add({
      username: name,
      email: email,
      mobile: mobile,
      adhar: adhar,
      age: age,
      occupation: occupation,
    })
    setLoading(false)
    Toast.show({
      type: "success",
      text1: "Data Uploaded Successfully!!",
    });
  };

  return (
    <LinearGradient
      colors={[colors.mainColor, "#f5f8f8"]}
      style={{ ...defaultStyle, padding: 0, backgroundColor: colors.mainColor }}>
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
      <View>
        <Text
          style={{
            fontSize: 35,
            fontWeight: "500",
            textAlign: "center",
            color: colors.backgroundColor,
            marginBottom: 25,
          }}
        >
          Details
        </Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          padding: 20,
          borderRadius: 10,
          borderTopLeftRadius: 70,
          borderWidth: 1,
          backgroundColor: colors.backgroundColor
        }}
      >
        <View style={{ height: "10%" }} />
        <View style={{ gap: 10 }}>
          <TextInput
            {...inputOptions}
            value={userCredentials.name}
            onChangeText={(val) =>
              setUserCredentials({ ...userCredentials, name: val })
            }
            label={"Name"}
          />
          <TextInput
            {...inputOptions}
            keyboardType="email-address"
            value={userCredentials.email}
            onChangeText={(val) =>
              setUserCredentials({ ...userCredentials, email: val })
            }
            autoCapitalize="none"
            label={"Email"}
          />
          <TextInput
            {...inputOptions}
            label="Age"
            value={userCredentials.age}
            onChangeText={(val) =>
              setUserCredentials({ ...userCredentials, age: val })
            }
            keyboardType="number-pad"
          />

          <TextInput
            {...inputOptions}
            label="Occupation"
            value={userCredentials.occupation}
            onChangeText={(val) =>
              setUserCredentials({ ...userCredentials, occupation: val })
            }
          />
          <TextInput
            {...inputOptions}
            label="Adhar Number"
            value={userCredentials.adhar}
            onChangeText={(val) =>
              setUserCredentials({ ...userCredentials, adhar: val })
            }
            keyboardType="number-pad"
            maxLength={12}
          />

          <TextInput
            {...inputOptions}
            label="Mobile Number"
            value={userCredentials.mobile}
            onChangeText={(val) =>
              setUserCredentials({ ...userCredentials, mobile: val })
            }
            keyboardType="number-pad"
            maxLength={10}
          />
          <TouchableOpacity
            style={styles.btn}
            onPress={handleSubmit}
            activeOpacity={0.7}
          >
            {loading ? (
              <Loader height={25} width={25} />
            ) : (
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 400,
                  color: "#FFFFFF",
                }}
              >
                Save
              </Text>
            )}
          </TouchableOpacity>
        </View>
        <View style={{ marginBottom: 80 }} />
      </ScrollView>
    </LinearGradient>
  );
};

export default UpdateSavedScreen;
const styles = StyleSheet.create({
  btn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    padding: 12,
    backgroundColor: colors.mainColor,
    width: "100%",
    gap: 5,
    alignSelf: "center",
    borderRadius: colors.br,
    marginTop: 10,
  },
});
