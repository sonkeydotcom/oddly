import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
  FlatList,
} from "react-native";
import { router, useLocalSearchParams, Stack } from "expo-router";
import MapView from "react-native-maps";
import { MaterialCommunityIcons, AntDesign, Entypo } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import {
  addDoc,
  getDocs,
  collection,
  getFirestore,
  Timestamp,
  onSnapshot,
} from "firebase/firestore";

const bookingDetails = () => {
  const [invoice, setInvoice] = useState([]);
  const db = getFirestore();
  const { id, userName, userPhone } = useLocalSearchParams();

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
          headerShadowVisible: false,
          headerBackTitle: "Back",
          headerTitle: "",
        }}
      />

      <View style={{ flex: 1 }}>
        <MapView
          onPress={() => router.navigate("/map")}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          style={{ width: "100%", height: 200 }}
        />
        <TouchableOpacity
          style={{ backgroundColor: "#fff" }}
          onPress={() => router.navigate("/map")}
        >
          <View style={styles.direction}>
            <Text style={styles.text}> Kamazo kaduna</Text>
            <Text style={styles.text}> 2.5km away, </Text>
            <Text style={styles.text}> 10mins </Text>
            <AntDesign name="rightcircleo" size={16} color="black" />
          </View>
        </TouchableOpacity>

        <ScrollView
          style={{
            flexDirection: "column",
          }}
        >
          <View style={styles.row}>
            <Text style={styles.headerText}>Furniture assembly</Text>
            <View style={styles.rows}>
              <Text>Details</Text>
              <Text>
                I have a six foot bed i would like you to help me arrange
              </Text>
            </View>
            <View style={styles.rows}>
              <Text>Task Address</Text>
              <Text>Kamazo Kaduna </Text>
            </View>

            <View style={styles.rows}>
              <Text>Pricing </Text>
            </View>
          </View>

          <View style={styles.person}>
            <View style={{ flexDirection: "row" }}>
              <Image
                source={require("../assets/images/avatar.png")}
                style={{ height: 30, width: 30 }}
              />
              <View>
                <Text style={{ color: "#ccc", fontSize: 10 }}> Client </Text>
                <Text> {userName} </Text>
              </View>
            </View>
            <View>
              <TouchableOpacity
                onPress={() =>
                  router.push({ pathname: `/chats`, params: { id } })
                }
              >
                <Entypo name="chat" size={24} color="black" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={() => Linking.openURL(`tel:${userPhone}`)}
            >
              <MaterialCommunityIcons name="phone" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginHorizontal: 8,
              marginVertical: 20,
            }}
          >
            <TouchableOpacity
              style={{ paddingVertical: 8 }}
              onPress={() =>
                Alert.alert(
                  "Forfeit Task",
                  "Are you sure you want to forfeit this task?",
                  [
                    {
                      text: "Cancel",
                      onPress: () => console.log("Cancel Pressed"),
                      style: "cancel",
                    },
                    { text: "Yes", onPress: () => console.log("Yes Pressed") },
                  ],
                  { cancelable: true }
                )
              }
            >
              <Text style={{ color: "#FF6347", fontSize: 16, fontWeight: 600 }}>
                Forfeit Task
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <View style={styles.bottomT}>
          <TouchableOpacity
            onPress={() => {
              router.navigate({ pathname: "/invoice", params: { id } });
            }} // replace with your function to send an invoice
            style={styles.sendInvoice}
          >
            <Text style={styles.buttonText}>Send Invoice</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default bookingDetails;

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    fontWeight: 500,
  },
  headerText: {
    fontWeight: 600,
    fontSize: 20,
    textTransform: "capitalize",
  },
  bottomT: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    marginTop: "auto", // "auto" is not working, so we use "marginTop: 'auto'

    bottom: 0,
    left: 0,
    right: 0,
  },

  direction: {
    paddingHorizontal: 8,
    paddingVertical: 12,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  acceptTask: {
    paddingVertical: 16,
    backgroundColor: "green",
    width: "100%",
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: 600 },
  sendInvoice: {
    paddingVertical: 16,
    backgroundColor: "green",
    width: "100%",
    alignItems: "center",
  },
  row: {
    paddingHorizontal: 8,
    paddingVertical: 12,
    marginVertical: 8,
    backgroundColor: "#fff",
  },

  rows: {
    marginVertical: 8,
  },

  rowText: {
    textAlign: "left",
    fontSize: 16,
    marginLeft: 20,
  },
  separator: {
    marginVertical: 10,
  },
  divider: {
    height: 1,
    width: 1,
    backgroundColor: "#d9d9d9",
  },
  person: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",

    paddingVertical: 20,
    paddingHorizontal: 8,
    alignItems: "center",
  },
});
