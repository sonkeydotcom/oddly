import { Text, View, StyleSheet, Image } from "react-native";
import React, { Component } from "react";
import {
  MaterialCommunityIcons,
  Ionicons,
  EvilIcons,
  Feather,
  MaterialIcons,
  FontAwesome,
  AntDesign,
} from "@expo/vector-icons";
import { color } from "../constants/contants";
import moment from "moment";
import Tasker from "./tasker";

const TaskerBookingCard = ({ booking }) => {
  const date = moment(booking.date.toDate()).format("dddd, MMM Do YYYY");
  const time = moment(booking.date.toDate()).format("h:mm a");
  return (
    <>
      <View
        style={{
          justifyContent: "space-between",
          flexDirection: "row",
          paddingHorizontal: 8,
          paddingVertical: 12,
          backgroundColor: "#fff",
          alignContent: "center",
          alignItems: "center",
          borderRadius: 8,
          marginVertical: 4,
          borderColor: "#f4f4f4",
          borderWidth: 1,
        }}
      >
        <View>
          <View>
            <Text
              style={{
                fontWeight: 500,
                textTransform: "capitalize",
                fontSize: 18,
                marginVertical: 6,
              }}
            >
              {booking.name}
            </Text>
          </View>

          <View style={styles.icons}>
            <MaterialCommunityIcons name="calendar" size={18} color="#b3b3b3" />
            <Text style={styles.texts}> {date}</Text>
          </View>
          <View style={styles.icons}>
            <MaterialCommunityIcons
              name="clock-outline"
              size={18}
              color="#b3b3b3"
            />
            <Text style={styles.texts}> {time} </Text>
          </View>

          <View style={styles.icons}>
            <MaterialCommunityIcons
              name="map-outline"
              size={18}
              color="#b3b3b3"
            />
            <Text style={styles.texts}>Booking location</Text>
          </View>
        </View>
        <View style={{ alignItems: "center" }}>
          <Image
            source={require("../assets/images/avatar.png")}
            style={{ height: 50, width: 50 }}
          />
          <Text style={{ fontSize: 10 }}> {booking.userName} </Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  texts: {
    marginVertical: 4,
    marginHorizontal: 4,
    fontSize: 16,
  },

  icons: {
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
  },
});

export default TaskerBookingCard;
