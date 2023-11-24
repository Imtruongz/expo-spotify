import {
  Image,
  Pressable,
  ScrollView,
  TextInput,
  View,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
import SearchItem from "../data-json/searchItem.json";
import { SafeAreaView } from "react-native-safe-area-context";

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

  function UpdatingButton() {
    Alert.alert("Updating");
  }

  return (
      <LinearGradient colors={["#131624", "#040306"]} clasName="flex-1">
        <SafeAreaView>
        <ScrollView>
          <TextWhite className="mx-5 font-bold text-2xl">Search</TextWhite>
          <Pressable className="flex-row items-center p-2 rounded-md border-[2px] border-[#979593]  mx-3 my-5">
          <AntDesign name="search1" size={24} color="#979593" />
          <TextInput
            onChangeText={(text) => handleSearch(text)}
            placeholder="Artists, songs, albums or podcast"
            placeholderTextColor={"#979593"}
            className="font-semibold text-base w-full text-[#979593] ml-2"
          />
        </Pressable>
          
          <View className="mx-3">
            <TextWhite className="text-xl font-bold">
              What do you want to listen to ?
            </TextWhite>
          </View>

          <View className="flex-row flex-wrap justify-center mb-12">
            {searchResult.map((item) => (
              <TouchableOpacity
                key={item.id}
                onPress={UpdatingButton}
                style={[{ backgroundColor: item.color }]}
                className="flex-row justify-between mx-3 my-3 p-2 rounded-lg w-[43%] h-20"
              >
                <TextWhite className="text-base font-bold">
                  {item.name}
                </TextWhite>
                <Image
                  className="w-14 h-14 rotate-12 rounded-md"
                  source={{ uri: item.image }}
                />
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
        </SafeAreaView>
      </LinearGradient>
  );
};

export default LikedSongsScreen;
