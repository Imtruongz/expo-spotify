import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import TextWhite from "../components/TextWhite";

const DetailScreen = ({ route }) => {
  const { album } = route.params;

  const navigation = useNavigation();

  return (
    <>
      <LinearGradient colors={["#00cc00", "#000000"]} style={styles.header}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={{ marginHorizontal: 10 }}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </Pressable>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Image
            style={{ width: 200, height: 200, borderRadius: 5 }}
            source={{ uri: album.image }}
          />
          <TextWhite>{album.name}</TextWhite>
        </View>
      </LinearGradient>
      <View style={styles.bottom}></View>
    </>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  header: {
    flex: 0.5,
    paddingTop: 60,
  },
  bottom: {
    flex: 1,
    backgroundColor: "black",
  },
});
