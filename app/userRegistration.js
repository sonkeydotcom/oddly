import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import { FontAwesome } from "@expo/vector-icons";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { getFirestore, setDoc, doc } from "firebase/firestore";

const UserRegistration = () => {
  const auth = getAuth();
  const db = getFirestore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errors, setErrors] = useState({
    displayName: "",
    email: "",
    phoneNumber: "",
    password: "",
  });
  useEffect(() => {
    // Check if the user is already logged in
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // Redirect to home screen if user is logged in
        router.replace("home");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSignup = async () => {
    // Reset any previous error messages
    setErrors({
      displayName: "",
      email: "",
      phoneNumber: "",
      password: "",
    });
    // Check if all required fields are filled out

    if (!displayName) {
      setErrors((prevState) => ({
        ...prevState,
        displayName: "Please enter your full name.",
      }));
    }

    if (!email) {
      setErrors((prevState) => ({
        ...prevState,
        email: "Please enter your email address.",
      }));
    }

    // Validate email address format
    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrors((prevState) => ({
        ...prevState,
        email: "Please enter a valid email address.",
      }));
    }

    if (!phoneNumber) {
      setErrors((prevState) => ({
        ...prevState,
        phoneNumber: "Please enter your phone number.",
      }));
    }

    if (!password || password.length < 6) {
      setErrors((prevState) => ({
        ...prevState,
        password: "Password must be at least 6 characters long..",
      }));
    }

    // Perform additional validation if needed (e.g., phone number format)

    // If all validation checks pass, proceed with user registration

    setLoading(true);

    try {
      // Create user in Firebase Authentication
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredentials.user;

      await updateProfile(user, {
        displayName,
        phoneNumber,
        emailVerified: false,
        photoURL: "",
      });

      // Update user profile
      await setDoc(doc(db, "users", user.uid), {
        displayName,
        email,
        phoneNumber,
        emailVerified: false,
        averageRating: "",
        createdAt: new Date(),
      });

      // Send email verification
      await sendEmailVerification(user);

      setLoading(false);
      Alert.alert(
        "Success",
        "Account created successfully. Please verify your email."
      );
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setErrors((prevState) => ({
          ...prevState,
          email: "Email address is already in use.",
        }));
      }
      console.log(error.message);
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{
        flex: 1,
      }}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Welcome</Text>
        <TextInput
          placeholder="Full Name"
          value={displayName}
          onChangeText={setDisplayName}
          style={[styles.input, errors.displayName && styles.errorInput]}
        />
        {errors.email && <Text style={styles.error}>{errors.email}</Text>}
        <TextInput
          placeholder="Email Address"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          style={[styles.input, errors.email && styles.errorInput]}
        />

        <TextInput
          placeholder="Phone Number"
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          style={[styles.input, errors.phoneNumber && styles.errorInput]}
        />
        {errors.password && <Text style={styles.error}>{errors.password}</Text>}
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={[styles.input, errors.password && styles.errorInput]}
        />

        <View style={styles.terms}>
          <Text style={styles.termsText}>
            By clicking below and creating an account, you accept our terms or
            service and privacy policy
          </Text>
        </View>
        <TouchableOpacity onPress={handleSignup} style={styles.button}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Create Account</Text>
          )}
        </TouchableOpacity>
        <View>
          <Text style={styles.already}>Already have an account? signIn</Text>
        </View>
        <View style={styles.orContainer}>
          <View style={styles.divider} />
          <Text style={styles.orText}>or</Text>
          <View style={styles.divider} />
        </View>
        <TouchableOpacity style={styles.googleButton} onPress={() => {}}>
          <FontAwesome name="google" size={20} color="#de5246" />
          <Text style={styles.googleButtonText}>Sign Up with Google</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: "80%",
  },
  button: {
    backgroundColor: "#14213d",
    padding: 10,
    borderRadius: 5,
    width: "80%",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  orContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#ccc",
  },
  orText: {
    marginHorizontal: 10,
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
  },
  googleButtonText: {
    marginLeft: 10,
  },
  terms: {
    width: "80%",
    alignItems: "center",
    marginVertical: 8,
  },
  termsText: {
    textAlign: "center",
    color: "#333",
    fontSize: 12,
  },
  already: {
    marginTop: 8,
  },
  errorInput: {
    borderColor: "red",
    borderWidth: 1,
  },
  error: {
    color: "red",
    marginBottom: 2,
    textAlign: "left",
    width: "80%",
  },
});

export default UserRegistration;
