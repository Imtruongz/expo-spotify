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
          <Ionicons name="arrow-back" size={24} color="white" />
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
          </View>

          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Entypo name="shuffle" size={24} color="white" />
            <Pressable onPress={playTrack} style={styles.controlPlayIcon}>
              <Entypo name="controller-play" size={24} color="white" />
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
              <View style={styles.itemContainer}>
                <Image
                  style={{ width: 60, height: 60, borderRadius: 5 }}
                  source={{ uri: item.image }}
                />
                <View style={{ alignItems: "flex-start" }}>
                  <TextWhite style={styles.nameSong}>{item.nameSong}</TextWhite>
                  <Text style={styles.nameArtists}>{item.artist}</Text>
                </View>
              </View>
              <TouchableOpacity onPress={() => toggleMenu(item.id)}>
                <Ionicons name="md-ellipsis-vertical" size={24} color="white" />
              </TouchableOpacity>
              {menuVisibility[item.id] && (
                <Animatable.View
                  animation="slideInRight"
                  duration={400}
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
                </Animatable.View>
              )}
            </View>
          )}
          keyExtractor={(item) => item.idSong.toString()}
        />

        <View style={{ height: 50 }} />
      </View>
    </>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  header: {
    flex: 1,
    paddingTop: 60,
  },
  bottom: {
    flex: 1,
    backgroundColor: "black",
  },
  imgAvatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderColor: "white",
    borderWidth: 2,
    resizeMode: "cover",
    marginLeft: 25,
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
  nameUser: {
    fontWeight: "bold",
    fontSize: 25,
    marginLeft: 20,
  },
  infoFollower: {
    flexDirection: "row",
    marginTop: 10,
    marginLeft: 20,
    gap: 5,
  },
  editButton: {
    width: 60,
    marginTop: 15,
    marginLeft: 55,
    borderRadius: 40,
    borderColor: "white",
    borderWidth: 1,
    paddingHorizontal: 17,
    paddingVertical: 6,
    fontWeight: "bold",
  },
  textTitle: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 12,
  },
  itemContainer: {
    padding: 7,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
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
});
