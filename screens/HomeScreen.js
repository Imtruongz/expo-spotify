import {
  View,
  ScrollView,
  Image,
  Pressable,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

import TextWhite from "../components/TextWhite";
import PopularSong from "../components/PopularSong";
import PopularArtists from "../components/PopularArtists";
import PopularAlbum from "../components/PopularAlbum";

import { SafeAreaProvider } from "react-native-safe-area-context";

const HomeScreen = () => {
  const IPv4 = "192.168.0.9";

  const [isLoading, setisLoading] = useState(true);
  const [songs, setSongs] = useState([]);
  const [artists, setArtist] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [trend, setTrend] = useState([]);
  const [category, setCategory] = useState([]);

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
      //ket thuc qua trinh load data , ke ca say ra loi thi cung se roi vao ham nay de chay
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
      //ket thuc qua trinh load data , ke ca say ra loi thi cung se roi vao ham nay de chay
      setisLoading(false); //trang thai cua ham nay se khong load nua
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
      //ket thuc qua trinh load data , ke ca say ra loi thi cung se roi vao ham nay de chay
      setisLoading(false); //trang thai cua ham nay se khong load nua
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
      //ket thuc qua trinh load data , ke ca say ra loi thi cung se roi vao ham nay de chay
      setisLoading(false); //trang thai cua ham nay se khong load nua
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
      //ket thuc qua trinh load data , ke ca say ra loi thi cung se roi vao ham nay de chay
      setisLoading(false); //trang thai cua ham nay se khong load nua
    }
  };

  const greetingMessage = () => {
    const currentTime = new Date().getHours();
    if (currentTime < 12) {
      return "Good Morning";
    } else if (currentTime < 16) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  };
  const message = greetingMessage();
  const navigation = useNavigation();

  return (
    <SafeAreaProvider>
      <LinearGradient colors={["#131624", "#040306"]} className="flex-1">
        <ScrollView>
          {/* Header */}
          <View className="mt-3 flex-row items-center justify-between">
            <TextWhite className="ml-6 text-[22px] font-bold">
              {message}
            </TextWhite>
            <View className="flex-row items-center">
              <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
                <Image
                  className="w-12 h-12 rounded-3xl border-2 mr-6"
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
                  className="w-[60px] h-[60px] mr-3 rounded-[5px]"
                  source={{ uri: item.image }}
                />
                <View>
                  <TextWhite className="text-[14px] font-bold">
                    {item.name}
                  </TextWhite>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Top songs */}
          <TextWhite className="text-[22px] font-bold mx-[14px] my-[8px]">Popular songs</TextWhite>
          <FlatList
            data={songs}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <PopularSong item={item} key={index} />
            )}
          />
          {/* Top artists */}
          <TextWhite className="text-[22px] font-bold mx-[14px] my-[8px]">Popular Artists</TextWhite>
          <FlatList
            data={artists}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <PopularArtists item={item} key={index} />
            )}
          />

          {/* Top albums */}
          <TextWhite className="text-[22px] font-bold mx-[14px] my-[8px]">Popular Album</TextWhite>
          <FlatList
            data={albums}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <PopularAlbum item={item} key={index} />
            )}
          />
          {/* Trending now */}
          <TextWhite className="text-[22px] font-bold mx-[14px] my-[8px]">Trending now</TextWhite>
          <FlatList
            data={trend}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <PopularSong item={item} key={index} />
            )}
          />
          <View className="h-[50px]"/>
        </ScrollView>
      </LinearGradient>
    </SafeAreaProvider>
  );
};

export default HomeScreen;