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
  women,
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

const Tiles = () => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {women.map((item) => (
        <View key={item.id} style={styles.categoryItem}>
          <View style={styles.categoryImage}>
            <Image source={item.image} style={styles.tilesImage} />
            <Text
              style={{
                position: "relative",
                textAlign: "justify",
                textAlignVertical: "top",
              }}
            >
              {item.name}
            </Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  categoryItem: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    marginVertical: 5,
  },
  categoryImage: {},
  categoryName: {
    marginTop: 5,
  },

  tilesImage: { width: 120, height: 150, borderRadius: 8 },
});

export default Tiles;
