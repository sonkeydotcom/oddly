import { Stack, router, useLocalSearchParams } from "expo-router";
import React, { useState, useEffect } from "react";
import {
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import { MaterialCommunityIcons, Ionicons, Entypo } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { selectBookingItems } from "../features/bookingSlice";

import {
  collection,
  addDoc,
  doc,
  getDocs,
  getFirestore,
  Timestamp,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import moment from "moment";

const Checkout = () => {
  const { displayName } = useLocalSearchParams();
  const db = getFirestore();
  const auth = getAuth();
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [isEmpty, setIsEmpty] = useState(false);
  const [taskerId, setTaskerId] = useState("");
  const [tasker, setTasker] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  console.log(taskerId);

  const user = auth.currentUser;

  const bookings = useSelector((state) => state.booking.bookings);
  console.log(tasker.taskerName);

  useEffect(() => {
    if (bookings.length > 0) {
      setTaskerId(bookings[0].taskerId); // Assuming taskerId is in the first bookingjjjjjj
      setTasker(bookings[0]);
    }
  }, [bookings]);

  const handleCheckout = async () => {
    setButtonDisabled(true); // Disable the button
    setIsLoading(true); // Show the loading indicator

    if (!text) {
      setError("Please enter a message"); // Corrected assignment
      setIsEmpty(true);
      setIsLoading(false);
      setButtonDisabled(false);
      return;
    }

    try {
      setIsLoading(true);
      // Add booking to firebase
      const bookingRef = await addDoc(collection(db, "bookings"), {
        name: "cleaning",
        userId: user.uid,
        userName: user.displayName,
        taskerName: tasker.taskerName,
        taskerPhone: tasker.taskerPhone,
        taskerId: tasker.taskerId,
        date: Timestamp.fromDate(new Date()),
      }).catch((error) => {
        throw new Error("Error adding booking to Firebase: " + error.message);
        setButtonDisabled(false);
      });

      // Create a 'chats' subcollection under the new booking
      const chatRef = collection(doc(db, "bookings", bookingRef.id), "chats");
      await addDoc(chatRef, {
        message: text,
        createdAt: Timestamp.fromDate(new Date()),
        userId: user.uid,
        // Add other fields as necessary
      }).catch((error) => {
        throw new Error(
          "Error adding chat message to Firebase: " + error.message
        );
      });
      console.log("Booking created successfully with ID: ", bookingRef.id);
      // Display an alert
      Alert.alert("Success", "Booking created successfully!");

      // Wait for 2 seconds, then navigate to the 'chats' screen
      setTimeout(() => {
        router.replace({ pathname: "chats", params: { id: bookingRef.id } }); // Navigate to the chat page
      }, 2000);
    } catch (error) {
      console.error("Error creating booking:", error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={100}
        style={{ flex: 1, justifyContent: "space-between" }}
      >
        <SafeAreaView>
          <Stack.Screen
            options={{
              headerTitle: "Review and schedule",
              headerBackTitleVisible: false,
              headerTitleStyle: { fontWeight: "bold" },
            }}
          />
        </SafeAreaView>
        {bookings.map((booking, index) => {
          const dateObject = new Date(booking.taskDate);
          const date = moment(dateObject).format("dddd, Do MMMM YYYY");
          const time = dateObject.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          });

          return (
            <>
              <ScrollView
                style={{
                  backgroundColor: "#fff",
                  paddingHorizontal: 10,
                }}
              >
                <View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      padding: 2,
                    }}
                  >
                    <MaterialCommunityIcons
                      name="credit-card-outline"
                      size={22}
                      color="#2c3e50"
                    />
                    <Text
                      style={{
                        fontSize: 15,
                        color: "#4d4d4d", //b3b3b3, 666666, 333333z

                        marginVertical: 10,
                        marginLeft: 8,
                      }}
                    >
                      Don't worry, you won't be billed until your task is
                      complete.
                    </Text>
                  </View>

                  <View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 17,
                          fontWeight: "600",
                          marginVertical: 10,
                          textTransform: "capitalize",
                        }}
                      >
                        {booking.taskName}
                      </Text>
                      <View
                        style={{
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <Image
                          source={
                            booking?.photoURL
                              ? { uri: booking.photoURL }
                              : {
                                  uri: "https://firebasestorage.googleapis.com/v0/b/oddly-96c55.appspot.com/o/assets%2Fimages%2Favatar.png?alt=media&token=8db4e993-f29e-471f-9001-0c5ee859f577",
                                }
                          }
                          style={{ width: 50, height: 50, borderRadius: 25 }}
                        />
                        <Text style={{ fontSize: 15 }}>
                          {booking.taskerName}
                        </Text>
                      </View>
                    </View>

                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Ionicons
                        name="calendar-clear-outline"
                        size={20}
                        color="black"
                      />
                      <Text
                        style={{
                          fontSize: 15,
                          marginVertical: 10,
                          marginHorizontal: 8,
                        }}
                      >
                        {date}
                      </Text>
                    </View>
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <MaterialCommunityIcons
                        name="clock-outline"
                        size={22}
                        color="#2c3e50"
                      />
                      <Text
                        style={{
                          fontSize: 15,
                          marginVertical: 10,
                          marginHorizontal: 8,
                        }}
                      >
                        {time}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.payment}>
                    <Text
                      style={{
                        fontWeight: 600,
                        fontSize: 17,
                      }}
                    >
                      Payment
                    </Text>

                    <TouchableOpacity
                      onPress={() => router.navigate("payment")}
                      style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 17,
                          color: "#3498db",
                        }}
                      >
                        Add Payment
                      </Text>
                      <Entypo
                        name="chevron-thin-right"
                        size={23}
                        color="#3498db"
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.price}>
                    <Text
                      style={{
                        fontWeight: 600,
                        fontSize: 16,
                        marginVertical: 10,
                      }}
                    >
                      Price details:
                    </Text>
                    <Text style={{}}>
                      Specify a price that aligns with your budget
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginVertical: 8,

                        alignSelf: "flex-end",
                      }}
                    >
                      <Text style={{ fontWeight: 700, fontSize: 20 }}>
                        {" "}
                        NGN{" "}
                      </Text>
                      <TextInput
                        keyboardType="numeric"
                        placeholder="1000.00"
                        style={{ fontWeight: 700, fontSize: 20 }}
                      />
                    </View>
                  </View>
                </View>

                <View>
                  <View style={{ marginVertical: 8 }}>
                    <Text style={{ fontWeight: 600, fontSize: 16 }}>
                      Anything else? (Optional)
                    </Text>
                  </View>
                  <TextInput
                    multiline={true}
                    value={text}
                    onChangeText={(text) => {
                      setText(text);
                      setIsEmpty(false);
                    }}
                    style={[
                      {
                        height: 150,
                        padding: 8,
                        borderWidth: 1,
                        borderColor: isEmpty ? "red" : "#ccc", // Apply red border if isEmpty is true
                        borderRadius: 8,
                      },
                    ]}
                    placeholder="Special informations for tasker. Example, What supplies are needed "
                  />
                  <Text style={{ color: "red" }}>{error}</Text>

                  <Text
                    style={{
                      fontSize: 12,
                      paddingHorizontal: 4,
                      marginVertical: 8,
                      color: "#3b5998",
                    }}
                  >
                    By proceeding you accept the terms of service and privacy
                    policy, as well as the Taskers terms of service, including
                    the COVID-19 safety guidelines and the cancellation policy.
                    You also agree to pay the total amount of the booking if
                    accepted otherwise state the price you are willing to pay.
                  </Text>
                </View>
              </ScrollView>
            </>
          );
        })}

        <View
          style={{
            backgroundColor: "#fff",
            paddingHorizontal: 6,
            paddingVertical: 6,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          <TouchableOpacity
            onPress={handleCheckout}
            disabled={isButtonDisabled}
            style={{
              backgroundColor: "#3498db",
              paddingVertical: 10,
              paddingHorizontal: 8,
              borderRadius: 8,
              width: 350,
              alignContent: "center",
            }}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text
                style={{
                  fontWeight: 600,
                  fontSize: 16,
                  textAlign: "center",
                  color: "#fff",
                }}
              >
                Confirm booking and chat
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({
  search: {
    backgroundColor: "#fff",
    padding: 12,
  },
  payment: {
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignContent: "center",

    paddingVertical: 10,
  },

  price: {
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginVertical: 18,
    paddingVertical: 10,
  },

  errorInput: {
    borderColor: "red",
  },
});

export default Checkout;
