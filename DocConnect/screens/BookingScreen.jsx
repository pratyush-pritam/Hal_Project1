import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useState } from "react";
import { defaultStyle, colors, inputOptions } from "../constants/styles";
import { Avatar, TextInput } from "react-native-paper";
import SquareMenuButton from "../components/SquareMenuButton";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const BookingScreen = ({ navigation, route }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [Hospital, setHospital] = useState("");
  const [deartment, setDepartment] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [timeSlots, setTimeSlots] = useState("");

  const [visible, setVisible] = useState(false);
  const closeMenu = () => {
    setVisible(false);
  };
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirm = (date) => {
    setSelectedDate(date);
    hideDatePicker();
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
                  backgroundColor: 'transparent',
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
              Booking
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
            <View style={{ height: "13%" }} />
            <View style={{ flex: 1, alignItems: "center" }}>
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ width: "85%" }}
              >
                <TextInput
                  {...inputOptions}
                  placeholder="Hospital Name"
                  value={Hospital}
                  onChangeText={(text) => setHospital(text)}
                />
                <TextInput
                  {...inputOptions}
                  placeholder="Department Name"
                  value={deartment}
                  onChangeText={(text) => setDepartment(text)}
                />
                <TouchableOpacity
                  onPress={showDatePicker}
                  style={{
                    borderWidth: 1,
                    borderColor: colors.textColor,
                    padding: 14,
                    backgroundColor: "#FFFBFF",
                    marginTop: 7,
                    borderRadius: 4,
                  }}
                >
                  <Text>
                    {selectedDate
                      ? JSON.stringify(selectedDate).slice(1, 11)
                      : "Select Date"}
                  </Text>
                </TouchableOpacity>
                <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode="date"
                  onConfirm={handleConfirm}
                  onCancel={hideDatePicker}
                />
                <TextInput
                  {...inputOptions}
                  placeholder="Prefer Doctor Name(Optional)"
                  value={doctorName}
                  onChangeText={(text) => setDoctorName(text)}
                />
                <Text style={{ fontSize: 18, marginTop: 5 }}>
                  Available time slots
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                  }}
                >
                  {[1, 2, 3, 4].map((item, index) => (
                    <TouchableOpacity
                      key={index}
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        backgroundColor: colors.mainColor,
                        padding: 10,
                        marginVertical: 10,
                        borderRadius: 5,
                        borderColor:
                          timeSlots != item ? colors.primaryColor : "#000000",
                        borderWidth: 2,
                      }}
                      onPress={() => {
                        setTimeSlots(item);
                      }}
                    >
                      <Text
                        style={{
                          color: timeSlots != item ? "#000000" : "#fff",
                          fontSize: 15,
                        }}
                      >
                        10:00 AM
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
                <TouchableOpacity
                  style={{
                    backgroundColor: colors.mainColor,
                    padding: 15,
                    borderRadius: 5,
                    marginTop: 10,
                  }}
                  onPress={() =>
                    navigation.navigate("PatientInfo", {
                      doctor: route.params.doctor,
                    })
                  }
                >
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: 15,
                      textAlign: "center",
                    }}
                  >
                    Book
                  </Text>
                </TouchableOpacity>
                <View style={{ marginBottom: 10 }} />
              </ScrollView>
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default BookingScreen;

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
