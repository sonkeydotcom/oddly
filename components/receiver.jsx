import { View, Text, Image } from "react-native";
import React from "react";
import moment from "moment";

const Receiver = ({ item }) => {
  const time = moment(item.createdAt.toDate()).fromNow();
  return (
    <View
      style={{
        padding: 12,
        flexDirection: "row",
        alignContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        source={require("../assets/images/avatar.png")}
        style={{
          height: 30,
          width: 30,
        }}
      />
      <View
        style={{
          padding: 10,
          borderBottomLeftRadius: 8,
          borderTopRightRadius: 8,
          borderBottomRightRadius: 8,
          marginRight: "auto",
          alignSelf: "flex-end",
        }}
      >
        <Text style={{ color: "#333333" }}>{item.message}</Text>
        <Text style={{ fontSize: 10, color: "#ccc" }}> {time}</Text>
      </View>
    </View>
  );
};

export default Receiver;
