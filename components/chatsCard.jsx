import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { router } from "expo-router";
import moment from "moment";

const ChatsCard = ({ mybooking, currentUserUid, currentUser }) => {
  const isCurrentUserMessage = mybooking.userId === currentUserUid;

  console.log("mybooking", mybooking.taskerName);

  return (
    <TouchableOpacity
      onPress={() =>
        router.navigate({
          pathname: `/chats`,
          params: { id: mybooking.id }, // Pass the id as a property of an object
        })
      }
      style={styles.container}
    >
      <View style={{ flexDirection: "row" }}>
        <Image
          source={require("../assets/images/avatar.png")}
          style={{ height: 45, width: 45 }}
        />
        <Text style={styles.name}>
          {mybooking.taskerId !== currentUserUid
            ? mybooking.taskerName
            : mybooking.userName}
        </Text>
      </View>
      <View>
        <Text style={styles.time}>
          {" "}
          {moment(mybooking.date.toDate()).fromNow()}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ChatsCard;

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f4f4f4",
  },
  time: {
    fontSize: 13,
    fontWeight: 700,
  },
  name: {
    fontSize: 16,
    fontWeight: 700,
    marginLeft: 10,
  },
});
