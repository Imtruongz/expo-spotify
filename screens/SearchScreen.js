import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
import SearchItem from "../data-json/searchItem.json";

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
    <LinearGradient colors={["#614385", "#516395"]} style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1, marginTop: 50 }}>
        <Text
          style={{
            marginHorizontal: 10,
            color: "white",
            fontWeight: "bold",
            fontSize: 26,
          }}
        >
          Search
        </Text>

        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginHorizontal: 10,
            marginVertical: 20,
          }}
        >
          <Pressable
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              backgroundColor: "#42275a",
              padding: 9,
              flex: 1,
              borderRadius: 3,
              height: 50,
            }}
          >
            <AntDesign name="search1" size={25} color="white" />
            <TextInput
              onChangeText={(text) => handleSearch(text)}
              placeholder="Artists, songs, albums or podcast"
              placeholderTextColor={"#979593"}
              style={{
                fontSize: 16,
                width: "100%",
                fontWeight: "500",
                color: "white",
              }}
            />
          </Pressable>
        </Pressable>

        <View style={{ marginHorizontal: 10 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>
            What do you want to listen to ?
          </Text>
        </View>

        <View style={styles.albumContainer}>
          {searchResult.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[styles.albumLikedButton, { backgroundColor: item.color }]}
            >
              <Text
                style={{ color: "white", fontSize: 16, fontWeight: "bold" }}
              >
                {item.name}
              </Text>
              <Image
                style={{
                  width: 60,
                  height: 60,
                  transform: [{ rotate: "15deg" }],
                  margin: 4,
                  borderRadius: 6,
                }}
                source={{ uri: item.image }}
              />
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
});
