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
import React, { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";

import { Entypo, Ionicons, AntDesign } from "@expo/vector-icons";

import TextWhite from "../components/TextWhite";

const CategoriScreen = ({ route }) => {
  const { categoris } = route.params;
  const navigation = useNavigation();
  const [categori, setCategori] = useState([]);
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
    setCategori(filteredItems);
  };

  const playTrack = async () => {};

  return (
    <LinearGradient colors={["#131624", "#040306"]} style={{ flex: 1 }}>
      <View style={{ flex: 1, marginTop: 20 }}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={{ marginHorizontal: 10, marginVertical: 5 }}
        >
          <AntDesign name="left" size={22} color="white" />
        </Pressable>

        <Pressable style={styles.searchContainer}>
          <Pressable style={styles.searchInput}>
            <AntDesign name="search1" size={24} color="#979593" />
            <TextInput
              onChangeText={(text) => handleSearch(text)}
              placeholder="What do you want to listen to?"
              placeholderTextColor={"#979593"}
              style={{
                fontWeight: "500",
                fontSize: 16,
                width: "100%",
                color: "#979593",
              }}
            />
          </Pressable>
        </Pressable>

        <View style={{ height: 20 }} />
        <View style={{ marginHorizontal: 10, marginVertical: 5 }}>
          <TextWhite style={{ fontSize: 18, fontWeight: "bold" }}>
            {categoris.name}
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
            <TouchableOpacity onPress={playTrack}>
              <Ionicons name="play-circle" size={70} color="#1DB954" />
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
                  <Animatable.View animation="slideInRight" duration={400}>
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
    backgroundColor: "#131624",
    padding: 9,
    flex: 1,
    borderRadius: 3,
    height: 50,
    borderWidth: 1,
    borderColor: "#979593",
  },
  handleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginBottom: 20,
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
