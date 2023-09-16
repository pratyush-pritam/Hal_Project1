import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import { colors, defaultStyle, inputOptions } from "../constants/styles";
import { Avatar, Button, TextInput } from "react-native-paper";
import { FontAwesome5 } from "@expo/vector-icons";
import auth from "@react-native-firebase/auth";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import Loader from "../components/Loader";
import firestore from "@react-native-firebase/firestore";

const RegisterScreen = ({ navigation, route }) => {
  const [loading, setLoading] = useState(false);
  const [userCredentials, setUserCredentials] = useState({
    name: "",
    email: "",
    avatar: null,
    password: "",
    mobile: "",
    adhar: "",
    age: "",
    occupation: "",
  });

  const {
    name,
    email,
    password,
    mobile,
    adhar,
    age,
    occupation,
  } = userCredentials;

  const disableBtn =
    !name || !email || !password || !mobile || !adhar || !age || !occupation;

  const saveData = async () => {
    await firestore().collection("users").doc(auth().currentUser.uid).set({
      id: auth().currentUser.uid,
      username: name,
      email: email,
      mobile: mobile,
      adhar: adhar,
      age: age,
      occupation: occupation,
    });
  };
  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (
        email.length > 0 &&
        password.length > 0 &&
        name.length > 0 &&
        mobile.length > 0 &&
        adhar.length > 0 &&
        age.length > 0 &&
        occupation.length > 0
        && password.length >= 6
        && adhar.length === 12
        && mobile.length === 10
      ) {
        const isSignedin = await auth().createUserWithEmailAndPassword(
          email,
          password
        );
        console.log(isSignedin, "isSignedin");
        Toast.show({
          type: "success",
          text1: "User Created Successfully!!",
        });
        navigation.navigate("Login", {
          email: isSignedin.user.email,
          uid: isSignedin.user.uid,
        });
        saveData();
      } else {
        Toast.show({
          type: "error",
          text1: "Please fill all the fields!",
        });
        setLoading(false);
      }
    } catch (error) {
      let errorMessage = "";
      if (error.code === "auth/email-already-in-use") {
        errorMessage = "That email address is already in use!";
      }
      if (error.code === "auth/invalid-email") {
        errorMessage = "Enter Valid email-address!";
      }
      if (error.code === "auth/invalid-password") {
        errorMessage = "Password should be atleast 6 characters!";
      }
      errorMessage &&
        Toast.show({
          type: "error",
          text1: errorMessage,
        });

      setLoading(false);
    }
  };
  useEffect(() => {
    if (route.params?.image)
      setUserCredentials({ ...userCredentials, avatar: route.params.image });
  }, [route.params]);
  return (
    <>
      <View style={defaultStyle}>
        <View style={{ height: "10%" }} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            borderRadius: colors.br,
            backgroundColor: colors.backgroundColor,
          }}
        >
          <View>
            <Avatar.Image
              style={{
                alignSelf: "center",
                backgroundColor: colors.buttonColor,
              }}
              size={90}
              source={{
                uri: userCredentials.avatar
                  ? userCredentials.avatar
                  : "https://p.kindpng.com/picc/s/451-4517876_default-profile-hd-png-download.png",
              }}
            />
            <TouchableOpacity onPress={() => navigation.navigate("Camera")}>
              <Button textColor={colors.textColor}>Change Photo</Button>
            </TouchableOpacity>

            <TextInput
              {...inputOptions}
              placeholder="Name"
              value={name}
              onChangeText={(val) =>
                setUserCredentials({ ...userCredentials, name: val })
              }
              maxLength={20}
            />

            <TextInput
              {...inputOptions}
              placeholder="Email"
              keyboardType="email-address"
              value={email}
              onChangeText={(val) =>
                setUserCredentials({ ...userCredentials, email: val })
              }
              autoCapitalize="none"
            />
            <TextInput
              {...inputOptions}
              placeholder="Age"
              value={age}
              onChangeText={(val) =>
                setUserCredentials({ ...userCredentials, age: val })
              }
              keyboardType="number-pad"
              maxLength={2}
            />
            <TextInput
              {...inputOptions}
              secureTextEntry={true}
              placeholder="Password"
              value={password}
              onChangeText={(val) =>
                setUserCredentials({ ...userCredentials, password: val })
              }
            />

            <TextInput
              {...inputOptions}
              placeholder="Occupation"
              value={occupation}
              onChangeText={(val) =>
                setUserCredentials({ ...userCredentials, occupation: val })
              }
            />
            <TextInput
              {...inputOptions}
              placeholder="Adhar Number"
              value={adhar}
              onChangeText={(val) =>
                setUserCredentials({ ...userCredentials, adhar: val })
              }
              keyboardType="number-pad"
              maxLength={12}
            />

            <TextInput
              {...inputOptions}
              placeholder="Mobile Number"
              value={mobile}
              onChangeText={(val) =>
                setUserCredentials({ ...userCredentials, mobile: val })
              }
              keyboardType="number-pad"
              maxLength={10}
            />

            <TouchableOpacity
              style={styles.btn}
              disabled={disableBtn}
              onPress={handleSubmit}
              activeOpacity={0.7}
            >
              {loading ? (
                <Loader height={25} width={25} />
              ) : (
                <>
                  <FontAwesome5
                    name="user-graduate"
                    size={19}
                    style={{ fontWeight: 500 }}
                    color="#FFFFFF"
                  />
                  <Text
                    style={{
                      fontSize: 18,
                      color: "#FFFFFF",
                      fontWeight: 400,
                    }}
                  >
                    Sign up
                  </Text>
                </>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={{ paddingTop: 15 }}
              activeOpacity={0.6}
              onPress={() => navigation.navigate("Login")}
            >
              <Text
                style={{ color: "#000", fontSize: 16, textAlign: "center" }}
              >
                Already have an accout ? Login
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  btn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    padding: 10,
    backgroundColor: colors.buttonColor,
    width: "100%",
    gap: 5,
    alignSelf: "center",
    borderRadius: colors.br,
    marginTop: 12,
  },
});
