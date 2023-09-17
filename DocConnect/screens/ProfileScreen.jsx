import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { defaultStyle, colors } from "../constants/styles";
import { Avatar } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { ScrollView } from "react-native";
import { Calendar } from "react-native-calendars";
import Tab from "../components/Tab";
import { useDispatch, useSelector } from "react-redux";
import auth from "@react-native-firebase/auth";
import Toast from "react-native-toast-message";
import LinearGradient from "react-native-linear-gradient";
import { StatusBar } from "expo-status-bar";


const initialSelectedDates = ["2023-09-16", "2023-09-19"];
const arr = ["15th Aug", "2nd Sept", "15th Sept"];
const ProfileScreen = ({ navigation }) => {
  const [selectedDates, setSelectedDates] = useState(initialSelectedDates);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleDatePress = (day) => {
    const dateString = day.dateString;
    const isSelected = selectedDates.includes(dateString);

    if (isSelected) {
      setSelectedDates((prevSelectedDates) =>
        prevSelectedDates.filter((date) => date !== dateString)
      );
    } else {
      setSelectedDates((prevSelectedDates) => [
        ...prevSelectedDates,
        dateString,
      ]);
    }
  };
  const logoutHandler = () => {
    auth()
      .signOut()
      .then(() => {
        Toast.show({ type: "success", text1: "ComeBack Again!" })
        navigation.reset({
          index: 0,
          routes: [{ name: "Login" }]
        }
        );
        dispatch({
          type: "logOutSuccess",
        });
      });
  }

  const renderAppointments = (date) => (
    <View>
      <Text style={{ paddingVertical: 15, fontSize: 20, fontWeight: "bold" }}>
        {date}
      </Text>
      <View
        style={{
          ...styles.box,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 10,
          borderColor: colors.primaryColor,
          borderWidth: 1
        }}
      >
        <View
          style={{
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Text style={styles.text1}>Dermatologist</Text>
          <Text style={styles.text1}>Dr.Rangila, SUM</Text>
        </View>
        <View>
          <Text style={styles.text1}>9:30AM</Text>
        </View>
      </View>
      <View
        style={{
          ...styles.box,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          borderColor: colors.primaryColor,
          borderWidth: 1
        }}
      >
        <View
          style={{
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Text style={styles.text1}>Cardiologist</Text>
          <Text style={styles.text1}>Dr.Rangila, UTKAL</Text>
        </View>
        <View>
          <Text style={styles.text1}>9:30AM</Text>
        </View>
      </View>
    </View>
  );

  return (

    <LinearGradient
      colors={["#9ac8d6", "#f5f8f8"]}
      style={{ ...defaultStyle, padding: 0 }}>
      <ScrollView
        style={{
          flex: 1,
        }}
        showsVerticalScrollIndicator={false}
      >
        <StatusBar style="light" />
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          style={{
            backgroundColor: "transparent",
            width: "20%"
          }}
        >
          <Avatar.Icon
            icon={"arrow-left"}
            style={{
              backgroundColor: "transparent",
              resizeMode: "contain",
            }}
            color={colors.textColor}
          />
        </TouchableOpacity>
        <View style={styles.container}>
          <View style={styles.innerContainer}>
            <Avatar.Image
              size={150}
              source={{
                uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX4wVGjMQ37PaO4PdUVEAliSLi8-c2gJ1zvQ&usqp=CAU",
              }}
              color={colors.backgroundColor}
            />
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <Text style={{ fontSize: 30, fontWeight: "800" }}>
                {user.username.split(" ")[0]}
              </Text>
              <MaterialIcons
                name="verified"
                size={35}
                color={"green"}
              />
            </View>
            <TouchableOpacity onPress={() => navigation.navigate("Update")}>
              <Text>Change details</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.box}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={styles.text1}>Upcoming visits</Text>
              <Text style={styles.text1}>4</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={styles.text1}>Total visits</Text>
              <Text style={styles.text1}>40</Text>
            </View>
          </View>
          <Text
            style={{ paddingVertical: 15, fontSize: 20, fontWeight: "bold" }}
          >
            Appointment
          </Text>
          <Calendar
            style={{
              borderColor: "gray",
              elevation: 8,
              marginBottom: 10,
              borderRadius: colors.br,
              borderColor: colors.primaryColor,
              borderWidth: 1,
            }}
            theme={{
              backgroundColor: colors.mainColor,
              calendarBackground: colors.mainColor,
              textSectionTitleColor: colors.backgroundColor,
              selectedDayBackgroundColor: '#00adf5',
              selectedDayTextColor: '#ffffff',
              todayTextColor: colors.backgroundColor,
              dayTextColor: colors.backgroundColor,
              textDisabledColor: '#d9e1e8',
              dotColor: '#00adf5',
              selectedDotColor: '#ffffff',
              arrowColor: colors.backgroundColor,
              disabledArrowColor: '#d9e1e8',
              monthTextColor: colors.backgroundColor,
              indicatorColor: colors.backgroundColor,
              textDayFontFamily: 'monospace',
              textMonthFontFamily: 'monospace',
              textDayHeaderFontFamily: 'monospace',
              textDayFontWeight: '300',
              textMonthFontWeight: 'bold',
              textDayHeaderFontWeight: '300',
              textDayFontSize: 16,
              textMonthFontSize: 16,
              textDayHeaderFontSize: 16
            }}
            onDayPress={handleDatePress}
            markedDates={selectedDates.reduce((acc, date) => {
              acc[date] = {
                selected: true,
                disableTouchEvent: true,
                selectedDotColor: "red",
                marked: true,
              };
              return acc;
            }, {})}
          />
          {renderAppointments("Today")}
          {renderAppointments("15th September")}
          <View>
            <Text
              style={{
                paddingVertical: 15,
                fontSize: 20,
                fontWeight: "bold",
                textAlign: "left",
              }}
            >
              History
            </Text>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 10,
                flex: 1,
                justifyContent: "space-between",
              }}
            >
              {arr.map((item, index) => {
                return <Tab key={index} text={item} />;
              })}
            </View>
            <Text style={{ textAlign: "right" }}>See all</Text>
          </View>
          <View>
            <TouchableOpacity style={styles.settingBox}>
              <Text style={styles.settingBoxText}>Payment History</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.settingBox} onPress={() => navigation.navigate("About")}>
              <Text style={styles.settingBoxText}>About</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.settingBox} onPress={logoutHandler}>
              <Text style={styles.settingBoxText}>Logout</Text>
            </TouchableOpacity>
          </View>
          <View style={{ marginBottom: 10 }} />
        </View>
      </ScrollView>
    </LinearGradient >

  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    flex: 1,
  },
  innerContainer: {
    display: "flex",
    alignItems: "center",
    paddingBottom: 13,
  },
  box: {
    backgroundColor: colors.mainColor,
    borderRadius: 10,
    padding: 25,
    elevation: 10,
    borderColor: colors.primaryColor,
    borderWidth: 1,
  },
  text1: {
    fontSize: 17,
    fontWeight: "500",
    color: colors.backgroundColor,
  },
  settingBox: {
    backgroundColor: colors.mainColor,
    borderRadius: 10,
    padding: 25,
    elevation: 4,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: colors.primaryColor,
  },
  settingBoxText: {
    fontSize: 17,
    fontWeight: "500",
    textAlign: "center",
    color: colors.backgroundColor
  },
});
