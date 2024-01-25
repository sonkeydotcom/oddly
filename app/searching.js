import { Link, Stack, router } from "expo-router";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { EvilIcons, Ionicons, Feather, AntDesign } from "@expo/vector-icons";
import { SearchBar } from "react-native-screens";

export default function Searching({ navigation, route }) {
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
            returnKeyType="search"
            style={{ color: "red" }}
          />
        </View>
      </View>
      <Text>serch me</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  search: {
    backgroundColor: "#fff",
    padding: 12,
  },
});
