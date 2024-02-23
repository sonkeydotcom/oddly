import React, { useState, useEffect } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { Stack, router, useLocalSearchParams } from "expo-router";
import {
  addDoc,
  collection,
  getFirestore,
  Timestamp,
} from "firebase/firestore";

const Invoice = () => {
  const { id } = useLocalSearchParams();
  const [expense, setExpense] = useState("");
  const [charge, setCharge] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [invoice, setInvoice] = useState([]);

  // ...

  <TouchableOpacity disabled={isButtonDisabled}>
    <Text>Button</Text>
  </TouchableOpacity>;

  const db = getFirestore();

  console.log(id);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "bookings", id, "invoice"),
      (snapshot) => {
        if (snapshot.empty) {
          return;
        }
        // Alert and navigation code here
        setIsButtonDisabled(true);
      }
    );
    return () => unsub();
  }, []);

  const createInvoice = async () => {
    // Validate input fields
    if (!expense || !charge) {
      Alert.alert("Error", "Please enter expense and payable amount");
      return;
    }

    // Create a new invoice object
    const invoice = {
      client: "Sonkey",
      expense: parseFloat(expense),
      charge: parseFloat(charge),
      total: parseFloat(expense) + parseFloat(charge),
    };

    // Show loading indicator
    setIsLoading(true);

    try {
      const invoiceRef = addDoc(collection(db, "bookings", id, "invoice"), {
        date: Timestamp.fromDate(new Date()),
        invoiceNumber: "INV-0001",
        customer: "userName",
        total: parseFloat(expense) + parseFloat(charge),
        isPaid: false,
      });
      console.log("Document written with ID: ", invoiceRef.id);
      // Simulate sending invoice (replace with actual Firestore operation)
      //await new Promise((resolve) => setTimeout(resolve, 3000));

      // Hide loading indicator
      setIsLoading(true);

      // Display success message
      setTimeout(() => {
        Alert.alert("Invoice Sent!", "Oya wait for payment");
      }, 3000);
    } catch (error) {
      // Hide loading indicator and display error message
      setIsLoading(false);
      console.error(error);
      Alert.alert("Error", "Failed to send invoice. Please try again.");
    }

    // Log the invoice data (replace with actual Firestore operation)
    console.log(invoice);
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerShadowVisible: false,
          boxShadow: false,
          headerTitle: "",
        }}
      />
      {invoice.map((item) => (
        <>
          <Text>{item.id}</Text>
        </>
      ))}

      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.text}> Client </Text>
          <Text style={styles.text}> Sonkey </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.text}> Expense: </Text>
          <TextInput
            style={styles.textInput}
            value={expense}
            keyboardType="number-pad"
            returnKeyType="done"
            onChangeText={(text) => setExpense(text)}
            placeholder="N200.00"
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.text}> Payable Amount: </Text>
          <TextInput
            style={styles.textInput}
            value={charge}
            keyboardType="numeric"
            returnKeyType="done"
            onChangeText={(text) => setCharge(text)}
            placeholder="N200.00"
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.text}> Total: </Text>
          <Text style={styles.text}>
            {" "}
            {parseFloat(expense) + parseFloat(charge)}{" "}
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={createInvoice}
            disabled={isButtonDisabled}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Send Invoice</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default Invoice;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
  },
  text: {
    fontSize: 16,
    fontWeight: "500",
  },
  textInput: {
    fontWeight: "600",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "green",
  },
  buttonContainer: {
    bottom: 0,
    marginTop: "auto",
    width: "100%",
    marginBottom: 30,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  button: {
    backgroundColor: "green",
    paddingVertical: 15,
    borderRadius: 23,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontWeight: "600",
    color: "#fff",
  },
});
