import { useEffect, useState } from "react";
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
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  getReactNativePersistence,
  GoogleAuthProvider,
  initializeAuth,
} from "firebase/auth";

import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

import firebase from "firebase/app";
const Index = () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        router.replace("home");
      }
    });
  }, []);

  const handleGoogleLogin = () => {};

  const handleSignup = () => {
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log(user.email);
        setLoading(false); // Add this line
      })
      .catch((error) => {
        Alert.alert(error.message);
        setLoading(false); // And this line
      });
  };

  const handleLogin = () => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log(user.email);
        setLoading(false); // Add this line
      })
      .catch((error) => {
        Alert.alert(error.message);
        setLoading(false); // And this line
      });
  };

  return (
    <>
      <SafeAreaView>
        <StatusBar />
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
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
            style={styles.textInput}
          />

          <TouchableOpacity onPress={handleLogin} style={styles.button}>
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={{ fontWeight: "bold", color: "#fff" }}>Login</Text>
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
            <TouchableOpacity onPress={handleGoogleLogin} style={styles.signIn}>
              <FontAwesome name="google" size={23} color="#de5246" />
            </TouchableOpacity>
          </View>

          <View
            style={{
              justifyContent: "center",
              marginTop: "auto",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#000" }}>Dont have an account?</Text>
            <Button
              title="Register here"
              onPress={() => {
                router.navigate("registration");
              }}
            ></Button>

            <Button
              title="user "
              onPress={() => {
                router.navigate("userRegistration");
              }}
            />
            <Button
              title="tasker"
              onPress={() => {
                router.navigate("taskerRegistration");
              }}
            />
          </View>
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

export default Index;
