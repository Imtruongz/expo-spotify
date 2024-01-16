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
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Modal from "react-native-modal";

import TextWhite from "../components/TextWhite";
import { Ionicons, Entypo, AntDesign } from "@expo/vector-icons";

const ProfileScreen = () => {
  const IPv4 = "192.168.43.57"; //Thay đổi địa chỉ IP ở đây
  const navigation = useNavigation();

  const [isLoading, setisLoading] = useState(true);
  const [playList, setplayList] = useState([]);
  const [menuVisibility, setMenuVisibility] = useState({});

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const getPlaylist = async () => {
    try {
      const response = await fetch(`http://${IPv4}:5000/playlist`);
      const json = await response.json();
      setplayList(json);
    } catch (err) {
      console.log(err);
    } finally {
      setisLoading(false);
    }
  };

  const deleteSong = async (id) => {
    let urlAPI = `http://${IPv4}:5000/playlist/` + id;
    try {
      const response = await fetch(urlAPI, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const newPlaylist = playList.filter((song) => song.id !== id);
        setplayList(newPlaylist);
        await AsyncStorage.setItem("playlist", JSON.stringify(newPlaylist));
      } else {
        console.error("Lỗi khi xóa bài hát từ server");
      }
    } catch (error) {
      console.error("Lỗi khi xóa bài hát:", error);
    }
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

  useFocusEffect(
    React.useCallback(() => {
      getPlaylist();
    }, []),
  );

  // const [page, setPage] = useState(1); // Trang hiện tại
  // const [isMoreData, setIsMoreData] = useState(true);
  // const [loadingMore, setLoadingMore] = useState(false);

  // useFocusEffect(
  //   React.useCallback(() => {
  //     getPlaylist();
  //   }, [page])
  // );

  // const getPlaylist = async () => {
  //   // Kiểm tra xem còn dữ liệu để tải thêm không
  //   if (!isMoreData) return;
  //   try {
  //     const response = await fetch(
  //       `http://${IPv4}:5000/playlist?_page=${page}&_limit=10`
  //     );
  //     const json = await response.json();
  //     // Kiểm tra nếu số lượng bản ghi nhận được ít hơn giới hạn
  //     if (json.length < 10) {
  //       setIsMoreData(false);
  //     }
  //     // Lọc ra những bài hát không trùng lặp
  //     const newItems = json.filter(
  //       (item) => !playList.some((p) => p.id === item.id)
  //     );
  //     // Cập nhật danh sách với những bài hát mới
  //     setplayList((prev) => [...prev, ...newItems]);
  //   } catch (err) {
  //     console.log(err);
  //   } finally {
  //     setisLoading(false);
  //     setLoadingMore(false);
  //   }
  // };

  // const loadMore = () => {
  //   if (isMoreData && !loadingMore && playList.length >= page * 10) {
  //     setLoadingMore(true);
  //     setPage((prev) => prev + 1);
  //   }
  // };

  // const clearAsyncStorage = async () => {
  //   try {
  //     await AsyncStorage.clear();
  //     console.log("Tất cả dữ liệu trong AsyncStorage đã được xóa.");
  //   } catch (error) {
  //     console.error("Lỗi khi xóa dữ liệu trong AsyncStorage:", error);
  //   }
  // };

  return (
    <>
      <LinearGradient colors={["#8B8B8B", "#000000"]} className="flex-[0.5]">
        <SafeAreaView>
          <View className="mt-3 flex-row justify-end">
            <TouchableOpacity onPress={UpdatingButton} className="mr-4">
              <Ionicons name="settings-outline" size={24} color="white" />
            </TouchableOpacity>
          </View>

          <View className="w-1/2 flex-row items-center">
            <Image
              className="ml-6 h-32 w-32 rounded-[64px]"
              source={{
                uri: "https://live.staticflickr.com/65535/53280456787_5b57ceca8e_s.jpg",
              }}
            />
            <View>
              <TextWhite className="ml-5 text-2xl font-bold">
                Nguyễn Việt Trường
              </TextWhite>
              <View className="flex-col flex-wrap gap-1 px-5 py-2">
                <View className="flex-row gap-x-1">
                  <TextWhite className="font-bold">{playList.length}</TextWhite>
                  <Text className="text-[#E0E0E0]">songs</Text>
                </View>
              </View>
            </View>
          </View>
          <View className="ml-14 mt-3 flex-row items-center">
            <TouchableOpacity
              className="mr-2 w-14 items-center justify-center rounded-3xl border-2 border-solid border-white p-[6px] text-center font-bold"
              // onPress={clearAsyncStorage}
              onPress={UpdatingButton}
            >
              <TextWhite>Edit</TextWhite>
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleModal}>
              <Entypo name="dots-three-vertical" size={24} color="white" />
            </TouchableOpacity>
            <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
              <View className="flex-1 items-center justify-end">
                <View className="w-full rounded-2xl bg-slate-900 p-2">
                  <View className="mx-2  my-2 flex-row items-center">
                    <Image
                      className="h-12 w-12 rounded-3xl"
                      source={{
                        uri: "https://live.staticflickr.com/65535/53280456787_5b57ceca8e_s.jpg",
                      }}
                    />
                    <TextWhite className="ml-4">Nguyễn Việt Trường</TextWhite>
                  </View>
                  <TouchableOpacity className="mx-2 my-4 flex-row items-center">
                    <AntDesign name="adduser" size={24} color="white" />
                    <TextWhite className="ml-4">Add friend</TextWhite>
                  </TouchableOpacity>
                  <TouchableOpacity className="mx-2 my-4 flex-row items-center">
                    <AntDesign name="sharealt" size={24} color="white" />
                    <TextWhite className="ml-4">Share</TextWhite>
                  </TouchableOpacity>
                  <TouchableOpacity className="mx-2 my-4 flex-row items-center">
                    <AntDesign name="linechart" size={24} color="white" />
                    <TextWhite className="ml-4">Share</TextWhite>
                  </TouchableOpacity>
                  <TouchableOpacity className="mx-2 my-4 flex-row items-center">
                    <Entypo name="eye" size={24} color="white" />
                    <TextWhite className="ml-4">Share</TextWhite>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
        </SafeAreaView>
      </LinearGradient>
      <View className="flex-1 bg-black">
        <TextWhite className="mb-4 text-center text-xl font-bold">
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
              <View className="flex-row items-center justify-between gap-3 p-3">
                <Image
                  className="h-14 w-14 rounded"
                  source={{ uri: item.image }}
                />
                <View>
                  <TextWhite className="text-sm font-bold text-[#E0E0E0]">
                    {item.name}
                  </TextWhite>
                  <Text className="mt-1 text-xs font-semibold text-[#E0E0E0]">
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
                      <TextWhite className="mr-2 py-2 text-sm font-bold">
                        Remove to playlist
                      </TextWhite>
                    </TouchableOpacity>
                  </Animatable.View>
                )}
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id.toString()}
          // onEndReached={loadMore}
          // onEndReachedThreshold={0.1}
          ListFooterComponent={
            isLoading ? <ActivityIndicator size="large" color="#fff" /> : null
          }
        />
        <View className="h-14" />
      </View>
    </>
  );
};

export default ProfileScreen;
