import React, { useState, useEffect } from "react";
import { View, Text, Image, Pressable, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Audio } from "expo-av";

import { Entypo, Feather, Ionicons, AntDesign } from "@expo/vector-icons";

const SongInfoScreen = ({ route }) => {
  const IPv4 = "172.20.10.13";
  const { song } = route.params;

  const circleSize = 12;
  const navigation = useNavigation();

  const [progress, setProgress] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);
  const [sound, setSound] = useState(null);

  const playMusic = async (url, id) => {
    if (sound && currentSong === id) {
      await sound.playAsync();
      setPlaying(true);
    } else {
      if (sound) {
        await sound.unloadAsync();
      }
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: url },
        {}, // Các options khác (nếu có)
        handlePlaybackStatusUpdate // Gán hàm lắng nghe ở đây
      );
      setSound(newSound);
      await newSound.playAsync();
      setPlaying(true);
      setCurrentSong(id);
    }
  };

  const handlePlaybackStatusUpdate = (playbackStatus) => {
    if (playbackStatus.isLoaded) {
      setCurrentTime(playbackStatus.positionMillis);
      setTotalDuration(playbackStatus.durationMillis);
      setProgress(
        playbackStatus.positionMillis / playbackStatus.durationMillis
      );
    }
  };

  const pauseMusic = async () => {
    if (playing) {
      await sound.pauseAsync();
      setPlaying(false);
    }
  };

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const addSong = (song) => {
    let urlAPI = `http://${IPv4}:5000/playlist`;

    const payload = {
      id: song.id,
      name: song.name,
      artist: song.artist,
      image: song.image,
      path: song.path,
    };

    console.log("Dữ liệu gửi lên server:", payload); // TEst

    fetch(urlAPI, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (res.ok && res.status === 201) {
          alert("Added to your playlist");
        } else {
          // Thêm xử lý cho trường hợp server trả về lỗi
          return res.json().then((data) => {
            throw new Error("Lỗi từ server: " + data.message);
          });
        }
      })
      .catch((err) => {
        alert("This songs has been added to your playlist.");
      });
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <LinearGradient colors={["#131624", "#040306"]}>
      <SafeAreaView>
        <View className="h-full w-full px-4">
          <View className="flex-row items-center justify-between">
            <Pressable onPress={() => navigation.goBack()}>
              <AntDesign name="down" size={24} color="white" />
            </Pressable>

            <Entypo name="dots-three-vertical" size={24} color="white" />
          </View>

          <View className="p-2">
            <View className="items-center">
              <Image
                className="w-[310px] h-[310px] rounded-[155px] my-[60px]"
                source={{ uri: song.image }}
              />
            </View>
            <View className="flex-row justify-between items-center">
              <View>
                <Text className="text-2xl font-bold text-white">
                  {song.name}
                </Text>
                <Text className="text-[#D3D3D3] mt-1">{song.artist}</Text>
              </View>
              <View className="flex-row gap-4">
                <TouchableOpacity onPress={() => addSong(song)}>
                  <AntDesign name="hearto" size={24} color="white" />
                </TouchableOpacity>
                <AntDesign name="sharealt" size={24} color="white" />
              </View>
            </View>

            <View className="mt-4">
              <View className="w-full mt-2 h-1 bg-gray-700 rounded-md">
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
              <View className="mt-3 flex-row items-center justify-between">
                <Text className="text-sm text-[#D3D3D3]">
                  {formatTime(currentTime)}
                </Text>

                <Text className="text-sm text-[#D3D3D3]">
                  {formatTime(totalDuration)}
                </Text>
              </View>
            </View>
            <View className="flex-row items-center justify-between mt-4">
              <Pressable>
                <Entypo name="shuffle" size={26} color="white" />
              </Pressable>
              <Pressable>
                <Ionicons name="play-skip-back" size={30} color="white" />
              </Pressable>
              <TouchableOpacity
                onPress={() =>
                  playing ? pauseMusic() : playMusic(song.path, song.id)
                }
              >
                {playing ? (
                  <AntDesign name="pausecircleo" size={60} color="white" />
                ) : (
                  <AntDesign name="playcircleo" size={60} color="white" />
                )}
              </TouchableOpacity>

              <Pressable>
                <Ionicons name="play-skip-forward" size={30} color="white" />
              </Pressable>
              <Pressable>
                <Feather name="repeat" size={26} color="white" />
              </Pressable>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default SongInfoScreen;
