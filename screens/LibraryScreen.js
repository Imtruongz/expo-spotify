import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const LibraryScreen = () => {
  const navigation = useNavigation();

  return (
    <LinearGradient colors={["#040306", "#131624"]} style={{ flex: 1 }}>
      <ScrollView style={{ marginTop: 50 }}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.messageDay}>Your Library</Text>
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
        <View style={styles.createBlock}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 6,
            }}
          >
            <Entypo name="spotify" size={24} color="green" />
            <Text
              style={{
                color: "white",
              }}
            >
              Tips
            </Text>
          </View>
          {/* <AntDesign name="close" size={24} color="white" /> */}
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: 18,
            }}
          >
            Create your first playlist
          </Text>
          <Text
            style={{
              color: "white",
            }}
          >
            It's easy, we will help you
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: "white",
              width: "50%",
              borderRadius: 50, // Đặt giá trị borderRadius lớn hơn
              padding: 9,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text>Create playlist</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.createBlock}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 6,
            }}
          >
            <Entypo name="spotify" size={24} color="green" />
            <Text
              style={{
                color: "white",
              }}
            >
              Tips
            </Text>
          </View>
          {/* <AntDesign name="close" size={24} color="white" /> */}
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: 18,
            }}
          >
            Let's find some podcasts to follow
          </Text>
          <Text
            style={{
              color: "white",
            }}
          >
            We'll keep you updated on new episodes
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: "white",
              width: "50%",
              borderRadius: 50, // Đặt giá trị borderRadius lớn hơn
              padding: 9,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text>Browse podcasts</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default LibraryScreen;

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
  createBlock: {
    width: "90%",
    height: 200,
    backgroundColor: "#282828",
    borderRadius: 6,
    margin: 18,
    color: "white",
    padding: 20,
    flexDirection: "column",
    gap: 14,
  },
});
