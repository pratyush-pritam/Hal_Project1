import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Pressable
} from "react-native";
import React, { useEffect, useState } from "react";
import { colors, defaultStyle, } from "../constants/styles";
import { Avatar, Searchbar, } from "react-native-paper";
import { categories, } from "../constants/data";
import Tab from "../components/Tab";
import SquareMenuButtton from "../components/SquareMenuButton";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../redux/action";

const arr = ["info", "info", "info", "info"];

const renderCategorySection = (title, items, navigateTo, navigation) => {
  return (
    <View>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.categoryContainer}>
        {items.map((item, index) => (
          <Tab key={index} text={item} onPress={() => navigation.navigate(item)} />
        ))}
        <TouchableOpacity
          onPress={() => navigation.navigate(navigateTo)}
          style={{ width: "100%", alignSelf: "flex-end" }}
        >
          <Text style={styles.seeAll}>See all</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const HomeScreen = ({ navigation, route }) => {
  const [visible, setVisible] = useState(false);
  const closeMenu = () => {
    setVisible(false);
  };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [route]);
  const { user } = useSelector((state) => state.user);
  console.log(user);

  return (
    <TouchableWithoutFeedback onPress={closeMenu}>
      <View style={{ ...defaultStyle, padding: 0 }}>
        <ScrollView
          style={{
            flex: 1,
            paddingTop: 10,
          }}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={{ position: "relative", gap: 10, paddingHorizontal: 15 }}
          >
            <View style={styles.heading}>
              <TouchableOpacity
                onPress={() => navigation.navigate("Profile")}
                activeOpacity={0.8}
              >
                <Avatar.Image
                  style={{
                    alignSelf: "center",
                  }}
                  source={{
                    uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX4wVGjMQ37PaO4PdUVEAliSLi8-c2gJ1zvQ&usqp=CAU",
                  }}
                  size={80}
                />
              </TouchableOpacity>
              <SquareMenuButtton onPress={() => setVisible(!visible)} />
              {visible && (
                <View style={styles.menu}>
                  <Text style={styles.boxTitle}>Help</Text>
                  <Text style={styles.boxTitle}>Contact Us</Text>
                </View>
              )}
            </View>
            <View>
              <Text
                style={{
                  fontSize: 25,
                  fontWeight: "normal",
                  color: colors.textColor,
                }}
              >
                Hello
              </Text>
              <Text style={styles.textHeading}>{user?.username}!</Text>
            </View>
            <Searchbar
              placeholder="Search..."
              style={{
                backgroundColor: "#ffffff",
                shadowColor: colors.textColor,
              }}
              onPressIn={() => navigation.navigate("Search")}
            />
            <TouchableOpacity
              onPress={() => navigation.navigate("Doctors")}
              activeOpacity={0.8}
              style={{
                backgroundColor: colors.mainColor,
                elevation: 5,
                padding: 25,
                alignItems: "center",
                justifyContent: "space-between",
                flexDirection: "row",
                borderRadius: colors.br,
              }}
            >
              <View>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "500",
                    textAlign: "center",
                    color: colors.backgroundColor
                  }}
                >
                  Schedule a
                </Text>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "500",
                    textAlign: "right",
                    color: colors.backgroundColor
                  }}
                >
                  visit online
                </Text>
              </View>
              <Avatar.Icon
                icon={"doctor"}
                style={{
                  backgroundColor: "transparent",
                }}
              />
            </TouchableOpacity>
            {/* Categories */}
            {renderCategorySection(
              "What do you need ?",
              categories,
              "Categories",
              navigation
            )}
            {/* Govt. Scheme */}
            {renderCategorySection("Govt. Schemes for you", arr)}
            {/* Recommended Articles */}
            {renderCategorySection("Recommended Articles", arr, "Articles", navigation)}
            {/* Popular Doctors */}
            {renderCategorySection(
              "Popular Doctors",
              arr,
              "Doctors",
              navigation
            )}
            {/* Popular Hospitals */}
            {renderCategorySection(
              "Popular Hospitals",
              arr,
              "AllHospital",
              navigation
            )}
            <View style={{ marginBottom: 10 }} />
          </View>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
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
  heading: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative",
  },
  textHeading: {
    fontSize: 35,
    color: colors.textColor,
    fontWeight: "bold",
  },
  main: {
    paddingTop: 12,
    gap: 10,
    paddingBottom: 45,
  },
  box: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: colors.br,
    padding: 20,
    shadowColor: "#000",
    elevation: 2,
  },
  boxTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.textColor,
    textAlign: "center",
  },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: 23,
    marginBottom: 10,
  },
  seeAll: {
    fontSize: 16,
    fontWeight: "400",
    textAlign: "right",
  },
  categoryContainer: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 10,
  },
});
