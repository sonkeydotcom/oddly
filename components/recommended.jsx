import { React, useState } from "react";
import { router } from "expo-router";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faNairaSign } from "@fortawesome/free-solid-svg-icons";
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

const Recommended = () => {
  const [showComponent, setShowComponent] = useState(false);
  const handleButtonPress = () => {
    // Toggle the state to show/hide the component
    setShowComponent(!showComponent);
  };
  return (
    <View style={styles.recommendedCard}>
      <FlatList
        data={trending}
        showsHorizontalScrollIndicator={false}
        horizontal
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => router.navigate("/aggregatorList")}>
            <View
              style={{
                flexDirection: "row",
                marginVertical: 5,
                marginHorizontal: 4,

                borderRadius: 12,
                padding: 4,
                backgroundColor: "#fff",

                shadowColor: "grey",
                shadowOffset: { width: 4, height: 5 },
                shadowOpacity: 0.2,
                shadowRadius: 4,
                elevation: 5, // for Android elevation
              }}
            >
              <View>
                <Image source={item.image} style={styles.recommendedImage} />
              </View>
              <View style={{ marginHorizontal: 8 }}>
                <Text
                  style={{
                    marginVertical: 2,
                    fontWeight: "bold",
                    textTransform: "capitalize",
                  }}
                >
                  {item.name}
                </Text>

                <Text numberOfLines={2} ellipsizeMode="tail">
                  <MaterialIcons name="star-rate" size={12} color="black" />
                  {item.rating} (100k)
                </Text>

                <Text>
                  <FontAwesomeIcon icon={faNairaSign} size={12} color="black" />
                  {item.price}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  recommendedImage: {
    height: 80,
    width: 80,
    borderRadius: 8,
  },

  recommendedCard: { marginHorizontal: 1 },
});

export default Recommended;
