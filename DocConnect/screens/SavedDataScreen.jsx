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
  const loading = false; //TODO
  const handleSubmit = () => {
    // make api call to store the realtives of the user in the databaseu
  };

  return (
    <View style={{ ...defaultStyle, padding: 0, backgroundColor: colors.mainColor }}>
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
            fontSize: 25,
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
          borderTopLeftRadius: 100,
          borderWidth: 1,
          backgroundColor: colors.backgroundColor
        }}
      >
        <View style={{ height: "10%" }} />
        <View style={{ gap: 10 }}>
          <TextInput
            {...inputOptions}
            placeholder="Name"
            value={userCredentials.name}
            onChangeText={(val) =>
              setUserCredentials({ ...userCredentials, name: val })
            }
          />
          <TextInput
            {...inputOptions}
            placeholder="Email"
            keyboardType="email-address"
            value={userCredentials.email}
            onChangeText={(val) =>
              setUserCredentials({ ...userCredentials, email: val })
            }
            autoCapitalize="none"
          />
          <TextInput
            {...inputOptions}
            placeholder="Age"
            value={userCredentials.age}
            onChangeText={(val) =>
              setUserCredentials({ ...userCredentials, age: val })
            }
            keyboardType="number-pad"
          />

          <TextInput
            {...inputOptions}
            placeholder="Occupation"
            value={userCredentials.occupation}
            onChangeText={(val) =>
              setUserCredentials({ ...userCredentials, occupation: val })
            }
          />
          <TextInput
            {...inputOptions}
            placeholder="Adhar Number"
            value={userCredentials.adhar}
            onChangeText={(val) =>
              setUserCredentials({ ...userCredentials, adhar: val })
            }
            keyboardType="number-pad"
          />

          <TextInput
            {...inputOptions}
            placeholder="Mobile Number"
            value={userCredentials.mobile}
            onChangeText={(val) =>
              setUserCredentials({ ...userCredentials, mobile: val })
            }
            keyboardType="number-pad"
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
    </View>
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
