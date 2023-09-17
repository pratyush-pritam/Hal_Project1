import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Appearance,
} from "react-native";
import React from "react";
import Onboarding from "react-native-onboarding-swiper";
import Lottie from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";

const { width } = Dimensions.get("window");

export default function OnboardingScreen() {
  const colorScheme = Appearance.getColorScheme();
  const navigation = useNavigation();
  const handleDone = async () => {
    navigation.navigate("Login");
    await AsyncStorage.setItem("onboarded", "1");
  };

  const doneButton = ({ ...props }) => {
    return (
      <TouchableOpacity style={styles.doneButton} {...props}>
        <Text>Done</Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <StatusBar style={`${colorScheme === "dark" ? "dark" : "light"}`} />
      <Onboarding
        onDone={handleDone}
        onSkip={handleDone}
        DoneButtonComponent={doneButton}
        containerStyles={{ paddingHorizontal: 15 }}
        pages={[
          {
            backgroundColor: "#b8d4d1",
            image: (
              <View>
                <Lottie
                  source={require("../assets/animations/animation_1.json")}
                  autoPlay="true"
                  loop
                  style={styles.lottie}
                />
              </View>
            ),
            title: "Find The Best Service",
            subtitle: "We provide the best medical service",
            subTitleStyles: {
              fontWeight: 500,
              fontSize: 15.9,
            },
          },
          {
            backgroundColor: "#fef3c7",
            image: (
              <View style={styles.lottie}>
                <Lottie
                  source={require("../assets/animations/animation_2.json")}
                  autoPlay
                  loop
                />
              </View>
            ),
            title: "Daily Checkups",
            subtitle: "Add karenge badd mai",
            subTitleStyles: {
              fontWeight: 500,
              fontSize: 15.9,
            },
          },
          {
            backgroundColor: "#a8caa1",
            image: (
              <View style={styles.lottie}>
                <Lottie
                  source={require("../assets/animations/animation_3.json")}
                  autoPlay
                  loop
                  style={{ marginLeft: 22 }}
                />
              </View>
            ),
            title: "Kucch lorem12",
            subtitle: "Likh lenege",
            subTitleStyles: {
              fontWeight: 500,
              fontSize: 15.9,
            },
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  lottie: {
    width: width * 0.9,
    height: width,
  },
  doneButton: {
    padding: 20,
  },
});
