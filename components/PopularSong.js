import { StyleSheet, View, Image } from "react-native";
import TextWhite from "./TextWhite";
import React from "react";

const PopularSong = ({ item }) => {
  const images = {
    ShapeOfYouImg: require("../assets/songs/shapeofyou.jpeg"),
    RollingInTheDeepImg: require("../assets/songs/rollinginthedeep.jpg"),
    CrazyInLoveImg: require("../assets/songs/crazyinlove.jpg"),
    HUMBLEImg: require("../assets/songs/humble.jpg"),
    LoveStoryImg: require("../assets/songs/lovestory.jpg"),
    UmbrellaImg: require("../assets/songs/umbrella.jpg"),
    HotlineBlingImg: require("../assets/songs/hotlinebling.jpg"),
    BadGuyImg: require("../assets/songs/badguy.jpg"),
    JustTheWayYouAreImg: require("../assets/songs/justthewayyouare.jpg"),
    IntoYouImg: require("../assets/songs/intoyou.jpg"),
    BlindingLightsImg: require("../assets/songs/blindinglight.png"),
    FixYouImg: require("../assets/songs/fixyou.jpg"),
    BadRomanceImg: require("../assets/songs/badromance.png"),
    LoseYourselfImg: require("../assets/songs/loseyourself.jpg"),
    DanceMonkeyImg: require("../assets/songs/dancemonkey.jpg"),
    HappyImg: require("../assets/songs/happy.jpg"),
    SomeoneLikeYouImg: require("../assets/songs/someonelikeyou.jpg"),
    RapVietImg: require("../assets/albums/rapviet.jpg"),
  };
  return (
    <View>
      <View style={{ padding: 10 }}>
        <Image
          style={{ width: 130, height: 130, borderRadius: 5 }}
          source={images[item.image]}
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
  },
});
