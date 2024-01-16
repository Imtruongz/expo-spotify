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
import SearchItem from "../searchItem.json";
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
    <LinearGradient colors={["#131624", "#040306"]}>
      <SafeAreaView>
        <ScrollView>
          <TextWhite className="mx-5 mt-3 text-2xl font-bold">Search</TextWhite>
          <Pressable className="mx-3 my-5 flex-row items-center rounded-md border-[2px]  border-[#979593] p-2">
            <AntDesign name="search1" size={24} color="#979593" />
            <TextInput
              onChangeText={(text) => handleSearch(text)}
              placeholder="Artists, songs, albums or podcast"
              placeholderTextColor={"#979593"}
              className="ml-2 w-full text-base font-semibold text-[#979593]"
            />
          </Pressable>

          <View className="mx-3">
            <TextWhite className="text-xl font-bold">
              What do you want to listen to ?
            </TextWhite>
          </View>

          <View className="h-[700px] flex-row flex-wrap justify-center">
            {searchResult.map((item) => (
              <TouchableOpacity
                key={item.id}
                onPress={UpdatingButton}
                style={[{ backgroundColor: item.color }]}
                className="mx-3 my-3 h-20 w-[43%] flex-row justify-between rounded-lg p-2"
              >
                <TextWhite className="text-base font-bold">
                  {item.name}
                </TextWhite>
                <Image
                  className="h-14 w-14 rotate-12 rounded-md"
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
