import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  Pressable,
  TouchableOpacity,
  Alert, // Thêm import này
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import TextWhite from "../components/TextWhite";
import albumData from "../data-json/album.json";
import * as Animatable from "react-native-animatable";


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

  return (
    <>
      <LinearGradient colors={["#00cc00", "#000000"]} style={styles.header}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={{ marginHorizontal: 10 }}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </Pressable>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Image
            style={{ width: 200, height: 200, borderRadius: 5 }}
            source={{ uri: album.image }}
          />
          <TextWhite style={styles.textTitle}>{album.name}</TextWhite>
        </View>
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

// Các phần còn lại không thay đổi

const styles = StyleSheet.create({
  header: {
    flex: 0.7,
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
});
