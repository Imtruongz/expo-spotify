import {
  Image,
  Pressable,
  ScrollView,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
import SearchItem from "../data-json/searchItem.json";
import { SafeAreaProvider } from "react-native-safe-area-context";

import TextWhite from "../components/TextWhite";

const LikedSongsScreen = () => {
  const [searchItem, setsearchItem] = useState(SearchItem);
  const [searchResult, setSearchResult] = useState(SearchItem);

  const handleSearch = (text) => {
    const searchText = text.toLowerCase();
    const filteredItems = searchItem.filter((item) => {
      return item.name.toLowerCase().includes(searchText);
    });
    setSearchResult(filteredItems);
  };

  return (
    <SafeAreaProvider>
      <LinearGradient colors={["#131624", "#040306"]} clasName="flex-1">
        <ScrollView className="mt-4">
          <TextWhite className="mx-5 font-bold text-2xl">Search</TextWhite>
          <Pressable className="flex-row items-center justify-between mx-3 my-5">
            <Pressable className="w-full flex-row items-center bg-[#131624] p-2 rounded-sm h-12 border-2 border-[#979593] border-solid">
              <AntDesign name="search1" size={25} color="#979593" />
              <TextInput
                onChangeText={(text) => handleSearch(text)}
                placeholder="Artists, songs, albums or podcast"
                placeholderTextColor={"#979593"}
                className="text-base w-full ml-2 font-semibold text-[#979593]"
              />
            </Pressable>
          </Pressable>

          <View className="mx-3">
            <TextWhite className="text-xl font-bold">
              What do you want to listen to ?
            </TextWhite>
          </View>

          <View className="flex-row flex-wrap items-center justify-between mb-12">
            {searchResult.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={[{ backgroundColor: item.color }]}
                className="mb-3 p-3 flex-row justify-around gap-3 mx-3 my-3 rounded-md w-40 h-24"
              >
                <TextWhite className="text-base font-bold">
                  {item.name}
                </TextWhite>
                <Image
                  className="w-14 h-14 rotate-12 m-1 rounded-md"
                  source={{ uri: item.image }}
                />
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaProvider>
  );
};

export default LikedSongsScreen;