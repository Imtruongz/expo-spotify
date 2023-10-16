import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import TextWhite from "./TextWhite";
import { useNavigation } from "@react-navigation/native";

import React from "react";

const PopularAlbum = ({ item }) => {
  const navigation = useNavigation();
  const images = {
    BandaidsImg: require("../assets/albums/BandaidsImg.jpg"),
    MCKAlbum: require("../assets/albums/99%Img.jpg"),
    PurposeImg: require("../assets/albums/Purpose.jpg"),
    JusticeImg: require("../assets/albums/JusticeImg.jpg"),
    GabrielImg: require("../assets/albums/Gabriel.jpg"),
    LalisaImg: require("../assets/albums/LalisaImg.png"),
  };

  return (
    <View>
      <TouchableOpacity
        onPress={() => navigation.navigate("Album", { album: item })}
        style={{ padding: 10 }}
      >
        <Image
          style={{ width: 130, height: 130, borderRadius: 5 }}
          source={images[item.image]}
        />
        <TextWhite style={styles.blockRenderItem}>{item.name}</TextWhite>
      </TouchableOpacity>
    </View>
  );
};

export default PopularAlbum;

const styles = StyleSheet.create({
  blockRenderItem: {
    textAlign: "center",
    fontSize: 13,
    fontWeight: "500",
    marginTop: 10,
  },
});
