import React, { useState, useEffect } from "react";
import { View, Text, Image, Pressable, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Audio } from "expo-av";

import { Entypo, Feather, Ionicons, AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SongInfoScreen = ({ route }) => {
  const IPv4 = "192.168.1.10";
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
  const [playlistIndex, setPlaylistIndex] = useState(0);

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
        {},
        handlePlaybackStatusUpdate,
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
        playbackStatus.positionMillis / playbackStatus.durationMillis,
      );
    }
  };

  const pauseMusic = async () => {
    if (playing) {
      await sound.pauseAsync();
      setPlaying(false);
    }
  };

  const playNextSong = async () => {
    let nextIndex;
    if (playlist.length > 0) {
      nextIndex = (playlistIndex + 1) % playlist.length;
      const nextSong = playlist[nextIndex];

      // Update the displayed song information
      route.params.song = nextSong;

      // Play the new song
      await playMusic(nextSong.path, nextSong.id);
      setPlaylistIndex(nextIndex);
    } else {
      console.log("Playlist is empty.");
    }
  };

  const playPrevSong = async () => {
    if (playlist.length === 0) {
      console.log("Playlist is empty.");
      return; // Dừng hàm nếu playlist rỗng
    }

    let prevIndex = playlistIndex - 1;
    if (prevIndex < 0) {
      prevIndex = playlist.length - 1; // Xử lý chỉ mục âm
    }

    const prevSong = playlist[prevIndex];

    if (!prevSong) {
      console.error("Error: Previous song not found.");
      return; // Dừng hàm nếu không tìm thấy bài hát
    }

    // Cập nhật thông tin bài hát và phát nhạc
    route.params.song = prevSong;
    await playMusic(prevSong.path, prevSong.id);
    setPlaylistIndex(prevIndex);
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
      // fetchDataFromAsyncStorage();
    } else {
      alert("This song has already been added to your playlist.");
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // const fetchDataFromAsyncStorage = async () => {
  //   try {
  //     const storedData = await AsyncStorage.getItem("playlist");
  //     if (storedData !== null) {
  //       console.log(storedData);
  //     } else {
  //       console.log("No data found");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching data from AsyncStorage:", error);
  //   }
  // };

  return (
    <LinearGradient colors={["#131624", "#040306"]}>
      <SafeAreaView>
        <View className="mt-3 h-full w-full px-4">
          <View className="flex-row items-center justify-between">
            <Pressable onPress={() => navigation.goBack()}>
              <AntDesign name="down" size={24} color="white" />
            </Pressable>

            <Entypo name="dots-three-vertical" size={24} color="white" />
          </View>

          <View className="p-2">
            <View className="items-center">
              <Image
                className="my-[60px] h-[310px] w-[310px] rounded-[155px]"
                source={{ uri: song.image }}
              />
            </View>
            <View className="flex-row items-center justify-between">
              <View>
                <Text className="text-2xl font-bold text-white">
                  {song.name}
                </Text>
                <Text className="mt-1 text-[#D3D3D3]">{song.artist}</Text>
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
              <View className="mt-2 h-1 w-full rounded-md bg-gray-700">
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
            <View className="mt-4 flex-row items-center justify-between">
              <Pressable>
                <Entypo name="shuffle" size={26} color="white" />
              </Pressable>
              <TouchableOpacity onPress={playPrevSong}>
                <Ionicons name="play-skip-back" size={30} color="white" />
              </TouchableOpacity>
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

              <TouchableOpacity onPress={playNextSong}>
                <Ionicons name="play-skip-forward" size={30} color="white" />
              </TouchableOpacity>
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
