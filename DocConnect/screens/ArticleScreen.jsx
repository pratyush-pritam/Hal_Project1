import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import { colors, defaultStyle } from "../constants/styles";
import axios from "axios";
import { newsArticles } from "../constants/data";
import Loader from "../components/Loader";
import * as Animatable from "react-native-animatable";
import { Avatar } from "react-native-paper";
import { StatusBar } from "expo-status-bar";

const ArticleScreen = ({ navigation }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  //fetching articles from the api
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(newsArticles);
        setArticles(data.articles);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);
  const filteredArticles = articles.filter((item) => item.articleImage !== null);
  if (loading)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Loader height={100} width={100} color="#000" />
      </View>
    );

  const renderItem = ({ item, index }) => (
    <Animatable.View
      animation="fadeInUp"
      duration={1000}
      style={styles.animatedItem}
      delay={index * 300}
    >
      <StatusBar style="dark" />
      <TouchableOpacity
        onPress={() => {
          Linking.openURL(item.url);
        }}
      >
        <View style={styles.articleContainer}>
          <Image
            source={{ uri: item.urlToImage }}
            style={styles.articleImage}
            resizeMode="center"
          />
          <Text style={styles.articleTitle}>{item.title}</Text>
          <Text style={styles.articleDescription}>{item.description}</Text>
        </View>
      </TouchableOpacity>
    </Animatable.View>
  );

  return (
    <FlatList
      data={filteredArticles}
      renderItem={renderItem}
      keyExtractor={(item) => item.url}
      style={styles.container}
      ListHeaderComponent={
        <View style={styles.heading}>
          <TouchableOpacity onPress={() => navigation.goBack()}
            style={{
              position: 'absolute',
              left: 0,
              zIndex: 99
            }}

          >
            <Avatar.Icon
              icon={"arrow-left"}
              style={{
                backgroundColor: colors.backgroundColor,

              }}
              color={colors.textColor}
              size={60}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 28,
              fontWeight: "bold",
              color: colors.textColor,
              flex: 1,
              textAlign: "center",

            }}
          >
            Articles
          </Text>
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
  heading: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: 'relative',
    marginBottom: 16,
  },
  container: {
    ...defaultStyle,
    padding: 10,
  },
  animatedItem: {
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    elevation: 2,
  },
  articleContainer: {
    borderRadius: 8,
  },
  articleImage: {
    width: "100%",
    height: 150,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  articleTitle: {
    fontSize: 18,
    fontWeight: "bold",
    paddingHorizontal: 16,
    paddingVertical: 8,
    color: colors.textColor,
  },
  articleDescription: {
    fontSize: 16,
    paddingHorizontal: 16,
    paddingBottom: 10,
    color: "#666666",
  },
});

export default ArticleScreen;
