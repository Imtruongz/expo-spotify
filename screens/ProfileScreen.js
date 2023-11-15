import {
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
  const IPv4 = "192.168.1.7";

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
            <View className="flex-row flex-wrap gap-1 px-5 py-2">
              <TextWhite className="font-bold">0</TextWhite>
              <Text className="text-[#E0E0E0]">follower</Text>
              <TextWhite className="font-bold">0</TextWhite>
              <Text className="text-[#E0E0E0]">following</Text>
              <TextWhite className="font-bold">{playList.length}</TextWhite>
              <Text className="text-[#E0E0E0]">songs</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity onPress={UpdatingButton}>
          <TextWhite className="text-center w-14 mt-4 ml-14 p-[6px] font-bold rounded-3xl border-2 border-white border-solid">
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
              className=" flex-row items-center justify-between"
              onPress={() => navigation.navigate("Info", { song: item })}
            >
              <View className="p-3 flex-row items-center justify-between gap-3">
                <Image
                  className="w-14 h-14 rounded"
                  source={{ uri: item.image }}
                />
                <View>
                  <TextWhite className="text-sm font-bold text-[#E0E0E0]">
                    {item.name}
                  </TextWhite>
                  <Text className="text-xs font-semibold text-[#E0E0E0] mt-1">
                    {item.artist}
                  </Text>
                </View>
              </View>
              <View className="flex-row items-center gap-3">
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
                      <TextWhite className="font-bold text-sm mr-2">
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
        <View className="h-14" />
      </View>
    </SafeAreaProvider>
  );
};

export default ProfileScreen;
