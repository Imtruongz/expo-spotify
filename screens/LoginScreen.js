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
        <TextWhite className="mt-10 text-center text-4xl font-bold">
          Millions of Songs Free on spotify!
        </TextWhite>

        <View className="h-20" />

        <Pressable
          onPress={() => navigation.navigate("Main")}
          className="my-3 ml-auto mr-auto w-80 items-center justify-center rounded-3xl bg-[#1DB954] p-3"
        >
          <TextWhite className="font-bold">Sign In with Spotify</TextWhite>
        </Pressable>

        <Pressable
          onPress={() => navigation.navigate("Main")}
          className="my-3 ml-auto mr-auto w-80 flex-row items-center justify-center rounded-3xl border-2 border-solid border-[#C0C0C0] bg-[#131624] p-2"
        >
          <MaterialIcons name="phone-android" size={24} color="white" />
          <TextWhite className="flex-1 text-center font-semibold">
            Continue with phone number
          </TextWhite>
        </Pressable>

        <Pressable
          onPress={() => navigation.navigate("Main")}
          className="my-3 ml-auto mr-auto w-80 flex-row items-center justify-center rounded-3xl border-2 border-solid border-[#C0C0C0] bg-[#131624] p-2"
        >
          <AntDesign name="google" size={24} color="white" />
          <TextWhite className="flex-1 text-center font-semibold">
            Continue with Google
          </TextWhite>
        </Pressable>

        <Pressable
          onPress={() => navigation.navigate("Main")}
          className="my-3 ml-auto mr-auto w-80 flex-row items-center justify-center rounded-3xl border-2 border-solid border-[#C0C0C0] bg-[#131624] p-2"
        >
          <Entypo name="facebook" size={24} color="white" />
          <TextWhite className="flex-1 text-center font-semibold">
            Sign In with Facebook
          </TextWhite>
        </Pressable>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default LoginScreen;
