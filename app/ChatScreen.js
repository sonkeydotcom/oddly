import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { collection, query, where, getDocs } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { useLocalSearchParams } from "expo-router";

const ChatScreen = ({ route }) => {
  const { bookingId, userId, taskerId } = useLocalSearchParams();
  const db = getFirestore();
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    const fetchChatMessages = async () => {
      try {
        const chatRef = collection(db, "bookings", bookingId, "chats");
        const q = query(chatRef, where("senderId", "in", [userId, taskerId]));
        const querySnapshot = await getDocs(q);
        const messages = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setChatMessages(messages);
      } catch (error) {
        console.error("Error fetching chat messages:", error);
      }
    };

    fetchChatMessages();
  }, [bookingId, userId, taskerId]);

  return (
    <>
      <SafeAreaView>
        <ScrollView
          style={{
            backgroundColor: "#fff",
            paddingHorizontal: 8,
            paddingVertical: 12,
          }}
        >
          <View>
            <Text
              style={{ fontSize: 16, fontWeight: "600", marginVertical: 10 }}
            >
              Chat Messages
            </Text>
            {chatMessages.map((message) => (
              <View
                key={message.id}
                style={{
                  borderColor: "#ccc",
                  borderWidth: 1,
                  marginVertical: 8,
                  paddingVertical: 8,
                  paddingHorizontal: 12,
                  borderRadius: 4,
                  justifyContent: "space-between",
                  shadowColor: "#333333",
                  shadowOffset: { width: 4, height: 5 },
                  shadowOpacity: 0.2,
                  shadowRadius: 4,
                  backgroundColor: "#fff",
                  elevation: 5,
                }}
              >
                <Text>{message.content}</Text>
                <Text>{message.timestamp}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default ChatScreen;
