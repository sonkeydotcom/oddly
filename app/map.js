import { View, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import MapView from "react-native-maps";
import React from "react";
import { Stack } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const map = () => {
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTransparent: true,
          headerBackTitleVisible: true,
          headerBackTitle: "Back",
          headerTitle: "",
        }}
      />

      <MapView
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        style={{ width: "100%", height: "100%" }}
      />
      <View
        style={{
          alignContent: "center",
          alignItems: "center",
          justifyContent: "center",
          paddingVertical: 8,
          backgroundColor: "#212121",
          opacity: 0.8,

          marginTop: "auto",
          bottom: 0,
        }}
      >
        <Text style={{ color: "#fff", fontWeight: 600 }}>
          {" "}
          Use Google maps{" "}
        </Text>
      </View>
    </>
  );
};

export default map;
