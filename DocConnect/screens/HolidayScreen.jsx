import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { indianHolidays } from "../constants/data";
import { colors, defaultStyle } from "../constants/styles";
import { Avatar } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import LinearGradient from "react-native-linear-gradient";

const HolidayScreen = ({ navigation }) => {
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.holidayName}>{item.name}</Text>
      <Text style={styles.holidayDate}>{item.date}</Text>
    </View>
  );

  return (
    <LinearGradient
      colors={["#9ac8d6", "#f5f8f8"]}
      style={styles.container}>
      <StatusBar style="dark" />
      <FlatList
        data={indianHolidays}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}
              style={{ position: 'absolute', left: 0, zIndex: 999 }}
            >
              <Avatar.Icon
                icon={"arrow-left"}
                style={{
                  backgroundColor: "transparent",
                  resizeMode: "contain",
                }}
                color={colors.textColor}
                size={60}
              />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 26,
                fontWeight: "bold",
                flex: 1,
                textAlign: "center",
              }}
            >
              Holidays
            </Text>
          </View>
        }
        ListHeaderComponentStyle={{
          marginBottom: 16,
          alignItems: "center",
        }}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    ...defaultStyle,
    flex: 1,
    padding: 9,
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    alignItems: "center",
    position: 'relative'
  },
  itemContainer: {
    backgroundColor: colors.mainColor,
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    elevation: 3,
  },
  holidayName: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.backgroundColor,
    marginBottom: 8,
  },
  holidayDate: {
    fontSize: 16,
    color: colors.backgroundColor,
  },
});

export default HolidayScreen;
