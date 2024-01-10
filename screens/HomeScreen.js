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
  const IPv4 = "192.168.4.101";

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
          <View className="flex-1 justify-center items-center bg-overlay">
            <BannerAd
              isVisible={isAdVisible}
              onClose={closeAd}
              adLinkUrl="https://newsroom.spotify.com/2023-wrapped/"
              adImageUrl="https://github.com/Imtruongz/assets/blob/main/387659257_632065309123911_3861543218293514276_n.jpg?raw=true"
            />
          </View>
        </Modal>
        <ScrollView>
          {/* Header */}
          <View className="flex-row items-center justify-between mt-3">
            <TextWhite className="ml-6 text-xl font-bold">{message}</TextWhite>
            <View className="flex-row items-center">
              <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
                <Image
                  className="w-10 h-10 mr-6 rounded-3xl"
                  source={{
                    uri: "https://live.staticflickr.com/65535/53280456787_5b57ceca8e_s.jpg",
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* navbar */}
          <View className="ml-3 my-3 flex-row items-center">
            <Pressable className="bg-[#282828] p-2.5 mx-1 rounded-full">
              <TextWhite className="text-sm font-bold">Music</TextWhite>
            </Pressable>

            <Pressable className="bg-[#282828] p-2.5 mx-1 rounded-full">
              <TextWhite className="text-sm font-bold">
                Podcasts & Shows
              </TextWhite>
            </Pressable>
            <Pressable className="bg-[#282828] p-2.5 mx-1 rounded-full">
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
                className="flex-row items-center mx-2 my-2 bg-[#202020] rounded-md w-[44%]"
              >
                <Image
                  className="w-14 h-14 mr-3 rounded-md"
                  source={{ uri: item.image }}
                />
                <View>
                  <TextWhite className="font-bold text-sm">
                    {item.name}
                  </TextWhite>
                </View>
              </TouchableOpacity>
            ))}
          </View>
          <View className="justify-center items-center my-3">
            <TouchableOpacity className="flex-row items-center">
              <Image
                className="w-12 h-10"
                source={{
                  uri: "https://taphoammo.net/img/spotify-premium-chinh-chu_505424362.png",
                }}
              ></Image>
              <TextWhite className="text-2xl font-bold mx-4 my-5">
                Spotify Premium
              </TextWhite>
              <Entypo name="chevron-thin-right" size={24} color="white" />
            </TouchableOpacity>
            <Image
              className="w-[90%] h-40 rounded-2xl"
              source={{
                uri: "https://www.digitalmusicnews.com/wp-content/uploads/2021/02/times-square-premium.jpg",
              }}
            ></Image>
          </View>
          {/* Top songs */}
          <TextWhite className="text-2xl font-bold mx-4 my-2">
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
          <TextWhite className="text-2xl font-bold mx-4 my-2">
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
          <TextWhite className="text-2xl font-bold mx-4 my-2">
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
          <TextWhite className="text-2xl font-bold mx-4 my-2">
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
