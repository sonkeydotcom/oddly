import React, { useEffect, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  getReactNativePersistence,
  GoogleAuthProvider,
} from "firebase/auth";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";

import firebase, { initializeApp } from "firebase/app";

import { router, Stack } from "expo-router";

const firebaseConfig = {
  apiKey: "AIzaSyDz7MYUulebo7RNUhSRxPD8iTK17yN6_c4",
  authDomain: "oddly-96c55.firebaseapp.com",
  projectId: "oddly-96c55",
  storageBucket: "oddly-96c55.appspot.com",
  messagingSenderId: "832302709931",
  appId: "1:832302709931:web:93bd9c9468cfe98f510bee",
};

const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [categoriesData, setCategoriesData] = useState([]);
  const app = initializeApp(firebaseConfig);

  useEffect(() => {
    const getDocumentsWithId = async () => {
      const querySnapshot = await getDocs(collection(db, "categories"));
      const categories = querySnapshot.docs.map((doc) => ({
        id: doc.id, // This is the document's id
        ...doc.data(),
      }));
      setCategories(categories);
      setIsLoading(false);
      console.log(categories);
    };

    // Call the function
    getDocumentsWithId();
  }, []);

  const addTo = async () => {};

  return (
    <>
      <View style={{ paddingLeft: 8, backgroundColor: "#fff" }}>
        <Text style={{ fontWeight: "600", fontSize: 17, marginBottom: 8 }}>
          Categories
        </Text>
      </View>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal
        style={{ backgroundColor: "#fff" }}
      >
        {isLoading ? (
          <ActivityIndicator
            size="small"
            style={{ marginHorizontal: 10 }}
            color="#ccc"
          />
        ) : (
          categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              onPress={() => {
                router.navigate({
                  pathname: `/modal`,
                  params: { id: category.id, catname: category.name },
                });
                router.canGoBack(); // Close the modal
              }}
            >
              <View style={styles.categoryItem}>
                <Image
                  source={{ uri: category.imageUrl }}
                  style={{ height: 120, width: 110, borderRadius: 8 }}
                />
                <View style={styles.categoryOverlay}>
                  <Text
                    style={{
                      fontWeight: 600,
                      color: "#fff",
                      textTransform: "capitalize",
                    }}
                  >
                    {category.name}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  categoryItem: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 2,
    marginHorizontal: 4,
  },
  categoryOverlay: {
    ...StyleSheet.absoluteFillObject,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 8,
  },
});

export default Categories;
