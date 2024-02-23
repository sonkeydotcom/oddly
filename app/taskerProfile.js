import {
  Stack,
  Tabs,
  Link,
  router,
  useLocalSearchParams,
  useGlobalSearchParams,
} from "expo-router";
import { useState } from "react";
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
  Fontisto,
} from "@expo/vector-icons";

import {
  categories,
  color,
  trending,
  mostBooked,
  offers,
} from "../constants/contants";

import Tasker from "../components/tasker";
import Taskerinfo from "../components/taskerinfo";
import Reviews from "../components/reviews";
import Schedule from "../components/schedule";
import Location from "../components/location";

import {
  setDoc,
  doc,
  getFirestore,
  addDoc,
  collection,
  Timestamp,
} from "firebase/firestore";

import { getAuth } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addBooking } from "../features/bookingSlice";

const db = getFirestore();
const auth = getAuth();
const user = auth.currentUser;

const Taskerprofile = () => {
  const taskade = useLocalSearchParams();

  const taskName = useGlobalSearchParams();

  const item = taskade;

  const [showComponent, setShowComponent] = useState(false);
  const handleButtonPress = () => {
    // Toggle the state to show/hide the component
    setShowComponent(!showComponent);
  };

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const dispatch = useDispatch();

  const handleDateChange = (date) => {
    setSelectedDate(date); // Update the selected date state
  };

  const createBookingHandler = () => {
    // Create a booking

    // Save the booking details to the database
    // Dispatch an action to update the state

    {
      const dateToString = selectedDate.toISOString();
      const newBooking = {
        taskName: taskName.taskName,
        userId: auth.currentUser ? auth.currentUser.uid : null,
        userName: user ? user.displayName : null,
        userPhone: user ? user.phoneNumber : null,
        taskerId: item ? item.id : null,
        taskerName: item ? item.displayName : null,
        taskerPhone: item ? item.phoneNumber : null,
        taskDate: dateToString,
        taskerLocation: item
          ? { lat: item.latitude, lng: item.longitude }
          : null,
      };
      dispatch(addBooking(newBooking));
      console.log("newBooking", newBooking);
    }

    router.push({ pathname: `checkout`, params: { taskade } }); // Navigate to the checkout page
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "",
          headerTransparent: true,
          headerLeft: () => (
            <View
              style={{
                backgroundColor: "white",
                padding: 8,
                opacity: 0.5,
                borderRadius: 50,
              }}
            >
              <AntDesign
                name="arrowleft"
                size={24}
                color="black"
                onPress={() => router.pop()}
              />
            </View>
          ),
        }}
      />

      <ScrollView>
        <Image
          source={require("../assets/images/skincare.jpg")}
          style={{ height: 300, width: "100%" }}
        />

        <View
          style={{
            paddingVertical: 10,
            flexDirection: "row",
            marginTop: -40,
            paddingHorizontal: 10,
            backgroundColor: "#000",
            opacity: 0.3,
            shadowColor: "#000",
            shadowOffset: { width: 1, height: -10 }, // Controls the direction of the shadow
            shadowOpacity: 1, // Controls the transparency of the shadow
            shadowRadius: 5, // Controls the blur radius of the shadow
            elevation: 5, // for Android elevation
          }}
        >
          <MaterialIcons name="star-rate" size={16} color="gold" />
          <MaterialIcons name="star-rate" size={16} color="gold" />
          <MaterialIcons name="star-rate" size={16} color="gold" />
          <Text
            style={{ marginHorizontal: 4, color: "white", fontWeight: "bold" }}
          >
            {taskade?.rating ? taskade.rating : "0"} (
            {taskade?.reviews ? taskade.reviews : "0"} reviews)
          </Text>
        </View>
        <View
          style={{
            backgroundColor: "#fff",
            paddingHorizontal: 8,
            paddingVertical: 12,
          }}
        >
          <Taskerinfo
            avatar={require("../assets/images/skincare.jpg")} // Replace with the correct path
            amount="1000"
          />
          <Reviews
            title="sonleu"
            name="Chinenye"
            avatar={require("../assets/images/skincare.jpg")} // Replace with the correct path
            rating="5.5"
            reviews="100"
            totaltasks="50"
            amount="1000"
            availability="weekend"
            desc="I have been doing this for over three months, i am very repnsile and take quick actions"
          />
        </View>
      </ScrollView>
      {showComponent &&
        ((<Location />), (<Schedule onDateChange={handleDateChange} />))}

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
          onPress={handleButtonPress}
          style={{
            paddingVertical: 10,
            paddingHorizontal: 8,
          }}
        >
          <Fontisto name="date" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          disabled={!showComponent}
          onPress={createBookingHandler}
          style={{
            backgroundColor: showComponent ? "#3498db" : "#ccc",
            paddingVertical: 10,
            paddingHorizontal: 8,
            borderRadius: 8,
            width: 300,
            alignContent: "center",
          }}
        >
          <Text style={{ fontSize: 16, textAlign: "center", color: "#fff" }}>
            {showComponent ? "Save & continue" : "Select date"}
          </Text>
        </TouchableOpacity>
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
export default Taskerprofile;
