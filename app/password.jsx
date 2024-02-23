import { useState } from "react";
import {
  View,
  Text,
  Image,
  Touchable,
  TouchableOpacity,
  ActivityIndicator,
  Button,
  TextInput,
  StyleSheet,
} from "react-native";
import {
  Ionicons,
  SimpleLineIcons,
  Feather,
  MaterialCommunityIcons,
  MaterialIcons,
  EvilIcons,
  Entypo,
} from "@expo/vector-icons";
import { getAuth, updateProfile } from "firebase/auth";
import { Stack, router } from "expo-router";

const password = () => {
  const auth = getAuth();
  const [name, setName] = useState("");

  const user = auth.currentUser;
  if (user !== null) {
    // The user object has basic properties such as display name, email, etc.
    const displayName = user.displayName;
    const email = user.email;
    const photoURL = user.photoURL;
    const emailVerified = user.emailVerified;

    const uid = user.uid;
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerShadowVisible: false,
          headerBackTitle: "Back",
          headerTitle: "",
        }}
      />
      <View
        style={{
          backgroundColor: "#fff",
          paddingVertical: 8,
        }}
      >
        <View style={styles.row}>
          <MaterialCommunityIcons
            name="account-edit"
            size={23}
            color="#b3b3b3"
          />

          <Text style={styles.rowText}> Kennedy sunday </Text>
        </View>
        <View style={styles.row}>
          <Entypo name="mobile" size={22} color="#b3b3b3" />

          <Text style={styles.rowText}> 08150215728 </Text>
        </View>
        <View style={styles.row}>
          <MaterialCommunityIcons
            name="email-edit-outline"
            size={22}
            color="#b3b3b3"
          />

          <Text style={styles.rowText}> annagu.kennedy@gmail.com </Text>
        </View>
        <View style={styles.btn}>
          <TouchableOpacity style={styles.button} onPress={() => {}}>
            <Text style={styles.buttonText}> Edit Profile </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  constainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
    borderBottomColor: "#f0f0f0",
    borderBottomWidth: 1,
  },
  btn: { padding: 20, backgroundColor: "#fff", alignItems: "center" },
  button: {
    padding: 12,
    backgroundColor: "green",
    alignItems: "center",
    borderRadius: 28,
    width: "100%",
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: 600 },

  rowText: {
    textAlign: "left",
    fontSize: 16,
    marginLeft: 20,
  },
});

export default password;
