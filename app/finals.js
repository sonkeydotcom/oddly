import { useEffect } from "react";
import { Link, Stack, router } from "expo-router";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  View,
  Vibration,
} from "react-native";
import {
  EvilIcons,
  Ionicons,
  MaterialCommunityIcons,
  Feather,
  AntDesign,
} from "@expo/vector-icons";
import { SearchBar } from "react-native-screens";
import { StatusBar } from "expo-status-bar";

const Finals = () => {
  useEffect(() => {
    Vibration.vibrate(100);
  }, []);

  return (
    <>
      <SafeAreaView>
        <StatusBar style="auto" />
        <Stack.Screen
          options={{
            headerShown: false,

            headerTitleStyle: { fontWeight: "bold" },
          }}
        />
      </SafeAreaView>

      <View
        style={{
          backgroundColor: "#fff",
          paddingHorizontal: 6,
          paddingVertical: 6,
          flex: 1,
          alignItems: "center",
          justifyContent: "center",

          marginTop: "auto",
        }}
      >
        <View style={{ marginVertical: 20 }}>
          <Image
            source={require("../assets/images/checkmark.png")}
            style={{ height: 100, width: 100, alignSelf: "center" }}
          />
        </View>
        <Text style={{ fontSize: 20, fontWeight: 600 }}>
          Your booking is confirmed!
        </Text>
        <Text style={{ fontSize: 20, fontWeight: 600, textAlign: "center" }}>
          Please be patient while the tasker accepts your booking.
        </Text>

        <TouchableOpacity
          onPress={() => router.replace("messenger")}
          style={{
            backgroundColor: "#14213D",
            paddingVertical: 10,
            paddingHorizontal: 8,
            borderRadius: 8,
            width: 350,
            alignContent: "center",
            marginTop: "auto",
          }}
        >
          <Text
            style={{
              fontWeight: 600,
              fontSize: 16,
              textAlign: "center",
              color: "#fff",
            }}
          >
            Message Tasker
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  payment: {
    borderColor: "#ccc",
    marginTop: 18,
    borderWidth: 1,
    marginVertical: 8,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 4,
    justifyContent: "space-between",
    shadowColor: "grey",
    shadowOffset: { width: 4, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    backgroundColor: "#fff",
    elevation: 5, // for Android elevation
  },
});

export default Finals;
