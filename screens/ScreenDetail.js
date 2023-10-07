import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";

import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import TextWhite from "../components/TextWhite";

const DetailScreen = ({ route }) => {
  const { album } = route.params;

  const navigation = useNavigation();

  const [menuVisibility, setMenuVisibility] = useState({});

  const toggleMenu = (itemId) => {
    setMenuVisibility({
      ...menuVisibility,
      [itemId]: !menuVisibility[itemId],
    });
  };

  const playTrack = async () => {};

  return (
    <>
      <LinearGradient colors={["#00cc00", "#000000"]} style={styles.header}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={{ marginHorizontal: 14 }}
        >
          <AntDesign name="left" size={22} color="white" />
        </Pressable>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Image
            style={{ width: 180, height: 180, borderRadius: 5 }}
            source={{ uri: album.image }}
          />
          <TextWhite style={styles.textTitle}>{album.name}</TextWhite>
        </View>
        <View style={{ marginHorizontal: 14 }}>
          <TextWhite style={{ fontSize: 18, fontWeight: "bold" }}>
            {album.artist}
          </TextWhite>
        </View>

        <Pressable style={styles.handleButton}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 28 }}>
            <AntDesign name="hearto" size={24} color="white" />
            <AntDesign name="download" size={24} color="white" />
            <Ionicons name="md-ellipsis-vertical" size={24} color="white" />
          </View>

          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Entypo name="shuffle" size={24} color="#1DB954" />
            <Pressable onPress={playTrack} style={styles.controlPlayIcon}>
              <Entypo name="controller-play" size={24} color="black" />
            </Pressable>
          </View>
        </Pressable>
      </LinearGradient>
      <View style={styles.bottom}>
        <FlatList
          data={album.songs}
          Vertical
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <View style={{ alignItems: "flex-start" }}>
                <TextWhite style={styles.nameSong}>{item.nameSong}</TextWhite>
                <Text style={styles.nameArtists}>{item.artist}</Text>
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
    </>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  header: {
    flex: 0.9,
    paddingTop: 60,
  },
  bottom: {
    flex: 1,
    backgroundColor: "black",
  },
  nameSong: {
    fontSize: 17,
    fontWeight: "bold",
    marginTop: 7,
  },
  nameArtists: {
    fontSize: 12,
    fontWeight: "500",
    color: "#E0E0E0",
    marginTop: 7,
  },
  textTitle: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 12,
  },
  itemContainer: {
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  handleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 14,
  },
  controlPlayIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1DB954",
  },
  menuItem: {
    fontWeight: "bold",
  },
});
