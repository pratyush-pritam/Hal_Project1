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
//Holiday screen
const HolidayScreen = ({ navigation }) => {
  //Rendering the holiday list
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.holidayName}>{item.name}</Text>
      <Text style={styles.holidayDate}>{item.date}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={indianHolidays}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Avatar.Icon
                icon={"arrow-left"}
                style={{
                  backgroundColor: colors.backgroundColor,
                  resizeMode: "contain",
                }}
                color={colors.textColor}
                size={49}
              />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 20,
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
    </View>
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
  },
  itemContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    elevation: 3,
  },
  holidayName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  holidayDate: {
    fontSize: 16,
    color: "#666",
  },
});

export default HolidayScreen;
