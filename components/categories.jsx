import React from "react";
import { FlatList, ScrollView, View, Text, StyleSheet } from "react-native";
import {
  categories,
  color,
  trending,
  mostBooked,
  offers,
} from "../constants/contants";

const Categories = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <FlatList
        data={categories}
        numColumns={4}
        renderItem={({ item }) => (
          <View style={styles.categoryItem}>
            <View style={styles.categoryImage}>
              <Text>{item.icon}</Text>
            </View>
            <Text numberOfLines={2} ellipsizeMode="tail">
              {item.name}
            </Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
      {/* First Row */}
    </View>
  );
};

const styles = StyleSheet.create({
  categoryItem: {
    justifyContent: "center",
    alignItems: "center",
    width: 85,
    marginVertical: 2,
    marginHorizontal: 2,
    height: 90,
    backgroundColor: "#fff",
    borderRadius: 4,
  },
  categoryImage: {
    width: "100%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Categories;
