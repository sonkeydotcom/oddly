import { Stack, Tabs, Link, router } from "expo-router";
import { useState, useEffect } from "react";
import * as Location from "expo-location";
import { useFonts } from "expo-font";
import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
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
import Featured from "../../components/featured";
import Tiles from "../../components/offertiles";
import SubList from "../../components/sublist";
import Maps from "../../components/maps";
import mbxGeocoding from "@mapbox/mapbox-sdk/services/geocoding";

import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "../../features/counterSlice";

import { getFirestore, collection, getDocs } from "firebase/firestore";
import { FirebaseApp } from "firebase/app";

export default function home() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [address, setAddress] = useState("Waiting..");

  let text = "Waiting..";

  const geocodingClient = mbxGeocoding({
    accessToken:
      "pk.eyJ1Ijoic29ua2V5IiwiYSI6ImNscnk1eGFiNTE5ZmQybnRlMmZnNG1uamkifQ.6wx_Zelk802bbBam5DdtRw",
  });

  let latitude, longitude;

  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        const latitude = location.coords.latitude; // Assign latitude here
        const longitude = location.coords.longitude; // Assign longitude here

        const response = await fetch(``);
        const data = await response.json();
        setAddress(data.display_name);

        // Reverse geocode the coordinates to get the address
        /*geocodingClient
        .reverseGeocode({
          query: [longitude, latitude],
        })
        .send()
        .then((response) => {
          const place_name = response.body.features[0].place_name;
          setAddress(place_name);
        });*/
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  if (errorMsg) {
    alert(errorMsg);
  } else if (location) {
    text = JSON.stringify(location);
  }

  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <View accessibilityRole="scrollbar" style={{ fontFamily: "" }}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVrticalScrollIndicator={false}
      >
        <SafeAreaView style={{ flex: 1, flexDirection: "column" }}>
          <Stack.Screen
            options={{
              headerShadowVisible: false,
              boxShadow: false,
              headerTitle: "",
              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => {
                    Location.getCurrentPositionAsync({});
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      width: 300,
                    }}
                  >
                    <EvilIcons name="location" size={24} color="black" />
                    <Text
                      style={{
                        fontWeight: "500",
                        fontFamily: "",
                      }}
                    >
                      {address}
                    </Text>
                  </View>
                </TouchableOpacity>
              ),
            }}
          />

          <View style={styles.search}>
            <Text style={{ fontWeight: "400", fontSize: 16, color: "#ccc" }}>
              {" "}
              What service are you looking for?{" "}
            </Text>
            <TouchableOpacity
              onPress={() => router.push("/search")}
              style={{
                borderColor: "#cccc",
                borderWidth: 1,
                borderRadius: 12,
                backgroundColor: "#fff",
                padding: 8,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.1,
                shadowRadius: 12,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Feather name="search" size={24} color="#ccc" />
              <Text style={{ color: "#ccc" }}> E.g Fix Air conditioner </Text>
            </TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity onPress={() => router.navigate("notification")}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginVertical: 10,
                  padding: 10,
                  backgroundColor: "#fff",
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <MaterialCommunityIcons
                    name="shield-account"
                    size={24}
                    color="black"
                  />
                  <Text style={{ marginLeft: 10 }}>
                    Covid-19 safety measures
                  </Text>
                </View>
                <View>
                  <Ionicons name="chevron-forward" size={24} color="black" />
                </View>
              </View>
            </TouchableOpacity>
          </View>

          <Categories />
          <Maps />

          <View
            style={{
              backgroundColor: "#fff",
              marginVertical: 5,
              paddingVertical: 10,
            }}
          >
            <View style={{ paddingLeft: 8 }}>
              <Text
                style={{
                  fontWeight: "600",
                  fontSize: 17,
                  marginBottom: 8,
                  fontFamily: "",
                }}
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
              paddingVertical: 10,
            }}
          >
            <View style={{ paddingLeft: 8 }}>
              <Text
                style={{ fontWeight: "600", fontSize: 17, marginBottom: 8 }}
              >
                Featured services
              </Text>
            </View>

            <Featured />
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
                style={{ fontWeight: "700", fontSize: 17, marginVertical: 8 }}
              >
                Women's care
              </Text>
            </View>

            <Tiles />
          </View>
          <TouchableOpacity
            onPress={() => {
              router.push("ChatScreen");
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "row",

                backgroundColor: "#fff",
                padding: 10,
                alignItems: "center",
                alignContent: "center",

                justifyContent: "space-between",
              }}
            >
              <View style={{ width: 200 }}>
                {/* Adjust styles for text as needed */}
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 18,
                    textAlign: "left",
                  }}
                >
                  Refer us and get free service
                </Text>
                <Text style={{ marginVertical: 4 }}>
                  Stand a chance to win a free service when you refer us
                </Text>
              </View>
              <View style={{}}>
                <Image
                  source={require("../../assets/images/gift.jpg")}
                  style={{ height: 150, width: 150, borderRadius: 10 }}
                />
              </View>
            </View>
          </TouchableOpacity>
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
