import {
  Stack,
  Tabs,
  Link,
  router,
  useNavigation,
  useRouter,
  useLocalSearchParams,
  useSearchParams,
} from "expo-router";
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

import React, { useState, useEffect } from "react";
import { ActivityIndicator, Alert } from "react-native";
import {
  getFirestore,
  collection,
  query,
  where,
  getDoc,
  getDocs,
} from "firebase/firestore";
import * as Location from "expo-location";
import Tasker from "../../components/tasker";

// Function to calculate the distance between two coordinates using the Haversine formula
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers
  return distance;
};

const Item = ({ name, distance }) => (
  <View
    style={{ padding: 20, borderBottomWidth: 1, borderBottomColor: "#ccc" }}
  >
    <Text>{name}</Text>
    <Text>{distance}</Text>
  </View>
);

export default function details({ route }) {
  const navigation = useNavigation();
  const service = useLocalSearchParams();
  const { catname } = useLocalSearchParams();
  const router = useRouter();

  console.log(catname);

  const isPresented = router.canGoBack();
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [distance, setDistance] = useState(null);

  useEffect(() => {
    // Fetch the user's location
    const fetchLocation = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          throw new Error("Permission to access location was denied");
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      } catch (error) {
        setErrorMsg(error.message);
      }
    };

    // Fetch the taskers from the database
    const fetchItems = async () => {
      const db = getFirestore();
      const itemsRef = collection(db, "tasker");

      try {
        const querySnapshot = await getDocs(itemsRef);
        const data = [];
        querySnapshot.forEach((doc) => {
          const item = {
            id: doc.id, // This is the document's id
            ...doc.data(),
          };
          const distance = calculateDistance(
            // Calculate the distance between the user's location and the tasker's location
            location.coords.latitude,
            location.coords.longitude,
            item.latitude,
            item.longitude
          );

          //api.mapbox.com/directions-matrix/v1/mapbox/driving/${location.coords.latitude},${location.coords.longitude};${item.latitude},${item.longitude}&access_token=pk.eyJ1Ijoic29ua2V5IiwiYSI6ImNscnk1eGFiNTE5ZmQybnRlMmZnNG1uamkifQ.6wx_Zelk802bbBam5DdtRw
          fetch(
            `https://api.mapbox.com/directions-matrix/v1/mapbox/driving/${location.coords.longitude},${location.coords.latitude};${item.longitude},${item.latitude}?annotations=duration&access_token=pk.eyJ1Ijoic29ua2V5IiwiYSI6ImNscnk1eGFiNTE5ZmQybnRlMmZnNG1uamkifQ.6wx_Zelk802bbBam5DdtRw`
          )
            .then((response) => response.json()) // Parse response as JSON
            .then((data) => {
              // Handle the distance matrix data here
              // For example, you can extract distance and duration:
              //const drivingDistance = data.distances[0][0]; // Access the distance in meters (or data.distances[0][0] / 1000 for kilometers)

              const distance = data.destinations[0]["distance"] / 1000;

              const duration = data.durations[1][0] / 60; // Access the duration in seconds (or data.durations[0][0] / 60 for minutes)

              let distanceWithUnit;

              if (distance < 1) {
                distanceWithUnit = Math.round(distance * 1000) + "m";
              } else {
                distanceWithUnit = Math.round(distance) + "km";
              }

              setDistance(distanceWithUnit);
            })
            .catch((error) => {
              console.error("Error fetching data:", error);
            });

          // This should be set to the category selected by the user

          if (
            distance <= 50 && // Filter items based on distance less than or equal to 50km
            item.label.trim().toLowerCase() == service.name.trim().toLowerCase()
          ) {
            data.push(item);
          }
        });
        setItems(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching items: ", error);
        Alert.alert("Error", "Failed to fetch items");
        setLoading(false);
      }
    };

    // Fetch the user's location if it's not available
    if (location) {
      fetchItems();
    } else {
      fetchLocation();
    }
  }, [location]);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
        }}
      >
        <Text> Fetching Taskers </Text>
        <ActivityIndicator size="small" color="#ccc" />
      </View>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: " Select Tasker",
          headerBackTitleVisible: false,
        }}
      />
      <StatusBar style="dark" />

      {/* hey there */}
      <View style={{ flex: 1, paddingTop: 1, backgroundColor: "#fff" }}>
        {errorMsg && <Text>{errorMsg}</Text>}
        {items.length === 0 ? (
          <Text>No tasker found</Text>
        ) : (
          <FlatList
            data={items}
            renderItem={({ item: taskade }) => (
              <>
                <Tasker taskade={taskade} distance={distance} />
              </>
            )}
            keyExtractor={(item) => item.id}
          />
        )}
      </View>
    </>
  );
}
