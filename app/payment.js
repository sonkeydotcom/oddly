import { Link, Stack, router } from "expo-router";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  EvilIcons,
  Ionicons,
  MaterialCommunityIcons,
  Feather,
  AntDesign,
} from "@expo/vector-icons";
import { SearchBar } from "react-native-screens";
import { useState } from "react";

const Payment = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isCardSelected, setIsCardSelected] = useState(false);
  const [isCashSelected, setIsCashSelected] = useState(false);

  const toggleCardSelection = () => {
    setIsCardSelected(true);
    setIsVisible(true);
    setIsCashSelected(false);
  };

  const toggleCashSelection = () => {
    setIsCashSelected(true);
    setIsCardSelected(false);
    setIsVisible(false);
  };
  return (
    <>
      <SafeAreaView>
        <Stack.Screen
          options={{
            headerTitle: "Payment",
            headerBackTitleVisible: "false",
            headerTitleStyle: { fontWeight: "bold" },
          }}
        />
      </SafeAreaView>
      <ScrollView
        style={{
          backgroundColor: "#fff",
          paddingHorizontal: 8,
          paddingVertical: 12,
        }}
      >
        <View>
          <TouchableOpacity
            style={[
              styles.payment,
              isCardSelected
                ? { borderColor: "lightblue", borderWidth: 1 }
                : null,
            ]}
            onPress={toggleCardSelection}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <AntDesign name="creditcard" size={20} color="black" />
              <Text style={{ fontWeight: 600 }}> Credit card </Text>
            </View>
            {isVisible && (
              <View style={{ margin: 8 }}>
                <Text> provide card details here </Text>
              </View>
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleCashSelection}>
            <View
              style={[
                styles.payment,
                isCashSelected
                  ? { borderColor: "lightblue", borderWidth: 1 }
                  : null,
              ]}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <MaterialCommunityIcons name="cash" size={24} color="black" />
                <Text style={{ fontWeight: 600 }}> Cash </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

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
          onPress={() => router.replace("finals")}
          style={{
            backgroundColor: "#3498db",
            paddingVertical: 13,
            paddingHorizontal: 8,
            borderRadius: 23,
            width: 350,
            alignContent: "center",
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
            Save
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

export default Payment;
