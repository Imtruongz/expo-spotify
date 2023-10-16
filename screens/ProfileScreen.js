import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from "react-native-animatable";
import playListData from "../data-json/playlist.json";
import TextWhite from "../components/TextWhite";
import { Ionicons } from "@expo/vector-icons";

const ProfileScreen = () => {
  const AvtImg = require("../assets/avatar.png");
  const images = {
    ShapeOfYouImg: require("../assets/songs/shapeofyou.jpeg"),
  };

  const [playList, setplayList] = useState(playListData);
  const [menuVisibility, setMenuVisibility] = useState({});

  const toggleMenu = (itemId) => {
    setMenuVisibility({
      ...menuVisibility,
      [itemId]: !menuVisibility[itemId],
    });
  };

  function UpdatingButton() {
    Alert.alert("Updating");
  }

  function handleDelete(songId) {
    const updatedPlayList = playList.filter((song) => song.id !== songId);
    setplayList(updatedPlayList);
  }

  return (
    <>
      <LinearGradient colors={["#00cc00", "#000000"]} style={styles.header}>
        <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
          <TouchableOpacity
            onPress={UpdatingButton}
            style={{ marginRight: 15 }}
          >
            <Ionicons name="settings-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: "row", width: "50%" }}>
          <Image style={styles.imgAvatar} source={AvtImg} />
          <View>
            <TextWhite style={styles.nameUser}>Nguyễn Việt Trường</TextWhite>
            <View style={styles.infoFollower}>
              <TextWhite style={{ fontWeight: "bold" }}>0</TextWhite>
              <Text style={{ color: "#E0E0E0" }}>follower</Text>
              <TextWhite style={{ fontWeight: "bold" }}>0</TextWhite>
              <Text style={{ color: "#E0E0E0" }}>following</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity onPress={UpdatingButton}>
          <TextWhite style={styles.editButton}>Edit</TextWhite>
        </TouchableOpacity>
      </LinearGradient>
      <View style={styles.bottom}>
        <TextWhite style={styles.textTitle}>Your playlist</TextWhite>
        <FlatList
          data={playList}
          Vertical
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <View style={styles.itemContainer}>
                <Image
                  style={{ width: 60, height: 60, borderRadius: 5 }}
                  source={images[item.image]}
                />
                <View style={{ alignItems: "flex-start" }}>
                  <TextWhite style={styles.nameSong}>{item.name}</TextWhite>
                  <Text style={styles.nameArtists}>{item.artist}</Text>
                </View>
              </View>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 12 }}
              >
                <TouchableOpacity onPress={() => toggleMenu(item.id)}>
                  <Ionicons
                    name="md-ellipsis-vertical"
                    size={24}
                    color="white"
                  />
                </TouchableOpacity>
                {menuVisibility[item.id] && (
                  <Animatable.View animation="slideInRight" duration={400}>
                    <TouchableOpacity onPress={() => handleDelete(item.id)}>
                      <TextWhite style={styles.menuItem}>
                        Remove to playlist
                      </TextWhite>
                    </TouchableOpacity>
                  </Animatable.View>
                )}
              </View>
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
        <View style={{ height: 50 }} />
      </View>
    </>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  header: {
    flex: 0.4,
    paddingTop: 20,
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
    marginBottom: 15,
  },
  itemContainer: {
    padding: 7,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  menuItem: {
    fontWeight: "bold",
  },
});
