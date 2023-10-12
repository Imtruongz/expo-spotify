import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";

import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

import CategoriData from "../data-json/categori.json";

import TextWhite from "../components/TextWhite";

const CategoriScreen = ({ route }) => {
  const { categoris } = route.params;
  const navigation = useNavigation();

  const [categori, setCategori] = useState(CategoriData);
  const [searchResult, setSearchResult] = useState(CategoriData);
  const [menuVisibility, setMenuVisibility] = useState({});

  const toggleMenu = (itemId) => {
    setMenuVisibility({
      ...menuVisibility,
      [itemId]: !menuVisibility[itemId],
    });
  };

  const handleSearch = (text) => {
    const searchText = text.toLowerCase();
    const filteredItems = categori.filter((item) => {
      return item.name.toLowerCase().includes(searchText);
    });
    setSearchResult(filteredItems);
  };

  const playTrack = async () => {};

  const songCount = categori.length;

  return (
    <LinearGradient colors={["#614385", "#516395"]} style={{ flex: 1 }}>
      <View style={{ flex: 1, marginTop: 50 }}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={{ marginHorizontal: 10 }}
        >
          <AntDesign name="left" size={22} color="white" />
        </Pressable>

        <Pressable style={styles.searchContainer}>
          <Pressable style={styles.searchInput}>
            <AntDesign name="search1" size={20} color="white" />
            <TextInput
              onChangeText={(text) => handleSearch(text)}
              placeholder="What do you want to listen to?"
              placeholderTextColor={"#979593"}
              style={{ fontWeight: "500", width: "100%", color: "white" }}
            />
          </Pressable>
        </Pressable>

        <View style={{ height: 20 }} />
        <View style={{ marginHorizontal: 10 }}>
          <TextWhite style={{ fontSize: 18, fontWeight: "bold" }}>
            {categoris.name}
          </TextWhite>
          <TextWhite style={{ fontSize: 13, marginTop: 5 }}>
            {songCount} songs
          </TextWhite>
        </View>

        <Pressable style={styles.handleButton}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 28 }}>
            <AntDesign name="hearto" size={24} color="white" />
            <AntDesign name="download" size={24} color="white" />
            <Ionicons name="md-ellipsis-vertical" size={24} color="white" />
          </View>

          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Entypo name="shuffle" size={24} color="white" />
            <TouchableOpacity onPress={playTrack} style={styles.controlPlayIcon}>
              <Entypo name="controller-play" size={24} color="#614385" />
            </TouchableOpacity>
          </View>
        </Pressable>

        <FlatList
          data={categoris.songs}
          Vertical
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View key={item.id} style={styles.songsItemsContainer}>
              <View style={styles.songsItemsContent}>
                <Image
                  style={{ width: 60, height: 60, borderRadius: 5 }}
                  source={{ uri: item.image }}
                />
                <View>
                  <TextWhite style={styles.nameSong}>{item.nameSong}</TextWhite>
                  <Text style={styles.nameArtists}>{item.artist}</Text>
                </View>
              </View>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 12 }}
              >
                <TouchableOpacity onPress={() => toggleMenu(item.idSong)}>
                  <Ionicons
                    name="md-ellipsis-vertical"
                    size={24}
                    color="white"
                  />
                </TouchableOpacity>
                {menuVisibility[item.idSong] && (
                  <Animatable.View
                    animation="slideInRight"
                    duration={400} 
                  >
                    <TouchableOpacity>
                      <TextWhite style={styles.menuItem}>
                        Add to playlist
                      </TextWhite>
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <TextWhite style={styles.menuItem}>
                        Remove to playlist
                      </TextWhite>
                    </TouchableOpacity>
                  </Animatable.View>
                )}
              </View>
            </View>
          )}
          keyExtractor={(item) => item.idSong.toString()}
        />
      </View>
    </LinearGradient>
  );
};

export default CategoriScreen;

const styles = StyleSheet.create({
  searchContainer: {
    marginHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 9,
  },
  searchInput: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#42275a",
    padding: 9,
    flex: 1,
    borderRadius: 3,
    height: 38,
  },
  handleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginBottom: 20,
  },
  ArrowDownIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#1DB954",
    justifyContent: "center",
    alignItems: "center",
  },
  controlPlayIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1DB954",
  },
  songsItemsContainer: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  songsItemsContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  nameSong: {
    fontSize: 13,
    fontWeight: "bold",
    marginTop: 7,
  },
  nameArtists: {
    fontSize: 12,
    fontWeight: "500",
    color: "#E0E0E0",
    marginTop: 7,
  },
  menuItem: {
    fontWeight: "bold",
  },
});
