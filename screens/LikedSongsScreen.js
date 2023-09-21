import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState, useEffect, useContext, useRef } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

import songsData from "../data-json/songs.json";

const LikedSongsScreen = () => {
  const navigation = useNavigation();
  const [input, setInput] = useState("");
  const [songs, setSongs] = useState(songsData);
  const [searchResult, setSearchResult] = useState(songsData);

  const handleSearch = (text) => {
    const searchText = text.toLowerCase();
    const filteredItems = songs.filter((item) => {
      return item.name.toLowerCase().includes(searchText);
    });
    setSearchResult(filteredItems);
  };

  useEffect(() => {
    // getSavedTracks();
  }, []);

  const playTrack = async () => {
    // if (savedTracks.length > 0) {
    //   setCurrentTrack(savedTracks[0]);
    // }
    // await play(savedTracks[0]);
  };

  return (
    <LinearGradient colors={["#614385", "#516395"]} style={{ flex: 1 }}>
      <View style={{ flex: 1, marginTop: 50 }}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={{ marginHorizontal: 10 }}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </Pressable>

        <Pressable
          style={{
            marginHorizontal: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 9,
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
              height: 38,
            }}
          >
            <AntDesign name="search1" size={20} color="white" />
            <TextInput
              onChangeText={(text) => handleSearch(text)}
              placeholder="Find in Liked songs"
              placeholderTextColor={"#979593"}
              style={{ fontWeight: "500", width: "100%", color: "white" }}
            />
          </Pressable>

          <Pressable
            style={{
              marginHorizontal: 10,
              backgroundColor: "#42275a",
              padding: 10,
              borderRadius: 3,
              height: 38,
            }}
          >
            <Text style={{ color: "white" }}>Sort</Text>
          </Pressable>
        </Pressable>

        <View style={{ height: 20 }} />
        <View style={{ marginHorizontal: 10 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold", color: "white" }}>
            Liked Songs
          </Text>
          <Text style={{ color: "white", fontSize: 13, marginTop: 5 }}>
            430 songs
          </Text>
        </View>

        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginHorizontal: 10,
            marginBottom: 20,
          }}
        >
          <Pressable
            style={{
              width: 30,
              height: 30,
              borderRadius: 15,
              backgroundColor: "#1DB954",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <AntDesign name="arrowdown" size={20} color="white" />
          </Pressable>

          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <MaterialCommunityIcons
              name="cross-bolnisi"
              size={24}
              color="#1DB954"
            />
            <Pressable
              onPress={playTrack}
              style={{
                width: 60,
                height: 60,
                borderRadius: 30,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#1DB954",
              }}
            >
              <Entypo name="controller-play" size={24} color="white" />
            </Pressable>
          </View>
        </Pressable>

        <ScrollView>
          {searchResult.map((item) => (
            <View
              key={item.id}
              style={{
                padding: 10,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <Image
                  style={{ width: 60, height: 60, borderRadius: 5 }}
                  source={{ uri: item.image }}
                />
                <View>
                  <Text style={styles.nameSong}>{item.name}</Text>
                  <Text style={styles.nameArtists}>{item.artist}</Text>
                </View>
              </View>
              <Ionicons name="md-ellipsis-vertical" size={24} color="white" />
            </View>
          ))}
        </ScrollView>
      </View>
    </LinearGradient>
  );
};

export default LikedSongsScreen;

const styles = StyleSheet.create({
  nameSong: {
    fontSize: 13,
    fontWeight: "bold",
    color: "white",
    marginTop: 7,
  },
  nameArtists: {
    fontSize: 12,
    fontWeight: "500",
    color: "#E0E0E0",
    marginTop: 7,
  },
});
