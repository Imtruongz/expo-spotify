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
import TextWhite from "../components/TextWhite";
import { Ionicons } from "@expo/vector-icons";

const ProfileScreen = () => {
  const [isLoading, setisLoading] = useState(true);
  const [playList, setplayList] = useState([]);
  const [menuVisibility, setMenuVisibility] = useState({});

  useEffect(() => {
    getPlaylist();
  }, []);

  const getPlaylist = async () => {

    let IPv4 = "192.168.42.248";

    try {
      const response = await fetch(`http://${IPv4}:5000/playlist`); //load data
      const json = await response.json(); //change data to json
      setplayList(json);
    } catch (err) {
      console.log(err);
    } finally {
      //ket thuc qua trinh load data , ke ca say ra loi thi cung se roi vao ham nay de chay
      setisLoading(false); //trang thai cua ham nay se khong load nua
    }
  };

  const deleteSong = (id) => {
    let urlAPI = `http://${IPv4}:5000/playlist/` + id;
    fetch(urlAPI, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status == 200) {
          alert("Removed to your playlist");
          console.log(`Xoá thành công bài hát có id là: ${id}`);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const toggleMenu = (itemId) => {
    setMenuVisibility({
      ...menuVisibility,
      [itemId]: !menuVisibility[itemId],
    });
  };

  function UpdatingButton() {
    Alert.alert("Updating");
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
          <Image
            style={styles.imgAvatar}
            source={{
              uri: "https://live.staticflickr.com/65535/53280456787_5b57ceca8e_s.jpg",
            }}
          />
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
                  source={{ uri: item.image }}
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
                    <TouchableOpacity onPress={() => deleteSong(item.id)}>
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
