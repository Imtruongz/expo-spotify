import React, { useState, useEffect } from "react";
import { View, Text, Image, Pressable, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Audio } from "expo-av";

import { Entypo, Feather, Ionicons, AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SongInfoScreen = ({ route }) => {
  const IPv4 = "192.168.0.9";
  const { song } = route.params;

  const circleSize = 12;
  const navigation = useNavigation();

  const [progress, setProgress] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);
  const [sound, setSound] = useState(null);

  const [playlist, setPlaylist] = useState([]);

  const isSongInPlaylist = (songId) => {
    return playlist.some((item) => item.id === songId);
  };

  const loadPlaylist = async () => {
    try {
      const savedPlaylist = await AsyncStorage.getItem("playlist");
      if (savedPlaylist !== null) {
        setPlaylist(JSON.parse(savedPlaylist));
      }
    } catch (error) {
      console.error("Lỗi khi tải danh sách phát:", error);
    }
  };

  useEffect(() => {
    loadPlaylist();
  }, []);

  const updatePlaylist = async (newSong) => {
    try {
      const updatedPlaylist = [...playlist, newSong];
      setPlaylist(updatedPlaylist);
      await AsyncStorage.setItem("playlist", JSON.stringify(updatedPlaylist));
    } catch (error) {
      console.error("Lỗi khi cập nhật danh sách phát:", error);
    }
  };

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

  const fetchDataFromAsyncStorage = async () => {
    try {
      const storedData = await AsyncStorage.getItem("playlist");
      if (storedData !== null) {
        // Dữ liệu tồn tại
        console.log(storedData);
      } else {
        // Không có dữ liệu
        console.log("No data found");
      }
    } catch (error) {
      console.error("Error fetching data from AsyncStorage:", error);
    }
  };

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const addSong = async (songToAdd) => {
    let urlAPI = `http://${IPv4}:5000/playlist`;

    const payload = {
      id: songToAdd.id,
      name: songToAdd.name,
      artist: songToAdd.artist,
      image: songToAdd.image,
      path: songToAdd.path,
    };

    // Kiểm tra nếu bài hát đã có trong danh sách phát
    if (!isSongInPlaylist(songToAdd.id)) {
      console.log("Dữ liệu gửi lên server:", payload); // Log dữ liệu

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
            setPlaylist([...playlist, payload]); // Cập nhật danh sách phát trong trạng thái
          } else {
            // Xử lý cho trường hợp server trả về lỗi
            return res.json().then((data) => {
              throw new Error("Lỗi từ server: " + data.message);
            });
          }
        })
        .catch((err) => {
          alert("An error occurred: " + err.message);
        });
      updatePlaylist(songToAdd);
      fetchDataFromAsyncStorage();
    } else {
      alert("This song has already been added to your playlist.");
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const playNextSong = async () => {
    // if (!songs || songs.length === 0) {
    //   console.log('No songs');
    //   return;
    // }
    // const currentIndex = songs.findIndex(song => song.id === currentSong.id);
    // const nextIndex = (currentIndex + 1) % songs.length;
    // const nextSong = songs[nextIndex];
    // // Phát bài hát tiếp theo
    // await playMusic(nextSong.path, nextSong.id);
  };

  return (
    <LinearGradient colors={["#131624", "#040306"]}>
      <SafeAreaView>
        <View className="h-full w-full px-4 mt-3">
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
                  {isSongInPlaylist(song.id) ? (
                    <AntDesign name="heart" size={24} color="red" />
                  ) : (
                    <AntDesign name="hearto" size={24} color="white" />
                  )}
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

              <Pressable onPress={playNextSong}>
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
