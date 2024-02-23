import { View, Text } from "react-native";
import React from "react";
import moment from "moment";

const Sender = ({ item }) => {
  const time = moment(item.createdAt.toDate()).fromNow();
  //const date = new Date(soo.seconds * 1000);
  //const time = date.toLocaleTimeString().replace(/:\d+ /, " ");

  return (
    <View style={{ padding: 12 }}>
      <View
        style={{
          backgroundColor: "#2e0fff",
          padding: 10,
          borderBottomRightRadius: 8,
          borderBottomRightRadius: 8,
          borderTopLeftRadius: 8,
          borderBottomLeftRadius: 8,
          marginLeft: "auto",
          alignSelf: "flex-start",
        }}
      >
        <Text style={{ color: "#fff" }}>{item.message}</Text>
        <Text style={{ fontSize: 10, color: "#ccc" }}> {time} </Text>
      </View>
    </View>
  );
};

export default Sender;
