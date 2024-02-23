import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";

import { Stack, router } from "expo-router";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  getFirestore,
  query,
  where,
  getDoc,
  doc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import Sender from "../../components/sender";
import Receiver from "../../components/receiver";
import ChatsCard from "../../components/chatsCard";

export default function messenger() {
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const auth = getAuth();
  const db = getFirestore();
  const user = auth.currentUser;

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      setIsLoading(true);
      try {
        const userId = auth.currentUser.uid;

        // Query for bookings where the current user is the tasker
        const taskerQuery = query(
          collection(db, "bookings"),
          where("taskerId", "==", userId)
        );

        // Query for bookings where the current user is the requester
        const requesterQuery = query(
          collection(db, "bookings"),
          where("userId", "==", userId)
        );

        // Perform both queries simultaneously
        const [taskerSnapshot, requesterSnapshot] = await Promise.all([
          getDocs(taskerQuery),
          getDocs(requesterQuery),
        ]);

        // Combine the results of both queries into a single array
        const bookingList = [
          ...taskerSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
          ...requesterSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })),
        ];

        setBookings(bookingList);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, []);

  console.log("bookings", bookings);

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: "Chats",
        }}
      />
      <View
        style={{ flex: 1, alignContent: "center", justifyContent: "center" }}
      >
        {isLoading ? (
          <>
            <ActivityIndicator
              title="Loading..."
              size="large"
              style={{
                alignContent: "center",
                justifyContent: "center",
                alignSelf: "center",
                paddingHorizontal: 10,

                paddingVertical: 10,
              }}
              color="#ccc"
            />
          </>
        ) : (
          <>
            <FlatList
              data={bookings}
              keyExtractor={(item) => item.id}
              renderItem={({ item: mybooking }) => (
                <ChatsCard
                  mybooking={mybooking}
                  currentUser={user}
                  currentUserUid={user.uid}
                />
              )}
            />
          </>
        )}
      </View>
    </>
  );
}
