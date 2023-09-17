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
    const navigateTo = (item) => {
        navigation.navigate("Hospitals", {
            hospital: item,
        });
    };
    return (
        <TouchableWithoutFeedback onPress={closeMenu}>
            <View style={{ ...defaultStyle, padding: 0 }}>
                <View
                    style={{
                        flex: 1,
                        position: "relative",
                    }}
                >
                    <View style={styles.heading}>
                        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                            <Avatar.Icon
                                icon={"arrow-left"}
                                style={{
                                    backgroundColor: colors.backgroundColor,
                                    resizeMode: "contain",
                                }}
                                color={colors.textColor}
                            />
                        </TouchableOpacity>
                        <SquareMenuButton onPress={() => setVisible(!visible)} />
                        {visible && (
                            <View style={styles.menu}>
                                <Text style={styles.boxTitle}>Help</Text>
                                <Text style={styles.boxTitle}>Contact Us</Text>
                            </View>
                        )}
                    </View>
                    <View style={{ height: "15%" }} />
                    <View style={{ marginBottom: 10 }}>
                        <Text
                            style={{
                                paddingHorizontal: 25,
                                fontSize: 30,
                                fontWeight: "bold",
                            }}
                        >
                            Hospitals Available
                        </Text>
                    </View>
                    <View
                        style={{
                            borderWidth: 1,
                            borderTopLeftRadius: 100,
                            borderColor: colors.textColor,
                            flex: 2,
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
                                            backgroundColor: colors.backgroundColor,
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
                                        <Text style={{ textAlign: "center", fontSize: 20 }}>
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
