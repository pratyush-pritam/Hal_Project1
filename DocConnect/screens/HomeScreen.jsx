import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { colors, defaultStyle, } from "../constants/styles";
import { Avatar, Searchbar, } from "react-native-paper";
import { categories, doctors, newsArticles, } from "../constants/data";
import Tab from "../components/Tab";
import SquareMenuButtton from "../components/SquareMenuButton";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../redux/action";
import { FontAwesome5 } from '@expo/vector-icons';
import ChatBot from "../components/ChatBot";
import LinearGradient from 'react-native-linear-gradient';
import axios from "axios";
import Loader from "../components/Loader";
import Menu from "../components/Menu";


const width = Dimensions.get('window').width;

const arr = ["MediAid", "HealthPlan", "CareNet", "HealthLine"];

const renderCategorySection = (title, items, navigateTo, navigation) => {
  return (
    <View>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.categoryContainer}>
        {items.map((item, index) => (
          <>
            {
              title === "Popular Hospitals" ? <TouchableOpacity
                key={index}
                onPress={() => navigation.navigate("AllHospital", { hospital: item })}
                style={{
                  width: 100,
                  height: 55,
                  borderWidth: 1,
                  borderRadius: colors.br,
                  backgroundColor: colors.mainColor,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FontAwesome5 name="hospital-symbol" size={30} color="white" />
              </TouchableOpacity> :
                <Tab key={index} text={title === "Popular Doctors" ? item.name : item} onPress={() =>
                  title === "Popular Doctors" ? navigation.navigate("DoctorDetails", { doctor: item }) : navigation.navigate(item)
                } />
            }
          </>
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

const HomeScreen = ({ navigation, route }) => {
  const [visible, setVisible] = useState(false);
  const [chatVisible, setChatVisible] = useState(false);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false)

  const closeMenu = () => {
    setVisible(false);
  };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [route]);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true)
        const { data } = await axios.get(newsArticles);

        const first10Articles = data.articles.slice(0, 10);

        const images = first10Articles.map((article) => article.urlToImage);

        setArticles(images);
        setLoading(false)
      } catch (error) {
        console.log(error);
        setLoading(false)
      }
    };

    fetchArticles();
  }, []);


  return (
    <TouchableWithoutFeedback onPress={closeMenu}>
      <LinearGradient colors={["#9ac8d6", "#f5f8f8"]} style={{ ...defaultStyle, padding: 0, position: 'relative' }}>
        <ScrollView
          style={{
            flex: 1,
            paddingTop: 10,
          }}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={{ position: "relative", gap: 10, paddingHorizontal: 15 }}
          >
            <View style={styles.heading}>
              <TouchableOpacity
                onPress={() => navigation.navigate("Profile")}
                activeOpacity={0.8}
              >
                <Avatar.Image
                  style={{
                    alignSelf: "center",
                  }}
                  source={{
                    uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX4wVGjMQ37PaO4PdUVEAliSLi8-c2gJ1zvQ&usqp=CAU",
                  }}
                  size={80}
                />
              </TouchableOpacity>
              <SquareMenuButtton onPress={() => setVisible(!visible)} />
              {visible && <Menu />}
            </View>
            <View>
              <Text
                style={{
                  fontSize: 25,
                  fontWeight: "normal",
                  color: colors.textColor,
                }}
              >
                Hello
              </Text>
              <Text style={styles.textHeading}>{user?.username}!</Text>
            </View>
            <Searchbar
              placeholder="Search..."
              style={{
                backgroundColor: "#ffffff",
                shadowColor: colors.textColor,
              }}
              onPressIn={() => navigation.navigate("Search")}
            />
            <TouchableOpacity
              onPress={() => navigation.navigate("Booking")}
              activeOpacity={0.8}
              style={{
                backgroundColor: colors.mainColor,
                elevation: 5,
                padding: 25,
                alignItems: "center",
                justifyContent: "space-between",
                flexDirection: "row",
                borderRadius: colors.br,
              }}
            >
              <View>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "500",
                    textAlign: "center",
                    color: colors.backgroundColor
                  }}
                >
                  Schedule a
                </Text>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "500",
                    textAlign: "right",
                    color: colors.backgroundColor
                  }}
                >
                  visit online
                </Text>
              </View>
              <Avatar.Icon
                icon={"doctor"}
                style={{
                  backgroundColor: "transparent",
                }}
              />
            </TouchableOpacity>
            {/* Categories */}
            {renderCategorySection(
              "What do you need ?",
              categories,
              "Categories",
              navigation
            )}
            {/* Govt. Scheme */}
            {renderCategorySection("Govt. Schemes for you", arr)}
            {/* Recommended Articles */}
            <View>
              <Text style={styles.sectionTitle}>Recommended Articles</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 10 }}
              >
                {
                  loading ? <Loader color="#000" /> : articles.map((article, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => navigation.navigate("Articles")}
                      style={{
                        backgroundColor: colors.mainColor,
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: colors.br,
                      }}
                    >
                      <Image source={{
                        uri: article
                      }}
                        style={{
                          width: 200,
                          height: 200,
                          borderRadius: colors.br,
                        }}
                        resizeMode="cover"
                      />
                    </TouchableOpacity>
                  ))
                }
              </ScrollView>
              <TouchableOpacity
                onPress={() => navigation.navigate("Articles")}
                style={{ width: "100%", alignSelf: "flex-end" }}
              >
                <Text style={styles.seeAll}>See all</Text>
              </TouchableOpacity>
            </View>
            {/* Popular Doctors */}
            {renderCategorySection(
              "Popular Doctors",
              doctors,
              "Doctors",
              navigation
            )}
            {/* Popular Hospitals */}
            {renderCategorySection(
              "Popular Hospitals",
              arr,
              "AllHospital",
              navigation
            )}
            <View style={{ marginBottom: 10 }} />
          </View>
        </ScrollView>
        {
          chatVisible ?
            <View style={{
              flex: 1,
              backgroundColor: colors.backgroundColor,
              position: "absolute",
              zIndex: 1,
              top: '15%',
              left: 5,
              width: width - 10,
              height: '80%',
            }}>
              <ChatBot setChatVisible={setChatVisible} visible={chatVisible} />
            </View>
            :
            <TouchableOpacity onPress={() => setChatVisible(!chatVisible)} style={{ position: 'absolute', bottom: 0, right: 0, zIndex: 1, backgroundColor: colors.mainColor, padding: 10, borderRadius: 50, margin: 10 }}>
              <FontAwesome5 name="robot" size={30} color="white" />
            </TouchableOpacity>
        }
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  heading: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative",
  },
  textHeading: {
    fontSize: 35,
    color: colors.textColor,
    fontWeight: "bold",
  },
  main: {
    paddingTop: 12,
    gap: 10,
    paddingBottom: 45,
  },
  box: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: colors.br,
    padding: 20,
    shadowColor: "#000",
    elevation: 2,
  },

  sectionTitle: {
    fontWeight: "bold",
    fontSize: 23,
    marginBottom: 10,
  },
  seeAll: {
    fontSize: 16,
    fontWeight: "400",
    textAlign: "right",
  },
  categoryContainer: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 10,
  },
});
