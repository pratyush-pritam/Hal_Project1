import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    TouchableWithoutFeedback
} from "react-native";
import React, { useState } from "react";
import { defaultStyle, colors } from "../constants/styles";
import { Avatar } from "react-native-paper";
import SquareMenuButton from "../components/SquareMenuButton";

const hospitals = ["SUM", "AIIMS", "UTKAL"];

const AllHospitalScreen = ({ navigation }) => {
    const [visible, setVisible] = useState(false);
    const closeMenu = () => {
        setVisible(false);
    };

    //Navigating to the hospital screen
    const navigateTo = (item) => {
        navigation.navigate("Hospitals", {
            hospital: item,
        });
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
                    {/* Navigating to the home screen */}
                        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                            <Avatar.Icon
                                icon={"arrow-left"}
                                style={{
                                    backgroundColor: "transparent",
                                    resizeMode: "contain",
                                }}
                                color={colors.backgroundColor}
                            />
                        </TouchableOpacity>
                        <SquareMenuButton onPress={() => setVisible(!visible)} color={"#fff"} />
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
                                fontSize: 30,
                                fontWeight: "bold",
                                color: colors.backgroundColor,
                                textAlign: 'center'
                            }}
                        >
                            Hospitals Available
                        </Text>
                        <View style={{ height: "10%" }} />
                    </View>
                    <View
                        style={{
                            borderWidth: 1,
                            borderTopLeftRadius: 100,
                            borderColor: colors.textColor,
                            flex: 2,
                            backgroundColor: colors.backgroundColor
                        }}
                    >
                        <View style={{ height: "10%" }} />
                        <View style={{ flex: 1, alignItems: "center" }}>
                            <ScrollView
                                showsVerticalScrollIndicator={false}
                                style={{ width: "85%" }}
                            >
                                {hospitals.map((item, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        style={{
                                            width: "100%",
                                            backgroundColor: colors.mainColor,
                                            borderRadius: 12,
                                            marginBottom: 15,
                                            flexDirection: "row",
                                            height: 60,
                                            elevation: 5,
                                            alignItems: "center",
                                            justifyContent: "center",
                                            borderWidth: 1,
                                        }}
                                        onPress={() => navigateTo(item)}
                                    >
                                        <Text style={{ textAlign: "center", fontSize: 20, color: colors.backgroundColor }}>
                                            {item}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default AllHospitalScreen;

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
