import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Searchbar } from "react-native-paper";
import { colors, defaultStyle } from "../constants/styles";

const SearchScreen = () => {
  //Search query
  const [query, setQuery] = useState("");
  return (
    <View style={{ ...defaultStyle, padding: 7 }}>
      <Searchbar
        placeholder="Search for doctors"
        value={query}
        onChangeText={setQuery}
        style={{
          backgroundColor: "#ffffff",
          shadowColor: colors.textColor,
        }}
      />
      {/* Doctors  */}
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({});
