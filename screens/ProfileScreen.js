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
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import TextWhite from "../components/TextWhite";
import { Ionicons } from "@expo/vector-icons";

const ProfileScreen = () => {
  const IPv4 = "192.168.42.248";

  const [isLoading, setisLoading] = useState(true);
  const [playList, setplayList] = useState([]);
  const [menuVisibility, setMenuVisibility] = useState({});

  useFocusEffect(
    React.useCallback(() => {
      getPlaylist();
    }, [])
  );

  const getPlaylist = async () => {
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
          getPlaylist();
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

  const navigation = useNavigation();

  return (
    <SafeAreaProvider>
      <LinearGradient
        colors={["#8B8B8B", "#000000"]}
        className="flex-[0.4] py-4"
      >
        <View className="flex-row justify-end">
          <TouchableOpacity onPress={UpdatingButton} className="mr-4">
            <Ionicons name="settings-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <View className="flex-row w-1/2">
          <Image
            className="w-32 h-32 rounded-[64px] ml-6"
            source={{
              uri: "https://live.staticflickr.com/65535/53280456787_5b57ceca8e_s.jpg",
            }}
          />
          <View>
            <TextWhite className="font-bold text-2xl ml-5">
              Nguyễn Việt Trường
            </TextWhite>
            <View className="flex-row gap-2 px-5 py-2">
              <TextWhite className="font-bold">0</TextWhite>
              <Text className="text-[#E0E0E0]">follower</Text>
              <TextWhite className="font-bold">0</TextWhite>
              <Text className="text-[#E0E0E0]">following</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity onPress={UpdatingButton}>
          <TextWhite className="w-14 mt-4 ml-14 rounded-[40px] px-4 py-2 font-bold border-2 border-white border-solid">
            Edit
          </TextWhite>
        </TouchableOpacity>
      </LinearGradient>
      <View className="flex-1 bg-black">
        <TextWhite className="text-center text-xl font-bold mb-4">
          Your playlist
        </TextWhite>
        <FlatList
          data={playList}
          Vertical
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              className="p-2 flex-row items-center justify-between"
              onPress={() => navigation.navigate("Info", { song: item })}
            >
              <View className="p-2 flex-row items-center justify-between gap-3">
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
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
        <View style={{ height: 50 }} />
      </View>
    </SafeAreaProvider>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  header: {
    flex: 0.4,
    paddingTop: 15,
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
