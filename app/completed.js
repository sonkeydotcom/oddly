import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";

import React, { useState, useEffect } from "react";
import { router, Link, Stack, useLocalSearchParams } from "expo-router";
import {
  addDoc,
  collection,
  getFirestore,
  Timestamp,
  onSnapshot,
  doc,
} from "firebase/firestore";

import { MaterialCommunityIcons } from "@expo/vector-icons";

const completed = () => {
  const { id } = useLocalSearchParams();
  const [modalVisible, setModalVisible] = useState(false);
  const [isCheck, setIsCheck] = useState(false);
  const [invoiceData, setInvoiceData] = useState([]);

  const db = getFirestore();

  const handleCash = () => {
    if (!isCheck) {
      router.push("completedn");
    }
    setIsCheck(!isCheck);
  };

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const unsub = onSnapshot(
          collection(db, "bookings", id, "invoice"),
          (snapshot) => {
            if (snapshot.empty) {
              return;
            }
            // Alert and navigation code here
            console.log("Invoice data: ", snapshot.docs[0].data());
            setInvoiceData(snapshot.docs[0].data());
          }
        );
      } catch (error) {
        console.error("Error fetching invoice:", error);
      }
    };
    fetchInvoice();
  }, [db, id]);

  console.log(id);
  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: "",
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
      <View style={styles.container}>
        <View style={styles.invoice}>
          <Text style={styles.invoiceHeaderText}>Invoice</Text>

          <>
            <View
              style={{
                backgroundColor: "#f5f5f5",
                paddingHorizontal: 12,
                paddingVertical: 12,
                borderRadius: 12,
              }}
            >
              <Text>Invoice Number: {invoiceData.invoiceNumber}</Text>
              <Text>Customer: {invoiceData.customer}</Text>
              <Text>Total: {invoiceData.total}</Text>
              <Text>Is Paid: {invoiceData.isPaid ? "Yes" : "No"}</Text>
            </View>
          </>
        </View>
        <View style={styles.invoice}>
          <Text style={styles.invoiceHeaderText}> Payment Methods </Text>
          <TouchableOpacity
            onPress={() => handleCash()}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: 10,

              paddingVertical: 10,
            }}
          >
            <Text> Cash</Text>
            <MaterialCommunityIcons
              name={isCheck ? "check-circle" : "circle-outline"}
              size={23}
              color={isCheck ? "green" : "#333333"}
            />
          </TouchableOpacity>
          <View style={styles.divider}></View>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: 10,
              alignContent: "center",

              paddingVertical: 10,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                alignContent: "center",
              }}
            >
              <MaterialCommunityIcons name="plus" size={23} color="#333333" />
              <Text style={{ marginLeft: 8 }}>Add debit/credit card</Text>
            </View>
            <MaterialCommunityIcons
              name="chevron-right"
              size={23}
              color="#ccc"
            />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default completed;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  invoice: {
    backgroundColor: "#fff",
    width: "100%",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,

    borderRadiusBottomLeft: 12,

    borderRadiusBottomRight: 12,
  },
  invoiceHeaderText: {
    fontSize: 23,
    fontWeight: "bold",
    marginBottom: 10,
  },
  invoiceDetails: {
    marginTop: 20,
    backgroundColor: "#fff",
  },
  payment: {
    backgroundColor: "#fff",
    width: "100%",
    padding: 20,
    borderRadius: 10,
    borderTopLeftRadius: 12,
    borderRadiusTopRight: 12,
  },
  divider: {
    height: 1,
    backgroundColor: "#f5f5f5",
    marginVertical: 11,
  },
});
