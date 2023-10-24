import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  Touchable,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const SongInfoScreen = ({ route }) => {
  const { song } = route.params;
  const circleSize = 12;
  const navigation = useNavigation();

  const [progress, setProgress] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = async () => {
    if (currentSound) {
      if (isPlaying) {
        await currentSound.pauseAsync();
      } else {
        await currentSound.playAsync();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <View swipeDirection={["up", "down"]} swipeThreshold={200}>
      <LinearGradient colors={["#bdbdbd", "#151515"]}>
        <View
          style={{
            height: "100%",
            width: "100%",
            marginTop: 20,
            paddingHorizontal: 15,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Pressable onPress={() => navigation.goBack()}>
              <AntDesign name="down" size={24} color="white" />
            </Pressable>

            <Entypo name="dots-three-vertical" size={24} color="white" />
          </View>

          <View style={{ padding: 10 }}>
            <Image
              style={{
                width: 300,
                height: 300,
                borderRadius: 150,
                marginVertical: 60,
              }}
              source={{ uri: song.image }}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View>
                <Text
                  style={{ fontSize: 24, fontWeight: "bold", color: "white" }}
                >
                  {song.name}
                </Text>
                <Text style={{ color: "#D3D3D3", marginTop: 4 }}>
                  {song.artist}
                </Text>
              </View>
              <View style={{ flexDirection: "row", gap: 16 }}>
                <TouchableOpacity>
                  <AntDesign name="hearto" size={24} color="white" />
                </TouchableOpacity>
                <AntDesign name="sharealt" size={24} color="white" />
              </View>
            </View>

            <View style={{ marginTop: 14 }}>
              <View
                style={{
                  width: "100%",
                  marginTop: 10,
                  height: 3,
                  backgroundColor: "gray",
                  borderRadius: 5,
                }}
              >
                <View
                  style={[styles.progressbar, { width: `${progress * 100}%` }]}
                />
                <View
                  style={[
                    {
                      position: "absolute",
                      top: -5,
                      width: circleSize,
                      height: circleSize,
                      borderRadius: circleSize / 2,
                      backgroundColor: "white",
                    },
                    {
                      left: `${progress * 100}%`,
                      marginLeft: -circleSize / 2,
                    },
                  ]}
                />
              </View>
              <View
                style={{
                  marginTop: 12,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{ color: "white", fontSize: 15, color: "#D3D3D3" }}
                >
                  {formatTime(currentTime)}
                </Text>

                <Text
                  style={{ color: "white", fontSize: 15, color: "#D3D3D3" }}
                >
                  {formatTime(totalDuration)}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 17,
              }}
            >
              <Pressable>
                <Entypo name="shuffle" size={26} color="white" />
              </Pressable>
              <Pressable>
                <Ionicons name="play-skip-back" size={30} color="white" />
              </Pressable>
              <Pressable onPress={handlePlayPause}>
                {isPlaying ? (
                  <AntDesign name="pausecircle" size={60} color="white" />
                ) : (
                  <Pressable
                    onPress={handlePlayPause}
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: 30,
                      backgroundColor: "white",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Entypo name="controller-play" size={26} color="black" />
                  </Pressable>
                )}
              </Pressable>
              <Pressable>
                <Ionicons name="play-skip-forward" size={30} color="white" />
              </Pressable>
              <Pressable>
                <Feather name="repeat" size={26} color="white" />
              </Pressable>
            </View>
          </View>
        </View>
      </LinearGradient>
    </View>
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

{
  /* <Pressable
  style={{
    backgroundColor: "#5072A7",
    width: "90%",
    padding: 10,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 15,
    position: "absolute",
    borderRadius: 6,
    left: 20,
    bottom: 10,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  }}
>
  <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
    <Image style={{ width: 40, height: 40 }} source={ShapeOfYouImg} />
    <Text
      numberOfLines={1}
      style={{
        fontSize: 13,
        width: 220,
        color: "white",
        fontWeight: "bold",
      }}
    >
      ABC ABC
    </Text>
  </View>

  <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
    <AntDesign name="heart" size={24} color="#1DB954" />
    <Pressable>
      <AntDesign name="pausecircle" size={24} color="white" />
    </Pressable>
  </View>
</Pressable> */
}
