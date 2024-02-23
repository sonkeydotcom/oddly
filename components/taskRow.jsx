import { View, Text, StyleSheet } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";

const TaskRow = ({ booking }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 8,
        alignContent: "center",
        alignItems: "center",
        borderBottomWidth: 2,
        borderBottomColor: "#fff",
      }}
    >
      <View style={{}}>
        <Text> 24 july </Text>
        <Text> 9am </Text>
      </View>
      <View>
        <Text> {booking.name} </Text>
        <Text> {booking.taskerName}</Text>
      </View>
      <View>
        <Text>
          <MaterialCommunityIcons
            name="phone-message-outline"
            size={24}
            color="black"
          />
        </Text>
      </View>
    </View>
  );
};

export default TaskRow;
