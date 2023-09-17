import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { colors, defaultStyle } from '../constants/styles';
import LinearGradient from 'react-native-linear-gradient';
import { Avatar } from 'react-native-paper';

const AboutScreen = ({ navigation }) => {
    return (
        <LinearGradient
            colors={["#9ac8d6", "#f5f8f8"]}
            style={{
                ...defaultStyle, padding: 0

            }}        >
            <ScrollView >
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
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

                    <Text style={styles.title}>About Our App</Text>
                    <Text style={styles.description}>
                        Our app is a comprehensive solution for patients, offering a range of essential features. Patients can instantly check the availability of their preferred doctor upon entering the hospital and effortlessly book appointments using AI, eliminating long wait times. When in the range of the hospital's beacon, patients can also access a real-time waiting list for medicines, streamlining the process of obtaining medications.
                    </Text>
                    <Text style={styles.description}>
                        The app includes hospital navigation, real-time doctor schedules, medication availability checks, a hospital holiday list, a staff directory, and information on government healthcare schemes. This all-in-one app ensures a smooth and efficient healthcare experience for patients and promotes better communication and service within the hospital.
                    </Text>
                    <Text style={styles.subtitle}>Key Features:</Text>
                    <Text style={styles.feature}>
                        - Instantly check doctor availability and book appointments.
                    </Text>
                    <Text style={styles.feature}>
                        - Real-time waiting list for medicines.
                    </Text>
                    <Text style={styles.feature}>
                        - Hospital navigation for easy wayfinding.
                    </Text>
                    <Text style={styles.feature}>
                        - Access real-time doctor schedules.
                    </Text>
                    <Text style={styles.feature}>
                        - Medication availability checks.
                    </Text>
                    <Text style={styles.feature}>
                        - Hospital holiday list.
                    </Text>
                    <Text style={styles.feature}>
                        - Staff directory.
                    </Text>
                    <Text style={styles.feature}>
                        - Information on government healthcare schemes.
                    </Text>
                    <Text style={styles.description}>
                        When a patient is within the beacon's range, the system can instantly verify the doctor's current availability at the hospital and facilitate appointment booking. Both the patient and the doctor can access a real-time waiting/appointment list. Additionally, the hospital's pharmacy department can leverage this technology to provide token numbers or waiting numbers to patients seeking medication.
                    </Text>
                    <Text style={styles.description}>
                        Furthermore, an additional feature can be implemented to display the navigation route to the appointed rooms or departments within the hospital, enhancing the overall experience for patients and visitors.
                    </Text>
                </View>
            </ScrollView>
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
        color: colors.te,
    },
    subtitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 15,
        marginBottom: 5,
        color: colors.textColor,
    },
    description: {
        fontSize: 16,
        marginBottom: 10,
        color: colors.textColor,
    },
    feature: {
        fontSize: 16,
        marginLeft: 10,
        marginBottom: 5,
        color: colors.textColor,
    },
});

export default AboutScreen;
