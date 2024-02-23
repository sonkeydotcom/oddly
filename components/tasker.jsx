import { Stack, Tabs, Link, router, useLocalSearchParams } from "expo-router";

import React, { useState, useRef } from "react";
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
  Animated,
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

import { useFonts, Quicksand_400Regular } from "@expo-google-fonts/quicksand";
import { Raleway_400Regular } from "@expo-google-fonts/raleway";

const Tasker = ({ taskade, distance }) => {
  const service = useLocalSearchParams();

  const servname = service.name;
  console.log(servname);

  return (
    <View
      style={{
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: "#fff",
      }}
    >
      <TouchableOpacity
        onPress={() => {
          router.navigate({
            pathname: `/taskerProfile`,
            params: {
              taskName: servname,
              displayName: taskade.displayName,
              id: taskade.id,
              bio: taskade.bio,
              rating: taskade.rating,
              reviews: taskade.reviews,
              completedTasks: taskade.completedTasks,
              phoneNumber: taskade.phoneNumber,
              availalibity: taskade.availalibity,
              avatar: taskade.avatar,
              latitude: taskade.latitude,
              longitude: taskade.longitude,
              distance,
              taskade,
            },
          });
        }}
        style={{
          alignItems: "justify",

          //borderRadius: 12,
          marginVertical: 6,
          paddingVertical: 10,

          backgroundColor: "#fff",
          elevation: 5, // for Android elevation
          borderBottomWidth: 1,
          borderBottomColor: "#f5f5f5",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "justify",
          }}
        >
          <View style={{}}>
            <Image
              source={
                taskade?.avatar
                  ? { uri: taskade.avatar }
                  : {
                      uri: "https://firebasestorage.googleapis.com/v0/b/oddly-96c55.appspot.com/o/assets%2Fimages%2Favatar.png?alt=media&token=8db4e993-f29e-471f-9001-0c5ee859f577",
                    }
              }
              style={{
                height: 80,
                width: 80,
                borderRadius: 12,
              }}
            />

            {/*<View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    backgroundColor: "#000",
                    alignItems: "center",
                    opacity: "0.5",
                    marginTop: -25,
                    paddingVertical: 4,
                    paddingHorizontal: 4,
                    //borderBottomLeftRadius: 8,

                    shadowColor: "#000",
                    shadowOffset: { width: 1, height: -10 }, // Controls the direction of the shadow
                    shadowOpacity: 1, // Controls the transparency of the shadow
                    shadowRadius: 3.8, // Controls the blur radius of the shadow
                    elevation: 5, // for Android elevation
                  }}
                >
                  <Text style={{ color: "#fff", fontWeight: 600 }}>
                    {item.task}
                  </Text>
                  <Text style={{ color: "#fff", fontWeight: 600 }}>
                    <MaterialCommunityIcons
                      name="currency-ngn"
                      size={10}
                      color="white"
                    />
                    2000
                  </Text>
                </View>*/}
          </View>
          <View
            style={{
              marginHorizontal: 20,
              marginVertical: 4,
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>
              {taskade?.displayName}
            </Text>

            <View style={{ flexDirection: "row", marginVertical: 8 }}>
              <MaterialIcons name="star-rate" size={14} color="gold" />
              <MaterialIcons name="star-rate" size={15} color="gold" />
              <MaterialIcons name="star-rate" size={15} color="gold" />
              <MaterialIcons name="star-rate" size={14} color="gold" />
              <Text>
                {taskade?.rating ? taskade.rating : "0"} (
                {taskade?.reviews ? taskade.reviews : "0"} reviews) {distance}{" "}
                away
              </Text>
            </View>

            <View style={{ flexDirection: "row" }}>
              <MaterialIcons name="event-available" size={16} color="black" />
              <Text style={{ textTransform: "capitalize" }}>
                {taskade?.availalibity}
              </Text>
            </View>
            <View style={{ flexDirection: "row", marginVertical: 8 }}>
              <MaterialCommunityIcons
                name="clock-check-outline"
                size={15}
                color="black"
              />
              <Text> {taskade?.completedTasks} Tasks </Text>
            </View>
            <View
              style={{
                borderRadius: 4,
                backgroundColor: "#f5f5f5",
                paddingVertical: 12,
                paddingHorizontal: 6,
                marginVertical: 3,
                width: 250,
              }}
            >
              <Text
                style={{ fontSize: 12, color: "#333333", fontWeight: 500 }}
                numberOfLines={2}
                ellipsizeMode="tail"
                wrap="true"
              >
                <MaterialCommunityIcons
                  name="format-quote-open"
                  size={16}
                  color="#ccc"
                />
                {taskade?.bio}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({});
export default Tasker;
