import { Stack, Tabs, Link, router } from "expo-router";
import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
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
} from "../../constants/contants";

import Categories from "../../components/categories";
import Recommended from "../../components/recommended";
import Tiles from "../../components/offertiles";

export default function home() {
  return (
    <View accessibilityRole="scrollbar">
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVrticalScrollIndicator={false}
      >
        <SafeAreaView style={{ flex: 1, flexDirection: "column" }}>
          <Tabs.Screen
            options={{
              headerShown: true,
              tabBarIcon: () => (
                <AntDesign name="home" size={24} color="black" />
              ),
            }}
          />
          <Stack.Screen
            options={{
              headerShadowVisible: false,
              boxShadow: false,
              headerTitle: "",
              headerLeft: () => (
                <EvilIcons name="location" size={24} color="black" />
              ),
            }}
          />

          <View style={styles.search}>
            <Text> What service are you looking for? </Text>
            <TouchableOpacity
              onPress={() => router.push("/searching")}
              style={{
                borderColor: "#ccc",
                borderWidth: 1,
                borderRadius: 4,
                backgroundColor: "#fff",
                padding: 8,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Feather name="search" size={24} color="#ccc" />
              <Text style={{ color: "#ccc" }}> E.g Fix Air conditioner </Text>
            </TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity onPress={() => router.push("/services")}>
              <Text> Go to</Text>
            </TouchableOpacity>
          </View>

          <Categories />

          <View
            style={{
              backgroundColor: "#fff",
              marginVertical: 5,
              paddingVertical: 10,
            }}
          >
            <View style={{ paddingLeft: 8 }}>
              <Text
                style={{ fontWeight: "bold", fontSize: 20, marginBottom: 8 }}
              >
                Most booked services
              </Text>
            </View>
            <Recommended />
          </View>

          <View
            style={{
              backgroundColor: "#fff",
              marginVertical: 5,
              paddingVertical: 28,
            }}
          >
            <View style={{ paddingLeft: 8 }}>
              <Text
                style={{ fontWeight: "bold", fontSize: 20, marginVertical: 8 }}
              >
                Women's care
              </Text>
            </View>

            <Tiles />
          </View>

          <View
            style={{
              flex: 1,
              flexDirection: "row",
              flexWrap: "wrap",
              backgroundColor: "#fff",
              padding: 10,
              alignItems: "center",
              width: "100%",
            }}
          >
            <View style={{ width: "50%" }}>
              {/* Adjust styles for text as needed */}
              <Text
                style={{ fontWeight: "bold", fontSize: 18, textAlign: "left" }}
              >
                Refer us and get free service
              </Text>
              <Text style={{ marginVertical: 4 }}>
                Stand a chance to win a free service when you refer us
              </Text>
            </View>
            <View style={{ width: "50%" }}>
              <Image
                source={require("../../assets/images/gift.jpg")}
                style={{ height: 150, width: 150, borderRadius: 10 }}
              />
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  search: {
    backgroundColor: "#fff",
    padding: 12,
  },

  footer: {
    position: "fixed",
  },
  category: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10,
    borderRadius: 4,
    borderRadius: 1,
    backgroundColor: "#ccc",
    padding: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    color: "#fff",
  },
});
