import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Pressable,
  TextInput,
  TouchableNativeFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import React, { useState } from "react";
import { router, Link, Stack, useLocalSearchParams } from "expo-router";

import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";

const completedn = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isCheck, setIsCheck] = useState(false);
  const [onfocus, setIsFocused] = useState(false);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);

  const rate = (num) => {
    setRating(num);
    console.log(rating);
  };

  const renderStars = () => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity key={i} onPress={() => rate(i)}>
          <AntDesign
            name={i <= rating ? "star" : "staro"}
            size={35}
            color={i <= rating ? "gold" : "black"}
          />
        </TouchableOpacity>
      );
    }
    return stars;
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: "",
          headerShadowVisible: false,
          headerRight: () => (
            <Text
              style={{
                color: "#333333",
                marginRight: 20,
                fontSize: 16,
                fontWeight: 600,
              }}
              onPress={() => router.push("completedn")}
            >
              Done
            </Text>
          ),
        }}
      />
      <TouchableNativeFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <View style={styles.container}>
            <View style={styles.invoice}>
              <Text style={styles.invoiceHeaderText}>
                {" "}
                How was your experience?{" "}
              </Text>
              <View
                style={{
                  paddingHorizontal: 12,
                  paddingVertical: 12,
                  borderRadius: 12,
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 20,
                  }}
                >
                  {renderStars()}
                </View>
                <View style={{}}>
                  <TextInput
                    placeholder="Write a review"
                    multiline={true}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    style={{
                      paddingHorizontal: 10,
                      paddingVertical: 10,
                      borderWidth: onfocus ? 2 : 1,
                      borderColor: onfocus ? "green" : "#ccc",
                      height: 160,
                      width: 300,
                      borderRadius: 12,
                    }}
                  />
                </View>
              </View>
            </View>
            <View
              style={{
                bottom: 0,
                marginTop: "auto",
                width: "100%",
                marginBottom: 30,
                paddingHorizontal: 20,
                alignItems: "center",
              }}
            >
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}> Done </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </TouchableNativeFeedback>
    </>
  );
};

export default completedn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  invoice: {
    backgroundColor: "#fff",
    width: "100%",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: "center",
  },
  invoiceHeaderText: {
    fontSize: 20,
    fontWeight: 700,
    marginBottom: 10,
  },
  invoiceDetails: {
    marginTop: 20,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "green",
    paddingVertical: 12,
    borderRadius: 23,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
});
