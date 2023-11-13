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
import * as Animatable from "react-native-animatable";

import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";

import TextWhite from "../components/TextWhite";

const AlbumDetail = ({ route }) => {
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
      <LinearGradient colors={album.gradientColors} className="flex-[0.9] pt-5">
        <Pressable onPress={() => navigation.goBack()} className="mx-4">
          <AntDesign name="left" size={22} color="white" />
        </Pressable>
        <View className="justify-center items-center">
          <Image className="w-44 h-44 rounded" source={{ uri: album.image }} />
          <TextWhite className="text-center text-xl font-bold my-3">
            {album.name}
          </TextWhite>
        </View>
        <View className="mx-4">
          <TextWhite className="text-lg font-bold">{album.artist}</TextWhite>
        </View>

        <Pressable className="flex-row items-center justify-between mx-4">
          <View className="flex-row items-center gap-7">
            <AntDesign name="hearto" size={24} color="white" />
            <AntDesign name="download" size={24} color="white" />
            <Ionicons name="md-ellipsis-vertical" size={24} color="white" />
          </View>

          <View className="flex-row items-center gap-2">
            <Entypo name="shuffle" size={24} color="#1DB954" />
            <TouchableOpacity
              onPress={playTrack}
              className="w-14 h-14 rounded-[30px] justify-center items-center bg-[#1DB954]"
            >
              <Entypo name="controller-play" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </Pressable>
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
                      <TextWhite className="font-bold">
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
