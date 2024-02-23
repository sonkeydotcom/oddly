import React, { useEffect, useState } from "react";
import {
  Stack,
  Tabs,
  Link,
  router,
  route,
  useNavigation,
  useRouter,
  useLocalSearchParams,
  setOptions,
} from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";

import {
  categories,
  color,
  trending,
  mostBooked,
  offers,
  cleaning,
  services,
  Plumbing,
} from "../constants/contants";
import SubList from "../components/sublist";

import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export default function Modal() {
  const { catname, id } = useLocalSearchParams();
  const [modalVisible, setModalVisible] = useState(true);
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  //const serviceArray = services[name] || [];
  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const fetchServices = async () => {
      setIsLoading(true);
      const querySnapshot = await getDocs(
        collection(db, "categories", id, "service")
      );
      const servicesArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setServices(servicesArray);
      setIsLoading(false);
    };
    fetchServices();
  }, []);

  const isPresented = router.canGoBack();
  return (
    <>
      {!isPresented && <Link href="../">Dismiss</Link>}
      {/* Native modals have dark backgrounds on iOS, set the status bar to light content. */}
      <Stack.Screen
        options={{
          headerTitle: `${catname}`,
        }}
      />
      {/* Use `../` as a simple way to navigate to the root. This is not analogous to "goBack". */}
      {/* Native modals have dark backgrounds on iOS, set the status bar to light content. */}
      <StatusBar style="light" />

      <FlatList
        data={services}
        renderItem={({ item: service }) =>
          isLoading ? (
            <ActivityIndicator
              size="small"
              style={{
                alignContent: "center",
                justifyContent: "center",
                alignSelf: "center",
                marginTop: 20,
              }}
              color="#333333"
            />
          ) : service.length < 1 ? (
            <Text> No service found </Text>
          ) : (
            <>
              <TouchableOpacity
                onPress={() => {
                  router.replace({
                    pathname: `details/[id]`,
                    params: service,
                    catname,
                  });
                  router.canGoBack(); // Close the modal
                  setModalVisible(false); // Close the modal
                }}
              >
                <View style={styles.container}>
                  <View style={styles.items}>
                    <Text style={{ textTransform: "capitalize" }}>
                      {" "}
                      {service.name}{" "}
                    </Text>
                    <SimpleLineIcons
                      name="arrow-right"
                      size={14}
                      color="black"
                    />
                  </View>
                </View>
              </TouchableOpacity>
            </>
          )
        }
        keyExtractor={(service) => service.id}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingVertical: 16,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5",
  },
  items: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
