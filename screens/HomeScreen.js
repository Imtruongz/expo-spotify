import {
  View,
  ScrollView,
  Image,
  Pressable,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import TextWhite from "../components/TextWhite";
import PopularSong from "../components/PopularSong";
import PopularArtists from "../components/PopularArtists";
import PopularAlbum from "../components/PopularAlbum";
import { Entypo } from "@expo/vector-icons";
import BannerAd from "../components/Banner";
import { Modal } from "react-native";

const HomeScreen = () => {
  const IPv4 = "192.168.1.10";

  const [isLoading, setisLoading] = useState(true);
  const [songs, setSongs] = useState([]);
  const [artists, setArtist] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [trend, setTrend] = useState([]);
  const [category, setCategory] = useState([]);
  const [isAdVisible, setIsAdVisible] = useState(true);

  const closeAd = () => {
    setIsAdVisible(false);
  };

  useEffect(() => {
    getSongs();
    getArtists();
    getTrending();
    getCategory();
    getAlbums();
  }, []);

  const getSongs = async () => {
    try {
      const response = await fetch(`http://${IPv4}:5000/songs`); //load data
      const json = await response.json(); //change data to json
      setSongs(json);
    } catch (err) {
      console.log(err);
    } finally {
      setisLoading(false); //trang thai cua ham nay se khong load nua
    }
  };

  const getArtists = async () => {
    try {
      const response = await fetch(`http://${IPv4}:5000/artists`); //load data
      const json = await response.json(); //change data to json
      setArtist(json);
    } catch (err) {
      console.log(err);
    } finally {
      setisLoading(false);
    }
  };

  const getTrending = async () => {
    try {
      const response = await fetch(`http://${IPv4}:5000/trending`); //load data
      const json = await response.json(); //change data to json
      setTrend(json);
    } catch (err) {
      console.log(err);
    } finally {
      setisLoading(false);
    }
  };

  const getCategory = async () => {
    try {
      const response = await fetch(`http://${IPv4}:5000/category`); //load data
      const json = await response.json(); //change data to json
      setCategory(json);
    } catch (err) {
      console.log(err);
    } finally {
      setisLoading(false);
    }
  };

  const getAlbums = async () => {
    try {
      const response = await fetch(`http://${IPv4}:5000/album`); //load data
      const json = await response.json(); //change data to json
      setAlbums(json);
    } catch (err) {
      console.log(err);
    } finally {
      setisLoading(false);
    }
  };

  const greetingMessage = () => {
    const currentTime = new Date().getHours();
    if (currentTime < 12) {
      return "Good Morning";
    } else if (currentTime < 18) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  };
  const message = greetingMessage();
  const navigation = useNavigation();

  return (
    <LinearGradient colors={["#131624", "#040306"]} className="flex-1">
      <SafeAreaView>
        <Modal
          animationType="slide"
          transparent={true}
          visible={isAdVisible}
          onRequestClose={closeAd}
        >
          <View className="flex-1 items-center justify-center bg-overlay">
            <BannerAd
              isVisible={isAdVisible}
              onClose={closeAd}
              adLinkUrl="https://newsroom.spotify.com/2023-wrapped/"
              adImageUrl="https://live.staticflickr.com/65535/53412368219_af5e62a060_w.jpg"
            />
          </View>
        </Modal>
        <ScrollView>
          {/* Header */}
          <View className="mt-3 flex-row items-center justify-between">
            <TextWhite className="ml-6 text-xl font-bold">{message}</TextWhite>
            <View className="flex-row items-center">
              <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
                <Image
                  className="mr-6 h-10 w-10 rounded-3xl"
                  source={{
                    uri: "https://live.staticflickr.com/65535/53280456787_5b57ceca8e_s.jpg",
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* navbar */}
          <View className="my-3 ml-3 flex-row items-center">
            <Pressable className="mx-1 rounded-full bg-[#282828] p-2.5">
              <TextWhite className="text-sm font-bold">Music</TextWhite>
            </Pressable>

            <Pressable className="mx-1 rounded-full bg-[#282828] p-2.5">
              <TextWhite className="text-sm font-bold">
                Podcasts & Shows
              </TextWhite>
            </Pressable>
            <Pressable className="mx-1 rounded-full bg-[#282828] p-2.5">
              <TextWhite className="text-sm font-bold">Premium</TextWhite>
            </Pressable>
          </View>

          {/* Album */}
          <View className="flex-row flex-wrap items-center justify-center">
            {/* category */}
            {category.map((item) => (
              <TouchableOpacity
                key={item.id}
                onPress={() =>
                  navigation.navigate("Categori", { categoris: item })
                }
                className="mx-2 my-2 w-[44%] flex-row items-center rounded-md bg-[#202020]"
              >
                <Image
                  className="mr-3 h-14 w-14 rounded-md"
                  source={{ uri: item.image }}
                />
                <View>
                  <TextWhite className="text-sm font-bold">
                    {item.name}
                  </TextWhite>
                </View>
              </TouchableOpacity>
            ))}
          </View>
          <View className="my-3 items-center justify-center">
            <TouchableOpacity className="flex-row items-center">
              <Image
                className="h-14 w-11"
                source={{
                  uri: "https://live.staticflickr.com/65535/53459594494_73ea25340c_w.jpg",
                }}
              ></Image>
              <TextWhite className="mx-4 my-5 text-2xl font-bold">
                Spotify Premium
              </TextWhite>
              <Entypo name="chevron-thin-right" size={24} color="white" />
            </TouchableOpacity>
            <Image
              className="h-40 w-[90%] rounded-2xl"
              source={{
                uri: "https://live.staticflickr.com/65535/53458355397_86ee5613e2.jpg",
              }}
            ></Image>
          </View>
          {/* Top songs */}
          <TextWhite className="mx-4 my-2 text-2xl font-bold">
            Popular songs
          </TextWhite>
          <FlatList
            data={songs}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <PopularSong item={item} key={index} />
            )}
          />
          {/* Top albums */}
          <TextWhite className="mx-4 my-2 text-2xl font-bold">
            Popular Album
          </TextWhite>
          <FlatList
            data={albums}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <PopularAlbum item={item} key={index} />
            )}
          />
          {/* Top artists */}
          <TextWhite className="mx-4 my-2 text-2xl font-bold">
            Popular Artists
          </TextWhite>
          <FlatList
            data={artists}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <PopularArtists item={item} key={index} />
            )}
          />

          {/* Trending now */}
          <TextWhite className="mx-4 my-2 text-2xl font-bold">
            Trending now
          </TextWhite>
          <FlatList
            data={trend}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <PopularSong item={item} key={index} />
            )}
          />
          <View className="h-14" />
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};
export default HomeScreen;
