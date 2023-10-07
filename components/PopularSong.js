import { StyleSheet, View, Image } from "react-native";
import TextWhite from "./TextWhite";
import React from "react";

const PopularSong = ({item}) => {
  return (
    <View>
      <View style={{ padding: 10 }}>
        <Image
          style={{ width: 130, height: 130, borderRadius: 5 }}
          source={{ uri: item.image }}
        />
        <TextWhite style={styles.blockRenderItem}>{item.name}</TextWhite>
      </View>
    </View>
  );
};

export default PopularSong;

const styles = StyleSheet.create({
  blockRenderItem: {
    textAlign: "center",
    fontSize: 13,
    fontWeight: "500",
    marginTop: 10,
  }
});
