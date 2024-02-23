import { React, useState } from "react";
import {
  FlatList,
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
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
  SimpleLineIcons,
} from "@expo/vector-icons";

const SubList = () => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.items}>
        <Text> sbs </Text>
        <SimpleLineIcons name="arrow-right" size={12} color="black" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    backgroundColor: "#fff",
  },
  items: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default SubList;
