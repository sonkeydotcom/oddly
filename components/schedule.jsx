import { Stack, Tabs, Link, router } from "expo-router";
import DateTimePicker from "@react-native-community/datetimepicker";
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
} from "@expo/vector-icons";

import {
  categories,
  color,
  trending,
  mostBooked,
  offers,
  tasker,
} from "../constants/contants";

import { useFonts, Quicksand_400Regular } from "@expo-google-fonts/quicksand";
import { Raleway_400Regular } from "@expo-google-fonts/raleway";
import { useState } from "react";
import Location from "./location";

const Schedule = ({
  name,
  rating,
  avatar,
  reviews,
  totaltasks,
  desc,
  onDateChange,
}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event, selected) => {
    const currentDate = selected || selectedDate;
    onDateChange(currentDate);
  };

  return (
    <>
      <View
        style={{
          paddingVertical: 10,
          borderBottomColor: "#ccc",
        }}
      >
        <Location />
        <View
          style={{
            borderWidth: 1,
            paddingVertical: 10,
            borderColor: "#ccc",
            width: "100%",
          }}
        >
          <View style={styles.container}>
            <DateTimePicker
              value={selectedDate}
              mode="datetime"
              display="spinner"
              onChange={handleDateChange}
              style={{ width: 320 }}
            />

            <Text style={styles.selectedDate}>
              Selected Date: {selectedDate.toDateString()}
            </Text>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  selectedDate: {
    marginTop: 20,
    fontSize: 18,
  },
});
export default Schedule;
