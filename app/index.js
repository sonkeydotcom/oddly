import {
  View,
  Text,
  TextInput,
  Pressable,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Link, router } from "expo-router";
export default function Home() {
  return (
    <>
      <View
        style={{
          marginTop: 110,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            fontSize: 34,
          }}
        >
          {" "}
          Oddly
        </Text>
      </View>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <View
          style={{
            backgroundColor: "white",
            borderWidth: 1,
            borderColor: "#ccc",
            flexDirection: "row",
            borderRadius: 4,
            width: "90%",
            padding: 14,
          }}
        >
          <Text> +234 </Text>
          <TextInput
            placeholder="Enter phone number"
            inputMode="tel"
            keyboardType="phone-pad"
            returnKeyType="done"
            maxLength={10}
            style={{
              color: "black",
            }}
          />
        </View>

        <TouchableOpacity
          onPress={() => router.push("/home")}
          style={{
            flexDirection: "row",
            marginTop: 20,
            borderRadius: 4,
            width: "90%",
            backgroundColor: "grey",
            alignItems: "center",
            justifyContent: "center",
            padding: 12,
          }}
        >
          <Text
            style={{
              color: "white",
            }}
          >
            Get verification code
          </Text>
        </TouchableOpacity>

        <View style={styles.divider}>
          <Text> Sign in using </Text>
          <View
            style={{
              flexDirection: "row",
              padding: 12,
            }}
          >
            <TouchableOpacity style={styles.signIn}>
              <FontAwesome name="google" size={23} color="#de5246" />
              <Text> Google</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.signIn}>
              <FontAwesome name="apple" size={23} color="black" />
              <Text> Apple</Text>
            </TouchableOpacity>
          </View>

          <Text> New user? Registere Here</Text>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  divider: {
    fontSize: 30,
    alignItems: "center",
    paddingBottom: 10,
    marginTop: 50,
    position: "relative",
  },

  signIn: {
    paddingHorizontal: 32,
    paddingVertical: 12,
    width: "50%",
    margin: 2,
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    textTransform: "capitalize",
  },
});
