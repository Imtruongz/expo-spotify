import {
  FlatList,
  Image,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";
import { Entypo, Ionicons, AntDesign } from "@expo/vector-icons";
import TextWhite from "../components/TextWhite";

const CategoriScreen = ({ route }) => {
  const { categoris } = route.params;
  const navigation = useNavigation();
  const [categori, setCategori] = useState([]);
  const [menuVisibility, setMenuVisibility] = useState({});

  const toggleMenu = (itemId) => {
    setMenuVisibility({
      ...menuVisibility,
      [itemId]: !menuVisibility[itemId],
    });
  };

  const handleSearch = (text) => {
    const searchText = text.toLowerCase();
    const filteredItems = categori.filter((item) => {
      return item.name.toLowerCase().includes(searchText);
    });
    setCategori(filteredItems);
  };

  const playTrack = async () => {};

  return (
    <LinearGradient colors={["#131624", "#040306"]} className="flex-1">
      <View className="mt-5">
        <Pressable onPress={() => navigation.goBack()} className="mx-3 my-3">
          <AntDesign name="left" size={22} color="white" />
        </Pressable>

        <Pressable className="flex-row items-center p-2 rounded-md border-[2px] border-[#979593] mx-3">
          <AntDesign name="search1" size={24} color="#979593" />
          <TextInput
            onChangeText={(text) => handleSearch(text)}
            placeholder="What do you want to listen to?"
            placeholderTextColor={"#979593"}
            className="font-semibold text-base w-full text-[#979593] ml-2"
          />
        </Pressable>

        <View className="ml-5 mt-3">
          <TextWhite className="text-lg font-bold">{categoris.name}</TextWhite>
        </View>

        <Pressable className="flex-row items-center justify-between ml-2">
          <View className="flex-row items-center gap-x-5">
            <AntDesign name="hearto" size={24} color="white" />
            <AntDesign name="download" size={24} color="white" />
            <Ionicons name="md-ellipsis-vertical" size={24} color="white" />
          </View>

          <View className="flex-row items-center gap-2">
            <Entypo name="shuffle" size={24} color="white" />
            <TouchableOpacity onPress={playTrack}>
              <Ionicons name="play-circle" size={70} color="#1DB954" />
            </TouchableOpacity>
          </View>
        </Pressable>

        <FlatList
          data={categoris.songs}
          Vertical
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View
              key={item.id}
              className="p-2 flex-row items-center justify-between "
            >
              <View className="flex-row items-center gap-3">
                <Image
                  className="w-14 h-14 rounded-md"
                  source={{ uri: item.image }}
                />
                <View>
                  <TextWhite className="text-sm font-bold text-[#E0E0E0]">
                    {item.nameSong}
                  </TextWhite>
                  <Text className="text-xs font-semibold text-[#E0E0E0] mt-1">
                    {item.artist}
                  </Text>
                </View>
              </View>
              <TouchableOpacity onPress={() => toggleMenu(item.idSong)}>
                <Ionicons name="md-ellipsis-vertical" size={24} color="white" />
              </TouchableOpacity>
              {menuVisibility[item.idSong] && (
                <Animatable.View animation="slideInRight" duration={400}>
                  <TouchableOpacity>
                    <TextWhite className="font-bold">Add to playlist</TextWhite>
                  </TouchableOpacity>
                </Animatable.View>
              )}
            </View>
          )}
          keyExtractor={(item) => item.idSong.toString()}
        />
      </View>
    </LinearGradient>
  );
};

export default CategoriScreen;
