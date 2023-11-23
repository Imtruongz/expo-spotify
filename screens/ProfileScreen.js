import {
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from "react-native-animatable";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import TextWhite from "../components/TextWhite";
import { Ionicons } from "@expo/vector-icons";

const ProfileScreen = () => {
  const IPv4 = "192.168.0.9";

  const [isLoading, setisLoading] = useState(true);
  const [playList, setplayList] = useState([]);
  const [menuVisibility, setMenuVisibility] = useState({});

  const [page, setPage] = useState(1); // Trang hiện tại
  const [isMoreData, setIsMoreData] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      getPlaylist();
    }, [page])
  );

  const getPlaylist = async () => {
    // Kiểm tra xem còn dữ liệu để tải thêm không
    if (!isMoreData) return;
    try {
      const response = await fetch(`http://${IPv4}:5000/playlist?_page=${page}&_limit=10`);
      const json = await response.json();
      // Kiểm tra nếu số lượng bản ghi nhận được ít hơn giới hạn
      if (json.length < 10) {
        setIsMoreData(false);
      }
      // Lọc ra những bài hát không trùng lặp
      const newItems = json.filter(
        (item) => !playList.some((p) => p.id === item.id)
      );
      // Cập nhật danh sách với những bài hát mới
      setplayList((prev) => [...prev, ...newItems]);
    } catch (err) {
      console.log(err);
    } finally {
      setisLoading(false);
      setLoadingMore(false);
    }
  };

  const loadMore = () => {
    if (isMoreData && !loadingMore && playList.length >= page * 10) {
      setLoadingMore(true);
      setPage((prev) => prev + 1);
    }
  };

  const deleteSong = (id) => {
    let urlAPI = `http://${IPv4}:5000/playlist/` + id;
    fetch(urlAPI, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status == 200) {
          alert("Removed to your playlist");
          console.log(`Xoá thành công bài hát có id là: ${id}`);
          getPlaylist();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const toggleMenu = (itemId) => {
    setMenuVisibility({
      ...menuVisibility,
      [itemId]: !menuVisibility[itemId],
    });
  };

  function UpdatingButton() {
    Alert.alert("Updating");
  }

  const navigation = useNavigation();

  return (
    <SafeAreaProvider>
      <LinearGradient
        colors={["#8B8B8B", "#000000"]}
        className="flex-[0.4] py-4"
      >
        <View className="flex-row justify-end">
          <TouchableOpacity onPress={UpdatingButton} className="mr-4">
            <Ionicons name="settings-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <View className="flex-row w-1/2">
          <Image
            className="w-32 h-32 rounded-[64px] ml-6"
            source={{
              uri: "https://live.staticflickr.com/65535/53280456787_5b57ceca8e_s.jpg",
            }}
          />
          <View>
            <TextWhite className="font-bold text-2xl ml-5">
              Nguyễn Việt Trường
            </TextWhite>
            <View className="flex-row flex-wrap gap-1 px-5 py-2">
              <TextWhite className="font-bold">0</TextWhite>
              <Text className="text-[#E0E0E0]">follower</Text>
              <TextWhite className="font-bold">0</TextWhite>
              <Text className="text-[#E0E0E0]">following</Text>
              <TextWhite className="font-bold">{playList.length}</TextWhite>
              <Text className="text-[#E0E0E0]">songs</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity onPress={UpdatingButton}>
          <TextWhite className="text-center w-14 mt-4 ml-14 p-[6px] font-bold rounded-3xl border-2 border-white border-solid">
            Edit
          </TextWhite>
        </TouchableOpacity>
      </LinearGradient>
      <View className="flex-1 bg-black">
        <TextWhite className="text-center text-xl font-bold mb-4">
          Your playlist
        </TextWhite>
        <FlatList
          data={playList}
          Vertical
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              className=" flex-row items-center justify-between"
              onPress={() => navigation.navigate("Info", { song: item })}
            >
              <View className="p-3 flex-row items-center justify-between gap-3">
                <Image
                  className="w-14 h-14 rounded"
                  source={{ uri: item.image }}
                />
                <View>
                  <TextWhite className="text-sm font-bold text-[#E0E0E0]">
                    {item.name}
                  </TextWhite>
                  <Text className="text-xs font-semibold text-[#E0E0E0] mt-1">
                    {item.artist}
                  </Text>
                </View>
              </View>
              <View className="flex-row items-center gap-3">
                <TouchableOpacity
                  className="p-2"
                  onPress={() => toggleMenu(item.id)}
                >
                  <Ionicons
                    name="md-ellipsis-vertical"
                    size={24}
                    color="white"
                  />
                </TouchableOpacity>
                {menuVisibility[item.id] && (
                  <Animatable.View animation="slideInRight" duration={400}>
                    <TouchableOpacity onPress={() => deleteSong(item.id)}>
                      <TextWhite className="font-bold text-sm mr-2 py-2">
                        Remove to playlist
                      </TextWhite>
                    </TouchableOpacity>
                  </Animatable.View>
                )}
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id.toString()}
          onEndReached={loadMore}
          onEndReachedThreshold={0.1}
          ListFooterComponent={
            loadingMore ? <ActivityIndicator size="large" color="#fff" /> : null
          }
        />
        <View className="h-14" />
      </View>
    </SafeAreaProvider>
  );
};

export default ProfileScreen;
