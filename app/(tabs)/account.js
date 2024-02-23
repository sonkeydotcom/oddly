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
import { getAuth, updateProfile } from "firebase/auth";
import { router } from "expo-router";
import { addDoc, collection, getFirestore } from "firebase/firestore";

import {
  Ionicons,
  SimpleLineIcons,
  Feather,
  MaterialCommunityIcons,
  MaterialIcons,
  EvilIcons,
} from "@expo/vector-icons";

const Account = () => {
  const auth = getAuth();
  const db = getFirestore();

  const user = auth.currentUser;
  if (user !== null) {
    // The user object has basic properties such as display name, email, etc.
    const displayName = user.displayName;
    const email = user.email;
    const photoURL = user.photoURL;
    const emailVerified = user.emailVerified;

    const uid = user.uid;
  }

  const handleUpdateProfile = () => {
    updateProfile(auth.currentUser, {
      displayName: "Jane Q. User",
      photoURL:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Meghan_Trainor_Interview_Jan_2020.png/123px-Meghan_Trainor_Interview_Jan_2020.png",
    })
      .then(() => {
        // Profile updated!
        alert("Profile updated");
      })
      .catch((error) => {
        // An error occurred
        // ...
      });
  };

  const add = () => {
    categories.forEach(async (category) => {
      // Add the category to the collection
      await categoriesCollection.add(category);
    });
  };

  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        // Sign-out successful.
        router.replace("/registration"); // navigate to login screen or any other screen
      })
      .catch((error) => {
        // An error happened.
        alert("Error signing out: ", error);
      });
  };
  return (
    <>
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <Image
            style={{
              height: 50,
              width: 50,
              borderRadius: 9999,
            }}
            source={{
              uri: user.photoURL
                ? user.photoURL
                : "https://firebasestorage.googleapis.com/v0/b/oddly-96c55.appspot.com/o/assets%2Fimages%2FBlank-Avatar.png?alt=media&token=c6badfb6-56b8-4f0a-b44d-b8c29ceb3f18",
            }}
          />
          <View>
            <Text style={styles.profileRowText}> {user?.displayName} </Text>
          </View>
        </View>

        <TouchableOpacity onPress={() => router.push("/editprofile")}>
          <Text style={styles.rowText}> Edit Profile </Text>
        </TouchableOpacity>

        <View style={styles.row}>
          <Feather name="user" size={22} color="#b3b3b3" />

          <Text style={styles.rowText}> Personal Info</Text>
        </View>
        <View style={styles.row}>
          <MaterialCommunityIcons name="security" size={22} color="#b3b3b3" />
          <Text style={styles.rowText}> Change password </Text>
        </View>
        <View style={styles.row}>
          <MaterialIcons name="payment" size={22} color="#b3b3b3" />
          <Text style={styles.rowText}> Payment </Text>
        </View>
        <View style={styles.row}>
          <MaterialIcons name="support-agent" size={22} color="#b3b3b3" />

          <Text style={styles.rowText}> Support </Text>
        </View>
        <View style={styles.separator}></View>

        <View style={[styles.row]}>
          <MaterialIcons name="logout" size={22} color="#b3b3b3" />
          <Text style={styles.rowText}> Logout </Text>
        </View>
        <View style={styles.divider}></View>
        <View style={styles.row}>
          <MaterialCommunityIcons
            name="trash-can-outline"
            size={22}
            color="#b3b3b3"
          />
          <Text style={styles.rowText}> Delete Account </Text>
        </View>

        <View
          style={{
            paddingVertical: 12,
            paddingHorizontal: 10,

            alignItems: "center",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <View>
            <Text> &copy; 2024 </Text>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },

  rowText: {
    textAlign: "left",
    fontSize: 16,
    marginLeft: 20,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
    marginBottom: 20,
  },
  profileRowText: {
    textAlign: "left",
    fontSize: 18,
    marginLeft: 20,
    textTransform: "uppercase",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 10,
  },
  divider: {
    height: 1,
    width: 1,
    backgroundColor: "#d9d9d9",
  },
});

export default Account;
