import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
} from "react-native";
import React, { useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
// import * as AppAuth from "expo-app-auth";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useNavigation } from "@react-navigation/native";
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const navigation = useNavigation();

  const authenticate = () => {
    navigation.navigate('Main'); // Điều hướng đến màn hình mới
  };

  return (
    <LinearGradient colors={["#040306", "#131624"]} style={{ flex: 1 }}>
      <SafeAreaView>
        <View style={{ height: 80 }} />
        <Entypo
          style={{ textAlign: "center" }}
          name="spotify"
          size={80}
          color="white"
        />
        <Text
          style={{
            color: "white",
            fontSize: 40,
            fontWeight: "bold",
            textAlign: "center",
            marginTop: 40,
          }}
        >
          Millions of Songs Free on spotify!
        </Text>

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
          <Text>Sign In with Spotify</Text>
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
          <Text
            style={{
              fontWeight: "500",
              color: "white",
              textAlign: "center",
              flex: 1,
            }}
          >
            Continue with phone number
          </Text>
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
          <Text
            style={{
              fontWeight: "500",
              color: "white",
              textAlign: "center",
              flex: 1,
            }}
          >
            Continue with Google
          </Text>
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
          <Text
            style={{
              fontWeight: "500",
              color: "white",
              textAlign: "center",
              flex: 1,
            }}
          >
            Sign In with Facebook
          </Text>
        </Pressable>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default LoginScreen;
