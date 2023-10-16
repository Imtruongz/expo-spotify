// screens/SongInfoScreen.js

import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";


const SongInfoScreen = ({ route }) => {
  const { song } = route.params;

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
    <LinearGradient colors={["#040306", "#131624"]} style={{ flex: 1 }}>
      <View style={styles.container}>
        <Image source={images[song.image]} style={styles.albumImage} />
        <Text style={styles.songTitle}>{song.nameSong}</Text>
        <Text style={styles.songArtist}>{song.artist}</Text>
        {/* Add more details or functionalities if you wish */}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  albumImage: {
    width: 300,
    height: 300,
    borderRadius: 150,
    marginBottom: 20,
  },
  songTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  songArtist: {
    fontSize: 16,
    color: "#555",
  },
});

export default SongInfoScreen;
