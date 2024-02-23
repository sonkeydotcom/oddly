import { Stack, Tabs, Link, router } from "expo-router";
import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  Pressable,
} from "react-native";
import {
  MaterialCommunityIcons,
  Ionicons,
  EvilIcons,
  Feather,
  MaterialIcons,
  FontAwesome,
  AntDesign,
} from "@expo/vector-icons";

import {
  categories,
  color,
  trending,
  mostBooked,
  offers,
} from "../constants/contants";

import { useFonts, Quicksand_400Regular } from "@expo-google-fonts/quicksand";
import { Raleway_400Regular } from "@expo-google-fonts/raleway";
import Tasker from "../components/tasker";

const AggregatorList = () => {
  return (
    <>
      <SafeAreaView>
        <Stack.Screen
          options={{
            headerTitle: "Select a tasker",
            headerTitleStyle: { fontWeight: "bold" },
            headerBackTitleVisible: false,
          }}
        />
      </SafeAreaView>
      <View style={{ backgroundColor: "#fff" }}>
        <Tasker />
      </View>
    </>
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
export default AggregatorList;
