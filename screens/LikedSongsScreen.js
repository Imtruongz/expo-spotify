import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState, useEffect, useMemo } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import * as Animatable from "react-native-animatable"; // Thêm import này

import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

import songsData from "../data-json/songs.json";

import TextWhite from "../components/TextWhite";

const LikedSongsScreen = () => {
  const navigation = useNavigation();
  const [songs, setSongs] = useState(songsData);
  const [searchResult, setSearchResult] = useState(songsData);

  const [menuVisibility, setMenuVisibility] = useState({});

  const toggleMenu = (itemId) => {
    setMenuVisibility({
      ...menuVisibility,
      [itemId]: !menuVisibility[itemId],
    });
  };

  const handleSearch = (text) => {
    const searchText = text.toLowerCase();
    const filteredItems = songs.filter((item) => {
      return item.name.toLowerCase().includes(searchText);
    });
    setSearchResult(filteredItems);
  };

  const playTrack = async () => {};

  const songCount = songs.length;

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
              placeholder="Find in Liked songs"
              placeholderTextColor={"#979593"}
              style={{ fontWeight: "500", width: "100%", color: "white" }}
            />
          </Pressable>

          <Pressable style={styles.searchButton}>
            <TextWhite>Sort</TextWhite>
          </Pressable>
        </Pressable>

        <View style={{ height: 20 }} />
        <View style={{ marginHorizontal: 10 }}>
          <TextWhite style={{ fontSize: 18, fontWeight: "bold" }}>
            Liked Songs
          </TextWhite>
          <TextWhite style={{ fontSize: 13, marginTop: 5 }}>
            {songCount} songs
          </TextWhite>
        </View>

        <Pressable style={styles.handleButton}>
          <Pressable style={styles.ArrowDownIcon}>
            <AntDesign name="arrowdown" size={20} color="#614385" />
          </Pressable>

          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Entypo name="shuffle" size={24} color="#1DB954" />
            <Pressable onPress={playTrack} style={styles.controlPlayIcon}>
              <Entypo name="controller-play" size={24} color="#614385" />
            </Pressable>
          </View>
        </Pressable>

        <ScrollView>
          {searchResult.map((item) => (
            <View key={item.id} style={styles.songsItemsContainer}>
              <View style={styles.songsItemsContent}>
                <Image
                  style={{ width: 60, height: 60, borderRadius: 5 }}
                  source={{ uri: item.image }}
                />
                <View>
                  <TextWhite style={styles.nameSong}>{item.name}</TextWhite>
                  <Text style={styles.nameArtists}>{item.artist}</Text>
                </View>
              </View>
              <TouchableOpacity onPress={() => toggleMenu(item.id)}>
                <Ionicons name="md-ellipsis-vertical" size={24} color="white" />
              </TouchableOpacity>
              {menuVisibility[item.id] && (
                <Animatable.View // Sử dụng Animated.View từ thư viện react-native-animatable
                  animation="slideInRight" // Hiệu ứng xuất hiện khi menu mở
                  duration={400} // Thời gian xuất hiện (milliseconds)
                  style={styles.menuContainer}
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
                  {/* Thêm các mục menu khác ở đây */}
                </Animatable.View>
              )}
            </View>
          ))}
        </ScrollView>
      </View>
    </LinearGradient>
  );
};

export default LikedSongsScreen;

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
  searchButton: {
    marginHorizontal: 10,
    backgroundColor: "#42275a",
    padding: 10,
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
