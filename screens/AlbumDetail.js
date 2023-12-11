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
  const IPv4 = "192.168.0.9";
  const { album } = route.params;

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
      <LinearGradient colors={album.gradientColors} className="flex-[0.9]">
        <SafeAreaView>
          <Pressable onPress={() => navigation.goBack()} className="mx-4 mt-3">
            <AntDesign name="left" size={22} color="white" />
          </Pressable>
          <View className="justify-center items-center">
            <Image
              className="w-44 h-44 rounded-xl"
              source={{ uri: album.image }}
            />
            <TextWhite className="text-center text-xl font-bold my-3">
              {album.name}
            </TextWhite>
          </View>
          <View className="mx-4">
            <TextWhite className="text-lg font-bold">{album.artist}</TextWhite>
          </View>

          <Pressable className="flex-row items-center justify-between ml-4 mr-1">
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
          data={album.songs}
          Vertical
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Info", { song: item })}
              className="p-3 flex-row items-center justify-between"
            >
              <View className="items-start">
                <TextWhite className="text-base font-bold mt-1">
                  {item.name}
                </TextWhite>
                <Text className="text-xs font-semibold text-[#E0E0E0] mt-2">
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
                      <TextWhite className="font-bold py-2">
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
