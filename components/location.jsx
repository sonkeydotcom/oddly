import { Link, Stack, router } from "expo-router";
import { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
  FlatList,
  Pressable,
} from "react-native";
import { EvilIcons, Ionicons, Feather, AntDesign } from "@expo/vector-icons";
import { SearchBar } from "react-native-screens";
import { services, tasker } from "../constants/contants";
import axios from "axios";

const Location = () => {
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [addr, setAddr] = useState("");

  const handleaddr = (item) => {
    setAddr(item.display_name);
    setFilteredData("");
  };

  const handleSearch = (text) => {
    // Update the search state with the entered text
    setSearch(text);

    // Set isLoading to true while the request is being made
    setIsLoading(true);

    axios
      .get(
        `https://nominatim.openstreetmap.org/search?q=${text}&format=json&polygon=1&countrycodes=NG`
      )
      .then((res) => {
        console.log(res.data);
        // Update the filteredData state with the response data
        setFilteredData(res.data);

        // Set isLoading to false after the request is complete
        setIsLoading(false);
      })
      .catch((err) => {
        alert(err);

        // Set isLoading to false if an error occurs
        setIsLoading(false);
      });
  };
  return (
    <SafeAreaView>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <View style={styles.search}>
        <View
          style={{
            borderColor: "#ccc",
            borderWidth: 1,
            borderRadius: 4,
            backgroundColor: "#fff",
            padding: 8,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <EvilIcons name="location" size={20} color="black" />

          <TextInput
            placeholder="Enter your location"
            autoComplete="address-line1"
            value={!addr ? search : addr}
            onChangeText={(text) => handleSearch(text)}
            returnKeyType="search"
            style={{ width: 300 }}
          />
        </View>
      </View>
      {isLoading ? (
        <ActivityIndicator size="large" color="#ccc" />
      ) : (
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.place_id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleaddr(item)}>
              <View
                style={{
                  paddingHorizontal: 16,
                  backgroundColor: "#fff",
                  paddingVertical: 10,
                  borderBottomWidth: 1,
                  borderBottomColor: "#ccc",
                }}
              >
                <Text style={{ fontWeight: "500" }}>{item.display_name}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  search: {
    backgroundColor: "#fff",
    padding: 12,
  },
});

export default Location;
