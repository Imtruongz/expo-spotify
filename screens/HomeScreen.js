import {
  StyleSheet,
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

import songsData from "../data-json/songs.json";
import ArtistsData from "../data-json/artists.json";
import albumData from "../data-json/album.json";
import trendingData from "../data-json/trending.json";
import CategoriData from "../data-json/categori.json";

import TextWhite from "../components/TextWhite";
import PopularSong from "../components/PopularSong";
import PopularArtists from "../components/PopularArtists";
import PopularAlbum from "../components/PopularAlbum";

const HomeScreen = () => {
  const [isLoading, setisLoading] = useState(true);
  const [songs, setSongs] = useState([]);
  const [artists, setArtist] = useState(ArtistsData);
  const [albums, setAlbums] = useState(albumData);
  const [trend, setTrend] = useState(trendingData);
  const [categori, setCategori] = useState(CategoriData);

  useEffect(() => {
    getSongs();
  }, []);

  const getSongs = async () => {
    
    let IPv4 = "192.168.42.248";

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
    <LinearGradient colors={["#040306", "#131624"]} style={{ flex: 1 }}>
      <ScrollView style={{ marginTop: 10 }}>
        {/* Header */}
        <View style={styles.header}>
          <TextWhite style={styles.messageDay}>{message}</TextWhite>
          <View style={styles.Avatar}>
            <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
              <Image
                style={styles.imgAvatar}
                source={{
                  uri: "https://live.staticflickr.com/65535/53280456787_5b57ceca8e_s.jpg",
                }}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* navbar */}
        <View style={styles.navbarContainer}>
          <Pressable style={styles.navbarButton}>
            <TextWhite style={styles.navbarTitle}>Music</TextWhite>
          </Pressable>

          <Pressable style={styles.navbarButton}>
            <TextWhite style={styles.navbarTitle}>Podcasts & Shows</TextWhite>
          </Pressable>
        </View>

        {/* Album */}
        <View style={styles.albumContainer}>
          {/* categori */}
          {categori.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() =>
                navigation.navigate("Categori", { categoris: item })
              }
              style={styles.albumLikedButton}
            >
              <Image
                style={{ width: 55, height: 55, borderRadius: 5 }}
                source={{ uri: item.image }}
              />
              <View>
                <TextWhite style={{ fontSize: 13, fontWeight: "bold" }}>
                  {item.name}
                </TextWhite>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Top songs */}
        <TextWhite style={styles.Title}>Popular songs</TextWhite>
        <FlatList
          data={songs}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <PopularSong item={item} key={index} />
          )}
        />
        {/* Top artists */}
        <TextWhite style={styles.Title}>Popular Artists</TextWhite>
        <FlatList
          data={artists}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <PopularArtists item={item} key={index} />
          )}
        />

        {/* Top albums */}
        <TextWhite style={styles.Title}>Popular Album</TextWhite>
        <FlatList
          data={albums}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <PopularAlbum item={item} key={index} />
          )}
        />
        {/* Trending now */}
        <TextWhite style={styles.Title}>Trending now</TextWhite>
        <FlatList
          data={trend}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <PopularSong item={item} key={index} />
          )}
        />
        <View style={{ height: 50 }} />
      </ScrollView>
    </LinearGradient>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  header: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  Avatar: {
    flexDirection: "row",
    alignItems: "center",
  },
  imgAvatar: {
    width: 42,
    height: 42,
    borderRadius: 20,
    borderColor: "green",
    borderWidth: 2,
    resizeMode: "cover",
    marginRight: 10,
  },
  messageDay: {
    marginLeft: 10,
    fontSize: 25,
    fontWeight: "bold",
  },
  navbarContainer: {
    marginHorizontal: 14,
    marginVertical: 5,
    marginBottom: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  navbarButton: {
    backgroundColor: "#282828",
    padding: 10,
    borderRadius: 30,
  },
  navbarTitle: {
    fontSize: 15,
  },
  albumContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
  },
  albumLikedButton: {
    marginBottom: 0,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginHorizontal: 10,
    marginVertical: 10,
    backgroundColor: "#202020",
    borderRadius: 5,
    width: "44%",
  },
  heartIcon: {
    width: 55,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
  },
  albumLikedTitle: {
    fontSize: 13,
    fontWeight: "bold",
  },
  Title: {
    fontSize: 22,
    fontWeight: "bold",
    marginHorizontal: 10,
    marginVertical: 13,
  },
});
