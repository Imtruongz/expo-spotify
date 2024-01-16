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
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo } from "@expo/vector-icons";
import TextWhite from "../components/TextWhite";

const LibraryScreen = () => {
  const navigation = useNavigation();

  function UpdatingButton() {
    Alert.alert("Updating");
  }

  return (
    <LinearGradient colors={["#131624", "#040306"]} className="flex-1">
      <SafeAreaView>
        <ScrollView>
          <View className="mx-3 mb-7 mt-3 flex-row items-center justify-between">
            <TextWhite className="ml-3 text-2xl font-bold">
              Your Library
            </TextWhite>
            <View className="flex-row items-center">
              <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
                <Image
                  className="mr-2 h-10 w-10 rounded-[20px]"
                  source={{
                    uri: "https://live.staticflickr.com/65535/53280456787_5b57ceca8e_s.jpg",
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View className="mx-5 mb-12 h-52 w-[90%] flex-col  gap-y-3 rounded-lg bg-[#282828] px-4">
            <View className="flex-row items-center gap-2">
              <Entypo name="spotify" size={24} color="green" />
              <TextWhite>Tips</TextWhite>
            </View>
            <TextWhite className="text-lg font-bold">
              Create your first playlist
            </TextWhite>
            <TextWhite>It's easy, we will help you</TextWhite>
            <TouchableOpacity
              onPress={UpdatingButton}
              className="w-1/2 items-center justify-center rounded-[50px] bg-white p-2"
            >
              <Text>Create playlist</Text>
            </TouchableOpacity>
          </View>
          <View className="mx-5 h-52 w-[90%] flex-col gap-y-3 rounded-lg bg-[#282828] px-4">
            <View className="flex-row items-center gap-2">
              <Entypo name="spotify" size={24} color="green" />
              <TextWhite>Tips</TextWhite>
            </View>
            <TextWhite className="text-lg font-bold">
              Let's find some podcasts to follow
            </TextWhite>
            <TextWhite>We'll keep you updated on new episodes</TextWhite>
            <TouchableOpacity
              onPress={UpdatingButton}
              className="w-1/2 items-center justify-center rounded-[50px] bg-white p-2"
            >
              <Text>Browse podcasts</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default LibraryScreen;
