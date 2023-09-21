import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Pressable,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
// import icon
import { AntDesign } from "@expo/vector-icons";
// import data
import songsData from "../data-json/songs.json";
import ArtistsData from "../data-json/artists.json";
import albumData from "../data-json/album.json";
import trendingData from "../data-json/trending.json";

const HomeScreen = () => {
  const [songs, setSongs] = useState(songsData);
  const [artists, setArtist] = useState(ArtistsData);
  const [albums, setAlbums] = useState(albumData);
  const [trend, setTrend] = useState(trendingData);

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
      <ScrollView style={{ marginTop: 50 }}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.messageDay}>{message}</Text>
          <View style={styles.Avatar}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                padding: 10,
              }}
            >
              <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
                <Image
                  style={styles.imgAvatar}
                  source={{
                    uri: "https://lh3.googleusercontent.com/pw/AIL4fc-4-8q0Xr00RbnPmbWoXmxT5e9RITrznM3-w0ZZ4Kfzx7RXsJxa9PxcZF5qU6RRT4-WA_ltzm5aQgkcUq59OHuqAPTBtLTdlGUBTtUka6bUMq45cyaR0TMX0jOoy5DqMimzyNaeHL0q4pwfBwfhjDH2QAV8s5fYjR1dT3PrZsfeu4_TQWkn5ywSI8hxMMO3pBJBU6N6BUD4wk-GX7Q4E8EER9o9Y9GxPHpYoLajdvqeWpVbWrTEnQC6N7M_BxC5n5Lm95H_OBkBJ7O4MQKT5QWRo4SDaXhMJsQRl0J9h6RAFPYpB_UmMzHCiHf0qOalJf7FbRgMLM41X4gIRTrhD7h2relq0Ld8x01qzukwiw-Ot7dM8-_TUw08iFZfJ4L5dAkEw-8ZJf9SvL7V5NWpF_Iu_dhCHxJQyzPaNtDJciYielQFmeiCI-eES3GLvt_-V1Uf1AKUG1FDD5KcbvxNqF-RgMMFugI-3D0RYBoiIz2zZDwDy96cgV_9JCqthbDxuf42zjcWe3ZJtg37oaUN2Av4zBFYNoF_p7zka8XxJ3eomgmdPd0_15RoBLgD7crjtBM2GP5iir5YdTAb_qzisKOxO1BxnZ3wUaJMzwY0zJ9w7kOUHlJ5Dt78uL4GGCqnUZKGTX-jlUXMb4N_SU0mCt8SPFys8lpsNBr1uGymCKQWGdKhQ8dVxGd9CgtQZTpyLfy-B6B8mnemcabDyWrlD8b62v-bAy5E_x__EkCMZ0kmPcWQ33sSUkPfyWrMMF5y_OX2J3IM0gmsr7zfLO6V6APVWcTI0BsGDcM720RucJQmhvEzGZh0tz25XIaEPThUUacN8zcJw7h2Abhk0oV--8goqxbdM9xZZhJ8m0rVIU4TLYlVZYS2dbyzUwzD54G7l7g1OahW9a1cIF6x=w65-h73-s-no?authuser=0",
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* navbar */}
        <View style={styles.navbarContainer}>
          <Pressable style={styles.musicButton}>
            <Text style={styles.musicTitle}>Music</Text>
          </Pressable>

          <Pressable style={styles.podcastsButton}>
            <Text style={styles.podcastsTitle}>Podcasts & Shows</Text>
          </Pressable>
        </View>

        <View style={{ height: 10 }} />

        {/* Album */}
        <View style={styles.albumContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Liked")}
            style={styles.albumLikedButton}
          >
            <LinearGradient colors={["#33006F", "#FFFFFF"]}>
              <Pressable style={styles.heartIcon}>
                <AntDesign name="heart" size={24} color="white" />
              </Pressable>
            </LinearGradient>

            <Text style={styles.albumLikedTitle}>Liked Songs</Text>
          </TouchableOpacity>
          {/* hiphop */}
          <TouchableOpacity style={styles.albumLikedButton}>
            <Image
              style={{ width: 55, height: 55 }}
              source={{
                uri: "https://lh3.googleusercontent.com/pw/AIL4fc9_fD783sz9IzpN_De5lGMaB44s9yHxdXtv0tmoWrY6EFb-qrp0J86e6wQ4yiNkuyKsfO2mKcrOarlapUtBSSdhX1pcBZm0m4Yk4jXhk4ivJOD-kkJ-t62W39fpgzexw9xoUl7eWPI4yTmhb3jxN_d9toHAdSL5ljVPXmbnII_vRXznn5ELUwKRotThCDFRczhvR9EmnGoyAA20AxPfcz6iaW0KvVMCWo9pnR8EVqYTFzubNNGTzngfeFbijhu0G4fwZA_bh25CU3IHZr8TpS-Z9FkXRbvbWZeQNCB0eX0FdfwTI8x0uNTs64lzZAzG116ohXFyLR-PChZ5hc4_apXgNh4rXylpwJkDeWfHjYXz9aHOrFpQJk2Tln-L232bviLsLhm74DLFuD3VCbtODGafIu3knrWwUUvChsksku1zQTr6oTbMv5JPuxfMPlEysbQqXURCJbYeWlteeIcdg2RjS-2I1i14Jy60Q07jt7jNFoxTi54vizTmq4lGyouU9xwRrsd7GDvTEwR6C-2_Cv9QHEiowCFzAeIFRj_KI8clVlC6Udeg_0nt88V5fb4t9qSrp8wTU5W3ZyRtFUqdaI8vCVHxDjD_5IkkGtorwhgYg13kLOthz5a-YOZGFxJyE40XpS4xcYWkF58HgsalRECXhWUTkl2nNr1PPcOjbTAYOpULQfc6bk0gEZx4hUndcQNJNfUc5JMtfKrZ1Or5iGdWzV4SFJ5t3c6hmin-c4tLsLZETmZT1CVPJiFZsQbGPloDORJdc84qIiyp63FmsjbpJBxquLiS4N4mzqVyHf70BJ9JBSNi0Y3HQ2Tc6RGD3AzC_8yadt9zchhrkyxgkYeiwlFxItBFTTdGYHme-o5qrXDiiGUXAOVET2hURblxOZN245meglXWMMsU=w700-h613-s-no?authuser=0",
              }}
            />
            <View style={styles.randomArtist}>
              <Text
                style={{ color: "white", fontSize: 13, fontWeight: "bold" }}
              >
                Hiphop
              </Text>
            </View>
          </TouchableOpacity>
          {/* Pop */}
          <TouchableOpacity style={styles.albumLikedButton}>
            <Image
              style={{ width: 55, height: 55 }}
              source={{
                uri: "https://lh3.googleusercontent.com/pw/AIL4fc-I_DEjLFkg5Wm8OfslQjySPK1pSDHEZHnIhsO3Sqb6A8BGJQpTmo2NPdcCNQrs08SWBPixXnESWPwEg4OTf9wlV88VIxEP2V8VW_HceURZ7VKcFW-1B83BAvYvWKNALfAuDSTpEMYUmXCawOMCJbDw8383i3Zyt8FYovBZ8OOA_kjmZCC0Sbk3IOlSEs88t6Lb9FesFMpIE3hCaflPhaKgJu3T5hiKz6V-Zuf5goyJZtYkdPOOjAd4Dvywc1OmD3w7iHRZUkL00J9yiTzNTGruRl26-1SbUxvWpNzFa_-u_kutppBFQ74D1E96Fm3m1ePCM0Tod29eQXGHuGaXjxj-f-hd8rd59xNh-TZn71q5pZUl-MSGHqrhOrhX7AfnYERizMe6GTFHNSjnQPbQyFDLzP7xs0w5UEzTevWSMDX8RAx4H0eAMGYCpzsRphuuxOcUGslPT0DS2xZq-VLDDpIydCMDQkkqUNIKRZ8jcai9jK6XXwieWUv6-IN5nenznj4hMf2PImuBMou81C0B_4zqPFdf0fW-BGdBLUTOm1HqJdckq2MtbTdLGg9CQoJ_1tNCx7VLjqqDpzttFSiS0IfIf4D0i0uUOgZPSt4N3HROpXVj0EhubArN2-9N-hVKp9LfWDrScvMKKsV2XdSlV4Ijz5uFAfo5Y4OsXVysnLok_RXvXvzu3KrJATt9XsQFqPWBZH8Exg3hRdDCAh05r-1ix7zwXPg7mp15Zn10henG8IPW5PPYvj-8mM77RzeYnUoRA17fMGG-_C7cQfabKMBlPDFVlP-HCaaAdoULpkLbaIuDl2jFVdtdYj5O-5Bx5kv6xDSHdc80gM6ST8Zl8Op0Lsz5USFe0qF6zJmYHJJw9K5oGfEIyf2gHRsN-zTedHSCoW4x5QmoM-CT=w412-h367-no?authuser=0",
              }}
            />
            <View style={styles.randomArtist}>
              <Text
                style={{ color: "white", fontSize: 13, fontWeight: "bold" }}
              >
                Pop
              </Text>
            </View>
          </TouchableOpacity>
          {/* Rap */}
          <TouchableOpacity style={styles.albumLikedButton}>
            <Image
              style={{ width: 55, height: 55 }}
              source={{
                uri: "https://lh3.googleusercontent.com/pw/AIL4fc9Zx92n4xNiNXWB8FzIpjnJk1dP07YbBTGnCX2sR9hJ7RHAlOwxPGq3iHfqclkjzP9QaXKb8GyY4yWcXHkilQrjuD4GiokHVLPkGE0rYgdjVSeUe_3KlXky_-yvD4Xp5NF_rIXO5nxpxleX7Pit2cCJduT4bff5I8MQTONFBbD19sUhVx9SxviTipbWC2HSwhSpUPeAFre7GolMgjYRZBVwa09oEIRN6xPtCVbU3aFo8Xqe3Ig2ISibV3LGaEbZFLjjeDWSsk0chnJmNaQS05hxW9v2Y5RpqXfBm5wMSzO87-U7HCDuHHxW3eNwO594kcXzzbD435tfCbw7y6JxJEnr0NX8uXV1A3mdOEJuTgippS3DgBBYU_3FS_W4LrhmwLLEJDXTjdnEC4FvG5kjEZMhag6kdtvedRFMlty_I_GZ4gulvQqsRy_5LstQ1bo4dUIBiFIYM_1cPv_ASqoK1zVytmW0R3esk1f1nj8TmjsivBeec3roQttPj3IjyEXW1XWYR4SQZrPStKZsCmp2K__fhQEspnSBPNbeCG-pwrsq5FT8pblMmZha1wL76TWxiu5u9ZFXRm8HWMN6kmzz6w4Mk5v3E4epfB3Z89QlXr7AmWt0uYTrgZwEg9vAR_qwPpfp8HaPM80FKtlqzVq-r04vwgtzTQmCiH_RcrAHFGVQrLswJPpLe-Q0GrREXgF2JSk2VcKmbLl4jJNIIRdM6wDdS5M-28wAQaodFPMq_BBLH2sCzLVrxZrRxRCnbbykGwDko8ATDWWvHiMCl3ZtPRsVTSIDtAJeUGlOZAJFtObUUuxA8zSdkzt2YgB2QHVY0qvEEYzEDQDKxf8jfInHI-P7xIbQQO1xrS63GFoahnW_PZ4heP2FsCNC9kP1vr0EkYreI8NtvicPClGB=w800-h800-s-no?authuser=0",
              }}
            />
            <View style={styles.randomArtist}>
              <Text
                style={{ color: "white", fontSize: 13, fontWeight: "bold" }}
              >
                Rap
              </Text>
            </View>
          </TouchableOpacity>
          {/* EDM */}
          <TouchableOpacity style={styles.albumLikedButton}>
            <Image
              style={{ width: 55, height: 55 }}
              source={{
                uri: "https://lh3.googleusercontent.com/pw/AIL4fc-fgKO0af-_0xvKWy7019RNU5yBw6O6CmnGGWTUEQSa6G8gfcJLxfSeQmkAjD-UMBpaZsm6yTTyMp8RFFQBysjIZLrjwHRFVz0R728Cx-Ivn7lKyhTliO27iNPigOArG_UJYRuqMEGanXbFOB6hhVJlAUISWjvPq0B7DIEEDpoohsZlnMEjpVTumuSxN2yFQn9kTPrWZaAOLbEJC-wCmgPHwV3V3zqCM0oSvL3iOfl6X2NIbxOC2bkoxTJ1DgJYqfBaGyNxY3ojrFbu84CTFQWpykYNVlv70ees_TIAf8w-O9A83bk9uf0ZuiQhL1UPo5jUl2fwvdUK53dN-7x7iXG2tcAZBu44xpF2Uxlm-Z7TfAO9tbnR6DzAqzMrwiMMLIj2j7XlZ2Xw-b_vdVgVZ8Y1RyxnhNiRYrbyVzi1t862rBZ8awZibCgmYKKQsUjWXE8s5QQngRw4JKS1MLyRkU793kwsx3nuQod6hoGmfxQQuM94x4OLQNiEP1I84UbUZI_nLDqnDCCIq8UWFGkJS7Pl4yEzxdo0OxWwtRSv9b9KauNxpRbuHlK5ZLCU4bBZQ5z1xfqVK1tJcZelZimDD-XmJZqC9u9K8FWLhzuACSclpBUVo2xU_JKdWGk8UmJkd5FTVp1L-I85a1hFiSzpkUSZ7orJIl4LzfjIUOzdbrWsuwPuzan5AoyFZUm7kWokiVNzawmbZr4GLOhKLt9GJAO7vc0TPjO_Q4vI28OcJ1C2j8ZOSvvm8-yk5x8l-BUedfjxBm0zopLxBIdhC_8EzdljVUHqkmdFd3r0UlbdNURN8u6nBq9Un63o7uVkTXPC4rhyDCtrhs233mpcduV7EWC8Uz4YhbIt_vJbaKlOXcJTXwX3UQiKSLsQJIjp6YHXytYFVtQQuCynXBVJ=w1280-h720-s-no?authuser=0",
              }}
            />
            <View style={styles.randomArtist}>
              <Text
                style={{ color: "white", fontSize: 13, fontWeight: "bold" }}
              >
                EDM
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Top artists */}
        <Text style={styles.topArtistsTitle}>Popular Artists</Text>
        <FlatList
          data={artists}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={{ padding: 10 }}>
              <Image
                style={{ width: 140, height: 140, borderRadius: 70 }}
                source={{ uri: item.image }}
              />
              <Text style={styles.blockRenderItem}>{item.artist}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
        />

        {/* Top songs */}
        <Text style={styles.recentlyplayedTitle}>Popular songs</Text>
        <FlatList
          data={songs}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={{ padding: 10 }}>
              <Image
                style={{ width: 130, height: 130, borderRadius: 5 }}
                source={{ uri: item.image }}
              />
              <Text style={styles.blockRenderItem}>{item.name}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
        {/* Top albums */}
        <Text style={styles.recentlyplayedTitle}>Popular Album</Text>
        <FlatList
          data={albums}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={{ padding: 10 }}>
              <Image
                style={{ width: 130, height: 130, borderRadius: 5 }}
                source={{ uri: item.image }}
              />
              <Text style={styles.blockRenderItem}>{item.name}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
        {/* Trending now */}
        <Text style={styles.recentlyplayedTitle}>Trending now</Text>
        <FlatList
          data={trend}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={{ padding: 10 }}>
              <Image
                style={{ width: 130, height: 130, borderRadius: 5 }}
                source={{ uri: item.image }}
              />
              <Text style={styles.blockRenderItem}>{item.name}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
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
  },
  messageDay: {
    marginLeft: 10,
    marginRight: 90,
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
  },
  navbarContainer: {
    marginHorizontal: 12,
    marginVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  musicButton: {
    backgroundColor: "#282828",
    padding: 10,
    borderRadius: 30,
  },
  musicTitle: {
    fontSize: 15,
    color: "white",
  },
  podcastsButton: {
    backgroundColor: "#282828",
    padding: 10,
    borderRadius: 30,
  },
  podcastsTitle: {
    fontSize: 15,
    color: "white",
  },
  albumContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
  },
  albumLikedButton: {
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginHorizontal: 10,
    marginVertical: 10,
    backgroundColor: "#202020",
    borderRadius: 5,
    elevation: 3,
    width: "43%",
    opacity: 1, // Giá trị opacity mặc định
  },
  heartIcon: {
    width: 55,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
  },
  albumLikedTitle: {
    color: "white",
    fontSize: 13,
    fontWeight: "bold",
  },
  topArtistsTitle: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
    marginHorizontal: 10,
    marginVertical: 13,
  },
  recentlyplayedTitle: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
    marginHorizontal: 10,
    marginVertical: 13,
  },
  blockRenderItem: {
    textAlign: "center",
    fontSize: 13,
    fontWeight: "500",
    color: "white",
    marginTop: 10,
  },
});
