import {
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Entypo } from "@expo/vector-icons";
import TextWhite from "../components/TextWhite";

const LibraryScreen = () => {
  const navigation = useNavigation();

  function UpdatingButton() {
    Alert.alert("Updating");
  }

  return (
    <SafeAreaProvider>
      <LinearGradient colors={["#131624", "#040306"]} className="flex-1">
        <ScrollView className="mt-5">
          <View className="mx-3 flex-row items-center justify-between mb-7">
            <TextWhite className="ml-3 text-2xl font-bold">
              Your Library
            </TextWhite>
            <View className="flex-row items-center">
              <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
                <Image
                  className="w-10 h-10 rounded-[20px] mr-2"
                  source={{
                    uri: "https://live.staticflickr.com/65535/53280456787_5b57ceca8e_s.jpg",
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View className="w-[90%] h-52 bg-[#282828] rounded-lg mx-5  px-4 flex-col gap-y-3 mb-12">
            <View className="flex-row items-center gap-2">
              <Entypo name="spotify" size={24} color="green" />
              <TextWhite>Tips</TextWhite>
            </View>
            <TextWhite className="font-bold text-lg">
              Create your first playlist
            </TextWhite>
            <TextWhite>It's easy, we will help you</TextWhite>
            <TouchableOpacity
              onPress={UpdatingButton}
              className="bg-white w-1/2 rounded-[50px] p-2 justify-center items-center"
            >
              <Text>Create playlist</Text>
            </TouchableOpacity>
          </View>
          <View className="w-[90%] h-52 bg-[#282828] rounded-lg mx-5 px-4 flex-col gap-y-3">
            <View className="flex-row items-center gap-2">
              <Entypo name="spotify" size={24} color="green" />
              <TextWhite>Tips</TextWhite>
            </View>
            <TextWhite className="font-bold text-lg">
              Let's find some podcasts to follow
            </TextWhite>
            <TextWhite>We'll keep you updated on new episodes</TextWhite>
            <TouchableOpacity
              onPress={UpdatingButton}
              className="bg-white w-1/2 rounded-[50px] p-2 justify-center items-center"
            >
              <Text>Browse podcasts</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaProvider>
  );
};

export default LibraryScreen;
