import Toast from "react-native-toast-message";
import Navigation from "./StackNavigator";
import { SafeAreaView } from "react-native";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./redux/action";

const Main = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <Navigation />
        <Toast />
      </SafeAreaView>
    </>
  );
};

export default Main;
