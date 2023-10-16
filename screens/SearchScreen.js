import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
import SearchItem from "../data-json/searchItem.json";

import TextWhite from "../components/TextWhite";

const LikedSongsScreen = () => {
  const [searchItem, setsearchItem] = useState(SearchItem);
  const [searchResult, setSearchResult] = useState(SearchItem);

  const handleSearch = (text) => {
    const searchText = text.toLowerCase();
    const filteredItems = searchItem.filter((item) => {
      return item.name.toLowerCase().includes(searchText);
    });
    setSearchResult(filteredItems);
  };

  const images = {
    HipHopImg: require("../assets/theloai/hiphop.jpg"),
    PopImg: require("../assets/theloai/pop.jpg"),
    RapImg: require("../assets/theloai/rap.jpg"),
    EDMImg: require("../assets/theloai/edm.jpg"),
    podcastsImg: require("../assets/albums/BandaidsImg.jpg"),
    RockImg: require("../assets/albums/Gabriel.jpg"),
    LatinImg: require("../assets/albums/LalisaImg.png"),
    KpopImg: require("../assets/albums/99%Img.jpg"),
    ChartsImg: require("../assets/songs/blindinglight.png"),
    MoodImg: require("../assets/songs/humble.jpg"),
    RADARImg: require("../assets/songs/dancemonkey.jpg"),
    DiscoverImg: require("../assets/songs/badromance.png"),
  };

  return (
    <LinearGradient colors={["#614385", "#516395"]} style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1, marginTop: 50 }}>
        <TextWhite style={styles.titleText1}>Search</TextWhite>

        <Pressable style={styles.headerContainer}>
          <Pressable style={styles.inputContainer}>
            <AntDesign name="search1" size={25} color="white" />
            <TextInput
              onChangeText={(text) => handleSearch(text)}
              placeholder="Artists, songs, albums or podcast"
              placeholderTextColor={"#979593"}
              style={styles.inputTitle}
            />
          </Pressable>
        </Pressable>

        <View style={{ marginHorizontal: 10 }}>
          <TextWhite style={styles.titleText2}>
            What do you want to listen to ?
          </TextWhite>
        </View>

        <View style={styles.albumContainer}>
          {searchResult.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[styles.albumLikedButton, { backgroundColor: item.color }]}
            >
              <TextWhite style={styles.nameSong}>{item.name}</TextWhite>
              <Image style={styles.imageSong} source={images[item.image]} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default LikedSongsScreen;

const styles = StyleSheet.create({
  albumContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 50,
  },
  albumLikedButton: {
    marginBottom: 10,
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-around",
    gap: 10,
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 5,
    elevation: 3,
    width: 160,
    height: 95,
    opacity: 1, // Giá trị opacity mặc định
  },
  titleText1: {
    marginHorizontal: 10,
    fontWeight: "bold",
    fontSize: 26,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginVertical: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#42275a",
    padding: 9,
    flex: 1,
    borderRadius: 3,
    height: 50,
  },
  inputTitle: {
    fontSize: 16,
    width: "100%",
    fontWeight: "500",
    color: "#fff",
  },
  titleText2: {
    fontSize: 20,
    fontWeight: "bold",
  },
  nameSong: {
    fontSize: 16,
    fontWeight: "bold",
  },
  imageSong: {
    width: 60,
    height: 60,
    transform: [{ rotate: "15deg" }],
    margin: 4,
    borderRadius: 6,
  },
});
