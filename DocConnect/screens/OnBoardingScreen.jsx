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
            title: "Welcome to DocConnect",
            subtitle: "We're thrilled to have you on board! DocConnect is here to simplify your life. Get ready to experience convenience, efficiency, and more.",
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
            title: "Discover Key Features",
            subtitle: "Explore a world of possibilities with DocConnect. From doctor schedules to indoor maps, we've got everything you need to make your life easier. Let's dive in!",
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
            title: "Let's Get Started",
            subtitle: `Setting up DocConnect is a breeze. Just a few steps, and you'll be on your way to enjoying a smarter, more connected life. Tap "Get Started" to begin your journey.`,
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
