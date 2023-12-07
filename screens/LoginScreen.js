import React from "react";
import { View, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons, AntDesign, Entypo } from "@expo/vector-icons";
import TextWhite from "../components/TextWhite";

const LoginScreen = () => {
  const navigation = useNavigation();

  return (
    <LinearGradient colors={["#131624", "#040306"]} className="flex-1">
      <SafeAreaView>
        <View className="h-20" />
        <Entypo
          style={{ textAlign: "center" }}
          name="spotify"
          size={100}
          color="#1DB954"
        />
        <TextWhite className="text-4xl font-bold text-center mt-10">
          Millions of Songs Free on spotify!
        </TextWhite>

        <View className="h-20" />

        <Pressable
          onPress={() => navigation.navigate("Main")}
          className="bg-[#1DB954] p-3 ml-auto mr-auto w-80 rounded-3xl items-center justify-center my-3"
        >
          <TextWhite className="font-bold">Sign In with Spotify</TextWhite>
        </Pressable>

        <Pressable
          onPress={() => navigation.navigate("Main")}
          className="bg-[#131624] p-2 ml-auto mr-auto w-80 flex-row rounded-3xl items-center justify-center my-3 border-2 border-[#C0C0C0] border-solid"
        >
          <MaterialIcons name="phone-android" size={24} color="white" />
          <TextWhite className="font-semibold text-center flex-1">
            Continue with phone number
          </TextWhite>
        </Pressable>

        <Pressable
          onPress={() => navigation.navigate("Main")}
          className="bg-[#131624] p-2 ml-auto mr-auto w-80 flex-row rounded-3xl items-center justify-center my-3 border-2 border-[#C0C0C0] border-solid"
        >
          <AntDesign name="google" size={24} color="white" />
          <TextWhite className="font-semibold text-center flex-1">
            Continue with Google
          </TextWhite>
        </Pressable>

        <Pressable
          onPress={() => navigation.navigate("Main")}
          className="bg-[#131624] p-2 ml-auto mr-auto w-80 flex-row rounded-3xl items-center justify-center my-3 border-2 border-[#C0C0C0] border-solid"
        >
          <Entypo name="facebook" size={24} color="white" />
          <TextWhite className="font-semibold text-center flex-1">
            Sign In with Facebook
          </TextWhite>
        </Pressable>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default LoginScreen;
