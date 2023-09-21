import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

const SearchItemCard = ({ item }) => {
  return (
    <TouchableOpacity style={styles.albumLikedButton}>
      <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
        Hiphop
      </Text>
      <Image
        style={{
          width: 60,
          height: 60,
          transform: [{ rotate: "15deg" }], // Góc xoay 15 độ
          margin: 4,
          borderRadius: 6,
        }}
        source={{
          uri: "https://lh3.googleusercontent.com/pw/AIL4fc9_fD783sz9IzpN_De5lGMaB44s9yHxdXtv0tmoWrY6EFb-qrp0J86e6wQ4yiNkuyKsfO2mKcrOarlapUtBSSdhX1pcBZm0m4Yk4jXhk4ivJOD-kkJ-t62W39fpgzexw9xoUl7eWPI4yTmhb3jxN_d9toHAdSL5ljVPXmbnII_vRXznn5ELUwKRotThCDFRczhvR9EmnGoyAA20AxPfcz6iaW0KvVMCWo9pnR8EVqYTFzubNNGTzngfeFbijhu0G4fwZA_bh25CU3IHZr8TpS-Z9FkXRbvbWZeQNCB0eX0FdfwTI8x0uNTs64lzZAzG116ohXFyLR-PChZ5hc4_apXgNh4rXylpwJkDeWfHjYXz9aHOrFpQJk2Tln-L232bviLsLhm74DLFuD3VCbtODGafIu3knrWwUUvChsksku1zQTr6oTbMv5JPuxfMPlEysbQqXURCJbYeWlteeIcdg2RjS-2I1i14Jy60Q07jt7jNFoxTi54vizTmq4lGyouU9xwRrsd7GDvTEwR6C-2_Cv9QHEiowCFzAeIFRj_KI8clVlC6Udeg_0nt88V5fb4t9qSrp8wTU5W3ZyRtFUqdaI8vCVHxDjD_5IkkGtorwhgYg13kLOthz5a-YOZGFxJyE40XpS4xcYWkF58HgsalRECXhWUTkl2nNr1PPcOjbTAYOpULQfc6bk0gEZx4hUndcQNJNfUc5JMtfKrZ1Or5iGdWzV4SFJ5t3c6hmin-c4tLsLZETmZT1CVPJiFZsQbGPloDORJdc84qIiyp63FmsjbpJBxquLiS4N4mzqVyHf70BJ9JBSNi0Y3HQ2Tc6RGD3AzC_8yadt9zchhrkyxgkYeiwlFxItBFTTdGYHme-o5qrXDiiGUXAOVET2hURblxOZN245meglXWMMsU=w700-h613-s-no?authuser=0",
        }}
      />
    </TouchableOpacity>
  );
};

export default SearchItemCard;
