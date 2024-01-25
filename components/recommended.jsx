import React from "react";
import {
  FlatList,
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import {
  categories,
  color,
  trending,
  mostBooked,
  offers,
} from "../constants/contants";

import {
  MaterialCommunityIcons,
  Ionicons,
  EvilIcons,
  Feather,
  MaterialIcons,
  FontAwesome,
  AntDesign,
} from "@expo/vector-icons";

const Recommended = () => {
  return (
    <View style={styles.recommendedCard}>
      <FlatList
        data={trending}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: "row",
              marginVertical: 10,
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 8,
              padding: 4,
            }}
          >
            <View>
              <Image source={item.image} style={styles.recommendedImage} />
            </View>
            <View style={{ marginHorizontal: 8 }}>
              <Text style={{ marginVertical: 2, fontWeight: "bold" }}>
                {" "}
                {item.name}{" "}
              </Text>

              <Text style={{ marginVertical: 2 }}>
                Availability: {item.availability}
              </Text>
              <Text> Starting at: {item.price} </Text>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                width: 115,
              }}
            >
              <Text numberOfLines={2} ellipsizeMode="tail">
                <MaterialIcons name="star-rate" size={12} color="black" />
                {item.rating} / 10 (100 reviews)
              </Text>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <TouchableOpacity
          style={{
            backgroundColor: "#ccc",
            paddingHorizontal: 16,
            borderRadius: 4,
          }}
        >
          <Feather name="more-horizontal" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  recommendedImage: {
    height: 80,
    width: 80,
    borderRadius: 8,
  },

  recommendedCard: { marginHorizontal: 10 },
});

export default Recommended;
