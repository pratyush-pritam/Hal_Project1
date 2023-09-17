import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { colors, defaultStyle } from '../constants/styles';
import LinearGradient from 'react-native-linear-gradient';
import { Avatar } from 'react-native-paper';

const ContactUsScreen = ({ navigation }) => {
    return (
        <LinearGradient
            colors={["#9ac8d6", "#f5f8f8"]}
            style={{ ...defaultStyle, padding: 0 }}>
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
                <Text style={styles.title}>Contact Us</Text>
                <Text style={styles.subtitle}>Helpline Numbers</Text>
                <View style={styles.helpline}>
                    <Text style={styles.hospitalName}>SUM Hospital:</Text>
                    <Text style={styles.hospitalNumber}>+91 1234567890</Text>
                </View>
                <View style={styles.helpline}>
                    <Text style={styles.hospitalName}>UTKAL Hospital:</Text>
                    <Text style={styles.hospitalNumber}>+91 9876543210</Text>
                </View>
                <View style={styles.helpline}>
                    <Text style={styles.hospitalName}>AIIMS BBS:</Text>
                    <Text style={styles.hospitalNumber}>+91 5432109876</Text>
                </View>
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: colors.textColor,
    },
    subtitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 15,
        marginBottom: 5,
        color: colors.textColor,
    },
    helpline: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    hospitalName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 10,
        color: colors.textColor,
    },
    hospitalNumber: {
        fontSize: 16,
        color: colors.textColor,
    },
});

export default ContactUsScreen;
