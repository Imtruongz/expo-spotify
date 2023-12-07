import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import TextWhite from "./TextWhite";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const PopularArtists = ({ item }) => {
  const navigation = useNavigation();

  return (
    <View>
      <TouchableOpacity
        onPress={() => navigation.navigate("Artist", { artist: item })}
        style={{ padding: 10 }}
      >
        <Image
          style={{ width: 140, height: 140, borderRadius: 70 }}
          source={{ uri: item.image }}
        />
        <TextWhite style={styles.blockRenderItem}>{item.artist}</TextWhite>
      </TouchableOpacity>
    </View>
  );
};

export default PopularArtists;

const styles = StyleSheet.create({
  blockRenderItem: {
    textAlign: "center",
    fontSize: 13,
    fontWeight: "500",
    marginTop: 10,
  },
});
