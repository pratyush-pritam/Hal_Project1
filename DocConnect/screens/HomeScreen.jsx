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
  
 