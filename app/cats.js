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

const Item = ({ name }) => (
  <View
    style={{ padding: 20, borderBottomWidth: 1, borderBottomColor: "#ccc" }}
  >
    <Text>{name}</Text>
  </View>
);

const Cats = () => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

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
      const itemsRef = collection(db, "items");

      try {
        const querySnapshot = await getDocs(itemsRef);
        const data = [];
        querySnapshot.forEach((doc) => {
          const item = doc.data();
          // Check if the item belongs to the desired category
          if (item.category === "Capentry") {
            // Modify category condition
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
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, paddingTop: 50 }}>
      {errorMsg && <Text>{errorMsg}</Text>}
      <FlatList
        data={items}
        renderItem={({ item }) => <Item name={item.name} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default Cats;
