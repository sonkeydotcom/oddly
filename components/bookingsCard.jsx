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

const BookingsCard = ({ booking }) => {
  const date = moment(booking.date.toDate()).format("dddd, MMM Do YYYY");
  const time = moment(booking.date.toDate()).format("h:mm a");
  return (
    <>
      <View
        style={{
          backgroundColor: "#fff",

          borderRadius: 8,

          marginVertical: 6,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 8,
            paddingVertical: 12,

            marginVertical: 6,
          }}
        >
          <View
            style={{
              borderRightWidth: 1,
              borderRightColor: "#ccc",
              paddingRight: 12,
              alignContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 17, fontWeight: 600 }}>
              {moment(booking.date.toDate()).format("D")}
            </Text>
            <Text style={{ fontSize: 17, fontWeight: 600 }}>
              {moment(booking.date.toDate()).format("MMM")}
            </Text>
          </View>
          <View>
            <Text
              style={{
                fontWeight: 500,
                textTransform: "capitalize",
                fontSize: 18,
              }}
            >
              Cleaning
            </Text>
            <Text style={{ marginVertical: 6, fontSize: 16 }}>
              {moment(booking.date.toDate()).format("h:mm a - dddd")}
            </Text>
            <Text> Sonkey </Text>
          </View>
          <View>
            <Image
              source={require("../assets/images/avatar.png")}
              style={{ height: 50, width: 50 }}
            />
          </View>
        </View>
        <View
          style={{
            borderTopColor: "#f4f4f4",
            borderTopWidth: 1,
            paddingVertical: 8,
            paddingHorizontal: 8,
          }}
        >
          <Text
            style={{
              color: "orange",
              textAlign: "center",
              fontSize: 16,
              fontWeight: 500,
            }}
          >
            Reschedule
          </Text>
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

export default BookingsCard;
