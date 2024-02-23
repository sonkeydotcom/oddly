import { React, useState } from "react";
import { router } from "expo-router";
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

import SubList from "./sublist";

const Maps = () => {
  <View style={styles.recommendedCard}></View>;
};

const styles = StyleSheet.create({
  recommendedImage: {
    height: 80,
    width: 80,
    borderRadius: 8,
  },

  recommendedCard: { marginHorizontal: 10 },
});

export default Maps;
