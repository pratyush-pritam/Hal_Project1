import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { colors, defaultStyle } from "../constants/styles";
import { Avatar } from "react-native-paper";
import RNUpiPayment from "react-native-upi-payment"

//Final booking screen
const FinalBookScreen = ({ navigation, route }) => {
  //Payment function
  const handlePayment = () => {
    RNUpiPayment.initializePayment({
      vpa: '9937089957@ybl', // or can be john@ybl or mobileNo@upi
      payeeName: 'SUM',
      amount: '5',
      transactionRef: 'aasf-332-aoei-fn'
    }, successCallback, failureCallback);
    function successCallback(data) {
      // do whatever with the data 
      console.log(data)
    }

    function failureCallback(data) {
      // do whatever with the data
      console.log(data)
    }
  }
  return (
    <View style={{ ...defaultStyle, padding: 0 }}>
      <View
        style={{
          flex: 1,
          position: "relative",
        }}
      >
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
            Payment Information
          </Text>
        </View>
        <View style={{ paddingHorizontal: 15 }}>
          <View
            style={{
              borderWidth: 1,
              borderRadius: colors.br,
              elevation: 5,
              backgroundColor: colors.backgroundColor,
              padding: 10,
              marginVertical: 10,
              borderColor: colors.primaryColor
            }}
          >
            <Text style={styles.text}>Doctor Details</Text>
            <Text style={styles.text1}>
              Name : {route?.params?.doctor?.name}
            </Text>
            <Text style={styles.text1}>age : {route?.params?.doctor?.age}</Text>
            <Text style={styles.text1}>
              Specialist : {route?.params?.doctor?.specialist}
            </Text>
            <Text style={styles.text1}>
              Descripition : {route?.params?.doctor?.details}
            </Text>
          </View>
        </View>
        <View style={{ paddingHorizontal: 15 }}>
          <View style={styles.container}>
            <Text style={styles.text}>Doctor Fee </Text>
            <Text style={styles.text}>Rs. 500</Text>
          </View>
          <View style={styles.container}>
            <Text style={styles.text}>Service Fee </Text>
            <Text style={styles.text}>Rs. 100</Text>
          </View>
          <View style={styles.container}>
            <Text style={styles.text}>Discount </Text>
            <Text style={styles.text}>Rs. 0</Text>
          </View>
          <View style={styles.container}>
            <Text style={styles.text}>Total </Text>
            <Text style={styles.text}>Rs. 600</Text>
          </View>
        </View>
        <View style={{ paddingHorizontal: 15 }}>
          <TouchableOpacity
            style={{
              backgroundColor: colors.mainColor,
              padding: 10,
              borderRadius: colors.br,
              elevation: 5,
              marginVertical: 10,
            }}
            onPress={handlePayment}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 20,
                fontWeight: "bold",
                color: "#fff",
              }}
            >
              Pay
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default FinalBookScreen;

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: "bold",
    paddingVertical: 5,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: colors.borderColor,
    paddingVertical: 10,
  },
  text1: {
    fontWeight: "500",
    fontSize: 18,
  },
});
