import { StyleSheet, View, SafeAreaView, Pressable } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

import TextWhite from "../components/TextWhite";

import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

const LoginScreen = () => {
  const navigation = useNavigation();

  const authenticate = () => {
    navigation.navigate("Main"); // Điều hướng đến màn hình mới
  };

  return (
    <LinearGradient colors={["#040306", "#131624"]} style={{ flex: 1 }}>
      <SafeAreaView>
        <View style={{ height: 80 }} />
        <Entypo
          style={{ textAlign: "center" }}
          name="spotify"
          size={100}
          color="#1DB954"
        />
        <TextWhite style={styles.textTitle}>
          Millions of Songs Free on spotify!
        </TextWhite>

        <View style={{ height: 80 }} />
        <Pressable
          onPress={authenticate}
          style={({ pressed }) => [
            {
              backgroundColor: "#1DB954",
              padding: 10,
              marginLeft: "auto",
              marginRight: "auto",
              width: 300,
              borderRadius: 25,
              alignItems: "center",
              justifyContent: "center",
              marginVertical: 10,
              opacity: pressed ? 0.8 : 1, // Thay đổi opacity khi pressed
            },
          ]}
        >
          <TextWhite style={{fontWeight: 'bold'}}>Sign In with Spotify</TextWhite>
        </Pressable>

        <Pressable
          onPress={authenticate}
          style={({ pressed }) => [
            {
              backgroundColor: "#131624",
              padding: 10,
              marginLeft: "auto",
              marginRight: "auto",
              width: 300,
              borderRadius: 25,
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 10,
              borderColor: "#C0C0C0",
              borderWidth: 0.8,
              opacity: pressed ? 0.8 : 1,
            },
          ]}
        >
          <MaterialIcons name="phone-android" size={24} color="white" />
          <TextWhite style={styles.buttonLogin}>
            Continue with phone number
          </TextWhite>
        </Pressable>

        <Pressable
          onPress={authenticate}
          style={({ pressed }) => [
            {
              backgroundColor: "#131624",
              padding: 10,
              marginLeft: "auto",
              marginRight: "auto",
              width: 300,
              borderRadius: 25,
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 10,
              borderColor: "#C0C0C0",
              borderWidth: 0.8,
              opacity: pressed ? 0.8 : 1,
            },
          ]}
        >
          <AntDesign name="google" size={24} color="white" />
          <TextWhite style={styles.buttonLogin}>Continue with Google</TextWhite>
        </Pressable>

        <Pressable
          onPress={authenticate}
          style={({ pressed }) => [
            {
              backgroundColor: "#131624",
              padding: 10,
              marginLeft: "auto",
              marginRight: "auto",
              width: 300,
              borderRadius: 25,
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 10,
              borderColor: "#C0C0C0",
              borderWidth: 0.8,
              opacity: pressed ? 0.8 : 1,
            },
          ]}
        >
          <Entypo name="facebook" size={24} color="white" />
          <TextWhite style={styles.buttonLogin}>
            Sign In with Facebook
          </TextWhite>
        </Pressable>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  textTitle: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 40,
  },
  buttonLogin: {
    fontWeight: "500",
    textAlign: "center",
    flex: 1,
  },
});
