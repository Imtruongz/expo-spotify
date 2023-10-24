import { StyleSheet, View, Image } from "react-native";
import TextWhite from "./TextWhite";
import React from "react";

const PopularArtists = ({ item }) => {
  return (
    <View style={{ padding: 10 }}>
      <Image
        style={{ width: 140, height: 140, borderRadius: 70 }}
        source={{ uri: item.image }}
      />
      <TextWhite style={styles.blockRenderItem}>{item.artist}</TextWhite>
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
