import { useEffect, useState } from "react";
import { SelectList } from "react-native-dropdown-select-list";
import {
  View,
  Text,
  TextInput,
  Pressable,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  ActivityIndicator,
  signInWithCredential,
  OAuthProvider,
  Button,
  Alert,
  ScrollView,
} from "react-native";

import { FontAwesome } from "@expo/vector-icons";
import { Link, router, Stack } from "expo-router";
import { SafeAreaView } from "react-native";
import * as Location from "expo-location";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  getReactNativePersistence,
  GoogleAuthProvider,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  GeoPoint,
  getDoc,
  getDocs,
  collection,
} from "firebase/firestore";

import firebase from "firebase/app";
import { categories } from "../constants/contants";
const Registration = () => {
  const auth = getAuth();
  const db = getFirestore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState("Waiting..");
  const [state, setState] = useState("Waiting..");
  const [city, setCity] = useState("Waiting..");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]);

  const [showCategory, setShowCategory] = useState(false);

  const [location, setLocation] = useState(null);

  const handlePress = () => {
    setSelectedCategory(categories.name);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        router.replace("home");
      }
    });
  }, []);

  useEffect(() => {
    const addData = async () => {
      const querySnapshot = await getDocs(collection(db, "categories"));
      const categories = querySnapshot.docs.map((doc) => doc.data());
      setCategories(categories);
    };

    addData();
  }, []);

  const handleSignup = async () => {
    setLoading(true);

    try {
      // Fetch user's location
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        throw new Error("Permission to access location was denied");
      }

      let location = await Location.getCurrentPositionAsync({});
      let latitude = location.coords.latitude;
      let longitude = location.coords.longitude;

      // Create user in Firebase Authentication
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredentials.user;
      console.log(user.email);

      // Store user data in Firestore
      const userData = {
        name: fullName,
        email: email,
        latitude,
        longitude, // Store location as GeoPoint
        country: "USA",
        category: selectedCategory,
      };

      await setDoc(doc(db, "users", user.uid), userData);
      console.log("User data added to Firestore");

      setLoading(false);
    } catch (error) {
      Alert.alert(error.message);
      setLoading(false);
    }
  };

  /*const handleSignup = async () => {
    setLoading(true);

    try {
      // Fetch user's location
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        throw new Error("Permission to access location was denied");
      }

      let location = await Location.getCurrentPositionAsync({});
      let latitude = location.coords.latitude;
      let longitude = location.coords.longitude;

      // Create user in Firebase Authentication
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredentials.user;
      console.log(user.email);

      // Fetch selected category
      const selectedCategoryDocRef = doc(db, "categories", selectedCategory);
      const selectedCategoryDoc = await getDoc(selectedCategoryDocRef);
      const selectedCategoryData = selectedCategoryDoc.data();

      // Store user data in Firestore
      const userData = {
        name: fullName,
        email: email,
        latitude,
        longitude, // Store location as GeoPoint
        country: "USA",
        category: selectedCategory,
        categoryName: selectedCategoryData.name, // Add category name
      };

      // Save user data
      await setDoc(doc(db, "users", user.uid), userData);

      console.log("User data added to Firestore");

      setLoading(false);
    } catch (error) {
      Alert.alert(error.message);
      setLoading(false);
    }
  };*/

  return (
    <>
      <SafeAreaView>
        <StatusBar />
        <Stack.Screen
          options={{
            // Hide the header for all other routes.
            headerTransparent: true,
            headerBackVisible: true,
            headerTitle: "",
          }}
        />
      </SafeAreaView>
      <KeyboardAvoidingView
        behavior="padding"
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontWeight: "600", fontSize: 20 }}> Welcome </Text>
        <View>
          <TextInput
            placeholder="John@wrkly.com"
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.textInput}
          />

          <TextInput
            placeholder=" Semira Suleiman"
            value={fullName}
            onChangeText={(text) => setFullName(text)}
            style={styles.textInput}
          />

          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
            style={styles.textInput}
          />
          <View style={{}}>
            <Text>Choose a Category: </Text>
            <TouchableOpacity
              placeholder="Password"
              title="Select category"
              style={styles.textInput}
              editable={false}
              onPress={() => {
                setShowCategory(!showCategory);
              }}
            >
              <Text>
                {" "}
                {selectedCategory ? selectedCategory : "Select category"}
              </Text>
            </TouchableOpacity>

            {showCategory ? (
              <ScrollView style={{ borderColor: "#ccc", borderWidth: 1 }}>
                {categories.map((categories) => (
                  <TouchableOpacity
                    key={categories.id}
                    style={[
                      {
                        padding: 12,
                      },
                    ]}
                    onPress={() => {
                      setSelectedCategory(categories.name);
                      setShowCategory(false); // Hide category selection
                    }}
                  >
                    <Text style={{ fontWeight: 600 }}>{categories.name}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            ) : null}
          </View>
          {/* Category selection */}
          <View style={{ flexDirection: "row", marginVertical: 10 }}></View>

          <TouchableOpacity onPress={handleSignup} style={styles.button}>
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={{ fontWeight: "bold", color: "#fff" }}>
                {" "}
                Create account{" "}
              </Text>
            )}
          </TouchableOpacity>

          {/*<TouchableOpacity onPress={handleSignup} style={styles.button}>
                <Text> Register </Text>
          </TouchableOpacity> */}

          {/* Divider  */}

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              alignContent: "center",
              marginVertical: 20,
            }}
          >
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "#ccc",
                width: 150,
                marginTop: -10,
              }}
            >
              <Text></Text>
            </View>
            <View>
              <View>
                <Text> or </Text>
              </View>
            </View>
            <View>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: "#ccc",
                  width: 150,
                  marginTop: -10,
                }}
              >
                <Text></Text>
              </View>
            </View>
          </View>

          {/* Google button  */}
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginVertical: 20,

              flexDirection: "row",
            }}
          >
            <TouchableOpacity onPress={() => {}} style={styles.signIn}>
              <FontAwesome name="google" size={23} color="#de5246" />
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: "auto",
              alignItems: "center",
            }}
          ></View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    width: 300,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginVertical: 10,
  },
  signIn: {
    paddingHorizontal: 5,
    paddingVertical: 12,

    backgroundColor: "#fff",
    borderRadius: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    alignItems: "center",
    alignItems: "center",
    justifyContent: "space-evenly",
    textTransform: "capitalize",
    width: 50,
  },

  button: {
    paddingVertical: 14,
    flexDirection: "row",
    backgroundColor: "#14213d",
    borderRadius: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    alignItems: "center",
    justifyContent: "space-evenly",
    textTransform: "capitalize",
    width: 300,
    marginVertical: 22,
  },
});

export default Registration;
