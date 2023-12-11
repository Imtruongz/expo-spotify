import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import TextWhite from "./TextWhite";
import { useNavigation } from "@react-navigation/native";

import React from "react";

const PopularSong = ({ item }) => {
  const navigation = useNavigation();

  return (
    <View>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Info", { song: item, source: "songs" })
        }
        style={{ padding: 10 }}
      >
        <Image
          style={{ width: 130, height: 130, borderRadius: 5 }}
          source={{ uri: item.image }}
        />
        <TextWhite style={styles.blockRenderItem}>{item.name}</TextWhite>
      </TouchableOpacity>
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
  },
});
