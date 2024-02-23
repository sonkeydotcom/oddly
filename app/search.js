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
} from "react-native";
import { EvilIcons, Ionicons, Feather, AntDesign } from "@expo/vector-icons";

import { services, tasker } from "../constants/contants";

export default function Search({ navigation, route }) {
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [filteredData, setFilteredData] = useState([]);

  const handleSearch = (text) => {
    setSearch(text);
    setIsLoading(true);

    // Filter data based on search query
    const filtered = tasker.filter((item) =>
      item.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filtered);
    setIsLoading(false);
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
            borderRadius: 12,
            backgroundColor: "#fff",
            padding: 4,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <AntDesign
            name="arrowleft"
            size={21}
            color="black"
            onPress={() => router.back()}
            style={{ marginRight: 10 }}
          />

          <TextInput
            placeholder="E.g Fix Air conditioner"
            autoFocus
            value={search}
            onChangeText={(text) => handleSearch(text)}
            returnKeyType="search"
            style={{ paddingVertical: 8, width: 300 }}
          />
        </View>
      </View>
      {isLoading ? (
        <ActivityIndicator size="large" color="#ccc" />
      ) : (
        <View>
          <FlatList
            data={filteredData}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View>
                <Text>{item.name}</Text>
              </View>
            )}
          />

          <Text> Search results </Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  search: {
    backgroundColor: "#fff",
    padding: 12,
  },
});
