import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Animatable from "react-native-animatable";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import TextWhite from "../components/TextWhite";

const AlbumDetail = ({ route }) => {
  const IPv4 = "192.168.43.57"; //Thay đổi địa chỉ IP ở đây
  const { artist } = route.params;

  const navigation = useNavigation();
  const [menuVisibility, setMenuVisibility] = useState({});

  const toggleMenu = (itemId) => {
    setMenuVisibility({
      ...menuVisibility,
      [itemId]: !menuVisibility[itemId],
    });
  };

  const addSong = (song) => {
    let urlAPI = `http://${IPv4}:5000/playlist`;

    const payload = {
      id: song.id,
      name: song.name,
      artist: song.artist,
      image: song.image,
      path: song.path,
    };

    console.log("Dữ liệu gửi lên server:", payload); // TEtst

    fetch(urlAPI, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (res.ok && res.status === 201) {
          alert("Added to your playlist");
        } else {
          // Thêm xử lý cho trường hợp server trả về lỗi
          return res.json().then((data) => {
            throw new Error("Lỗi từ server: " + data.message);
          });
        }
      })
      .catch((err) => {
        alert("This songs has been added to your playlist.");
      });
  };

  return (
    <>
      <LinearGradient colors={artist.gradientColors} className="flex-[0.9]">
        <SafeAreaView>
          <Pressable onPress={() => navigation.goBack()} className="mx-4 mt-3">
            <AntDesign name="left" size={22} color="white" />
          </Pressable>
          <View className="items-center justify-center">
            <Image
              className="h-44 w-44 rounded-xl"
              source={{ uri: artist.image }}
            />
            <TextWhite className="my-3 text-center text-xl font-bold">
              {artist.artist}
            </TextWhite>
          </View>
          {/* <View className="mx-4">
            <TextWhite className="text-lg font-bold">{artist.artist}</TextWhite>
          </View> */}

          <Pressable className="ml-4 mr-1 flex-row items-center justify-between">
            <View className="flex-row items-center gap-7">
              <AntDesign name="hearto" size={24} color="white" />
              <AntDesign name="download" size={24} color="white" />
              <Ionicons name="md-ellipsis-vertical" size={24} color="white" />
            </View>

            <View className="flex-row items-center gap-2">
              <Entypo name="shuffle" size={24} color="#1DB954" />
              <TouchableOpacity>
                <Ionicons name="play-circle" size={70} color="#1DB954" />
              </TouchableOpacity>
            </View>
          </Pressable>
        </SafeAreaView>
      </LinearGradient>
      <View className="flex-1 bg-black">
        <FlatList
          data={artist.songs}
          Vertical
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Info", { song: item })}
              className="flex-row items-center justify-between p-3"
            >
              <View className="items-start">
                <TextWhite className="mt-1 text-base font-bold">
                  {item.name}
                </TextWhite>
                <Text className="mt-2 text-xs font-semibold text-[#E0E0E0]">
                  {item.artist}
                </Text>
              </View>
              <View className="flex-row items-center gap-3">
                <TouchableOpacity
                  className="py-2 pl-2"
                  onPress={() => toggleMenu(item.idSong)}
                >
                  <Ionicons
                    name="md-ellipsis-vertical"
                    size={24}
                    color="white"
                  />
                </TouchableOpacity>
                {menuVisibility[item.idSong] && (
                  <Animatable.View animation="slideInRight" duration={400}>
                    <TouchableOpacity onPress={() => addSong(item)}>
                      <TextWhite className="py-2 font-bold">
                        Add to playlist
                      </TextWhite>
                    </TouchableOpacity>
                  </Animatable.View>
                )}
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.idSong.toString()}
        />
      </View>
    </>
  );
};

export default AlbumDetail;
