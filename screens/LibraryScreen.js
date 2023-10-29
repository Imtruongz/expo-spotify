import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import TextWhite from "../components/TextWhite";

const LibraryScreen = () => {
  const navigation = useNavigation();

  function UpdatingButton() {
    Alert.alert("Updating");
  }

  return (
    <LinearGradient colors={["#131624","#040306"]} style={{ flex: 1 }}>
      <ScrollView style={{ marginTop: 10 }}>
        {/* Header */}
        <View style={styles.header}>
          <TextWhite style={styles.messageDay}>Your Library</TextWhite>
          <View style={styles.Avatar}>
            <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
              <Image
                style={styles.imgAvatar}
                source={{uri: "https://live.staticflickr.com/65535/53280456787_5b57ceca8e_s.jpg"}}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.createBlock}>
          <View style={styles.tips}>
            <Entypo name="spotify" size={24} color="green" />
            <TextWhite>Tips</TextWhite>
          </View>
          <TextWhite style={styles.title}>Create your first playlist</TextWhite>
          <TextWhite>It's easy, we will help you</TextWhite>
          <TouchableOpacity onPress={UpdatingButton} style={styles.button}>
            <Text>Create playlist</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.createBlock}>
          <View style={styles.tips}>
            <Entypo name="spotify" size={24} color="green" />
            <TextWhite>Tips</TextWhite>
          </View>
          <TextWhite style={styles.title}>
            Let's find some podcasts to follow
          </TextWhite>
          <TextWhite>We'll keep you updated on new episodes</TextWhite>
          <TouchableOpacity onPress={UpdatingButton} style={styles.button}>
            <Text>Browse podcasts</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default LibraryScreen;

const styles = StyleSheet.create({
  header: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  Avatar: {
    flexDirection: "row",
    alignItems: "center",
  },
  imgAvatar: {
    width: 42,
    height: 42,
    borderRadius: 20,
    borderColor: "green",
    borderWidth: 2,
    resizeMode: "cover",
    marginRight: 10,
  },
  messageDay: {
    marginLeft: 10,
    fontSize: 25,
    fontWeight: "bold",
  },
  createBlock: {
    width: "90%",
    height: 200,
    backgroundColor: "#282828",
    borderRadius: 6,
    margin: 18,
    padding: 20,
    flexDirection: "column",
    gap: 14,
  },
  tips: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
  },
  button: {
    backgroundColor: "white",
    width: "50%",
    borderRadius: 50,
    padding: 9,
    justifyContent: "center",
    alignItems: "center",
  },
});
