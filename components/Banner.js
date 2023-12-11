import React from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  Linking,
} from "react-native";

const BannerAd = ({ isVisible, onClose, adImageUrl, adLinkUrl }) => {
  if (!isVisible) return null;

  const handleExplorePress = () => {
    Linking.openURL(adLinkUrl).catch((err) =>
      console.error("An error occurred", err)
    );
  };

  return (
    <View className="w-[90%] rounded-2xl overflow-hidden items-center relative">
      <Image source={{ uri: adImageUrl }} className="w-full h-[300px]" />
      <TouchableOpacity
        onPress={handleExplorePress}
        className="bg-white p-3 rounded-3xl mt-2"
      >
        <Text className="font-bold">Explore now</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onClose}
        className="bg-overlay p-2 absolute top-3 right-2 rounded-3xl"
      >
        <Text className="text-white">Skip</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BannerAd;
