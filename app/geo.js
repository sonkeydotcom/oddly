import React, { useState, useEffect } from "react";
import { View, Text, FlatList, ActivityIndicator, Alert } from "react-native";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import * as Location from "expo-location";

import { categories, gender } from "../constants/contants";

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

const Geo = () => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [distance, setDistance] = useState(null);

  useEffect(() => {
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

    const fetchItems = async () => {
      const db = getFirestore();
      const itemsRef = collection(db, "users");

      try {
        const querySnapshot = await getDocs(itemsRef);
        const data = [];
        querySnapshot.forEach((doc) => {
          const item = doc.data();
          const distance = calculateDistance(
            location.coords.latitude,
            location.coords.longitude,
            item.latitude,
            item.longitude
          );
          console.log(`Distance between the two points: ${distance} km`);
          fetch(
            `https://api.distancematrix.ai/maps/api/distancematrix/json?origins=${location.coords.latitude},${location.coords.longitude}&destinations=${item.latitude},${item.longitude}&key=j8zVRXWNw9KLUfFjD0r4pIFv4Yn76G0aoeKXT9ltyrNk7AZVijzOGzdcmmbI0eMo`
          )
            .then((response) => response.json()) // Parse response as JSON
            .then((data) => {
              console.log(data);
              // Handle the distance matrix data here
              // For example, you can extract distance and duration:
              const distance = data.rows[0].elements[0].distance.text;

              const duration = data.rows[0].elements[0].duration.text;
              console.log(`Distance: ${distance}, Duration: ${duration}`);
              setDistance(distance);
            })
            .catch((error) => {
              console.error("Error fetching data:", error);
            });

          let selectedCategory = "Painting"; // This should be set to the category selected by the user
          if (distance <= 50 && item.category == selectedCategory) {
            // Filter items based on distance greater than 50km
            data.push({ id: doc.id, ...item });
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

    if (location) {
      fetchItems();
    } else {
      fetchLocation();
    }
  }, [location]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text> Fetching Taskers </Text>
        <ActivityIndicator size="small" color="#ccc" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, paddingTop: 50 }}>
      {errorMsg && <Text>{errorMsg}</Text>}
      {items.length === 0 ? (
        <Text>No tasker found</Text>
      ) : (
        <FlatList
          data={items}
          renderItem={({ item }) => (
            <View>
              <Text>{item.name}</Text>
              <Text>{distance} Away</Text>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
};

export default Geo;
