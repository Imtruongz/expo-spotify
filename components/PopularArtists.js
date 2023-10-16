import { StyleSheet, View, Image } from "react-native";
import TextWhite from "./TextWhite";
import React from "react";

const PopularArtists = ({ item }) => {
  const images = {
    EdSheeranImg: require("../assets/artists/Edsheeran.jpg"),
    AdeleImg: require("../assets/artists/Adele.jpg"),
    BeyoncéImg: require("../assets/artists/beyonce.jpg"),
    KendrickLamarImg: require("../assets/artists/kendricklamar.jpg"),
    TaylorSwiftImg: require("../assets/artists/taylorswift.jpg"),
    RihannaImg: require("../assets/artists/rihanna.png"),
    DrakeImg: require("../assets/artists/drake.jpg"),
    BillieEilishImg: require("../assets/artists/billie-eilish.jpg"),
  };
  return (
    <View style={{ padding: 10 }}>
      <Image
        style={{ width: 140, height: 140, borderRadius: 70 }}
        source={images[item.image]}
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
