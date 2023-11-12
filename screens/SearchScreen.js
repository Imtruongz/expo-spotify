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
import { SafeAreaProvider } from "react-native-safe-area-context";

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

  return (
    <SafeAreaProvider>
      <LinearGradient colors={["#131624", "#040306"]} style={{ flex: 1 }}>
        <ScrollView style={{marginTop: 15}}>
          <TextWhite style={styles.titleText1}>Search</TextWhite>

          <Pressable style={styles.headerContainer}>
            <Pressable style={styles.searchInput}>
              <AntDesign name="search1" size={25} color="#979593" />
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
                style={[
                  styles.albumLikedButton,
                  { backgroundColor: item.color },
                ]}
              >
                <TextWhite style={styles.nameSong}>{item.name}</TextWhite>
                <Image style={styles.imageSong} source={{ uri: item.image }} />
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaProvider>
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
    marginHorizontal: 18,
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
  searchInput: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#131624",
    padding: 9,
    flex: 1,
    borderRadius: 3,
    height: 50,
    borderWidth: 1,
    borderColor: "#979593",
  },
  inputTitle: {
    fontSize: 16,
    width: "100%",
    fontWeight: "500",
    color: "#979593",
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
