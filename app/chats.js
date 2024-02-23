import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  Modal,
  StyleSheet,
  Pressable,
  Alert,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  getFirestore,
  Timestamp,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import Sender from "../components/sender";
import Receiver from "../components/receiver";
import notifications from "../components/notifications";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import moment from "moment";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

const Chats = () => {
  const { id } = useLocalSearchParams();
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [invoice, setInvoice] = useState([]);

  const auth = getAuth();
  const db = getFirestore();
  const user = auth.currentUser;

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(db, "bookings", id, "chats")
        );
        const chatsArray = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setChats(chatsArray);
      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    };
    fetchChats();
  }, [message]);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "bookings", id, "invoice"),
      (snapshot) => {
        if (snapshot.empty) {
          return;
        }
        // Alert and navigation code here
        console.log("Invoice data: ", snapshot.docs[0].data());
        schedulePushNotification();
        //router.navigate({ pathname: "completed", params: { id } });
      }
    );
    return () => unsub();
  }, []);

  const sendMessage = () => {
    const docRef = addDoc(collection(db, "bookings", id, "chats"), {
      message: message,
      user: user.uid,
      createdAt: Timestamp.fromDate(new Date()),
    });
    setMessage("");
    console.log("Document written with ID: ", docRef.id);
  };

  async function schedulePushNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Task Complete",
        body: "Your task with id " + id + " has been completed",
        data: { data: "goes here" },
      },
      trigger: { seconds: 2 },
    });
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={100}
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          flex: 1,
        }}
      >
        <FlatList
          data={chats}
          renderItem={({ item }) =>
            item.user === user.uid ? (
              <>
                <Sender key={item.id} item={item} />
              </>
            ) : (
              <>
                <Receiver key={item.id} item={item} />
              </>
            )
          }
          keyExtractor={(item) => item.id}
        />

        <View>
          {isVisible && (
            <View
              style={{
                paddingVertical: 8,
                paddingHorizontal: 10,

                position: "absolute",
                bottom: 20,
                right: 10,
                zIndex: 100,
              }}
            >
              <TouchableOpacity
                onPress={() => router.push("completed", { id })}
                style={{
                  backgroundColor: "#3498db",
                  borderRadius: 10,
                  paddingVertical: 12,
                  paddingHorizontal: 24,
                  shadowColor: "rgba(0, 0, 0, 0.2)",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 1,
                  shadowRadius: 4,
                  elevation: 3,
                }}
              >
                <Text
                  style={{
                    color: "#ffffff",
                    fontSize: 16,
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Task Completed
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => schedulePushNotification()}>
                <Text> Notifications</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#ffffff",
            paddingHorizontal: 10,
            borderTopColor: "#ccc",
            borderTopWidth: 1,
            paddingVertical: 10,
            marginTop: "auto", // "auto" is not working, so we use "marginTop: 'auto'
            marginBottom: 0,
            bottom: 0,
            left: 0,
            right: 0,
          }}
        >
          <TextInput
            placeholder=" Type a  message..."
            onChangeText={(text) => setMessage(text)}
            value={message}
            style={{
              padding: 10,
              flex: 1,
              height: 40,
              borderWidth: 1,
              borderColor: "#cccccc",
              borderRadius: 20,
              paddingHorizontal: 10,
              marginRight: 10,
            }}
          />
          <TouchableOpacity onPress={() => setIsVisible(!isVisible)} style={{}}>
            <Text>
              <MaterialCommunityIcons
                name="dots-vertical"
                size={24}
                color="black"
              />
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={sendMessage} style={{}}>
            <Text>
              <MaterialCommunityIcons
                name="send-circle"
                size={26}
                color="black"
              />
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    height: "25%",
    width: "100%",
    backgroundColor: "#25292e",
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    position: "absolute",
    bottom: 0,
  },
  titleContainer: {
    height: "16%",
    backgroundColor: "#464C55",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    color: "#fff",
    fontSize: 16,
  },
  pickerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 50,
    paddingVertical: 20,
  },
});

export default Chats;
