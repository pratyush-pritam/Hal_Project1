import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { colors } from "./constants/styles";
import auth from "@react-native-firebase/auth";
import Loader from "./components/Loader";

//Screens for the navigation
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import CameraComponent from "./components/Camera";
import OnboardingScreen from "./screens/OnBoardingScreen";
import SearchScreen from "./screens/SearchScreen";
import CategoryScreen from "./screens/CategoryScreen";
import HolidayScreen from "./screens/HolidayScreen";
import StaffScreen from "./screens/StaffScreen";
import ArticleScreen from "./screens/ArticleScreen";
import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import UpdateScreen from "./screens/UpdateScreen";
import DoctorScreen from "./screens/DoctorScreen";
import SavedDataScreen from "./screens/SavedDataScreen";
import HospitalScreen from "./screens/HospitalScreen";
import DoctorDetailsScreen from "./screens/DoctorDetailsScreen";
import DepartmentScreen from "./screens/DepartmentScreen";
import DepartmentParticularScreen from "./screens/DepartmentParticularScreen";
import BookingScreen from "./screens/BookingScreen";
import FinalBookScreen from "./screens/FinalBookScreen";
import PatientScreen from "./screens/PatientScreen";
import AllHospitalScreen from "./screens/AllHospitalScreen";

const Stack = createNativeStackNavigator();

function Navigation() {
  const [showOnboarding, setShowOnboarding] = useState(null);
  const [isUserLogin, setIsUserLogin] = useState(false);

  useEffect(() => {
    checkIfAlreadyOnboarded();
  }, []);

  auth().onAuthStateChanged((user) => {
    if (user !== null) {
      setIsUserLogin(true);
    }
  });
  const checkIfAlreadyOnboarded = async () => {
    const onboarded = await AsyncStorage.getItem("onboarded");
    setShowOnboarding(onboarded !== "1");
  };

  if (showOnboarding === null) {
    return (
      <View
        style={{ flex: 1, display: "flex", backgroundColor: colors.backgroundColor,justifyContent:"center",alignItems:"center" }}
      >
        <Loader height={100} width={100} color="black"/>
      </View>
    );
  }

  const commonScreenOptions = { headerShown: false };
  const initialRouteName = showOnboarding
    ? "Onboarding"
    : isUserLogin
    ? "Home"
    : "Login";

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={commonScreenOptions}
        initialRouteName={initialRouteName}
      >
        {showOnboarding && (
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        )}
       
       <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Camera" component={CameraComponent} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="Categories" component={CategoryScreen} />
        <Stack.Screen name="Holidays" component={HolidayScreen} />
        <Stack.Screen name="Articles" component={ArticleScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Update" component={UpdateScreen} />
        <Stack.Screen name="UpdateSaved" component={SavedDataScreen} />
        <Stack.Screen name="Staff" component={StaffScreen} />
        <Stack.Screen name="Doctors" component={DoctorScreen} />
        <Stack.Screen name="Hospitals" component={HospitalScreen} />
        <Stack.Screen name="DoctorDetails" component={DoctorDetailsScreen} />
        <Stack.Screen name="Departments" component={DepartmentScreen} />
        <Stack.Screen name="ParticularDepartment"component={DepartmentParticularScreen}/>
        <Stack.Screen name="Booking" component={BookingScreen} />
        <Stack.Screen name="PatientInfo" component={PatientScreen} />
        <Stack.Screen name="FinalBooking" component={FinalBookScreen} />
        <Stack.Screen name="AllHospital" component={AllHospitalScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
