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
          Oddly
        </Text>
      </View>
      <View
        style={{
          padding: 12,
        }}
      >
        <TouchableOpacity style={styles.signIn}>
          <FontAwesome name="google" size={23} color="#de5246" />
          <Text> Sign in with Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signIn}>
          <FontAwesome name="apple" size={23} color="black" />
          <Text> Sign in with Apple</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          alignContent: "center",
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
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text> Email </Text>
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
        <Text> Password </Text>
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
          onPress={() => router.replace("/home")}
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
          <Text> New user? Registere Here</Text>
        </View>
      </View>


      import {
  View,
  Text,
  TextInput,
  Pressable,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native";
export default function Home() {
  return (
    <>
      <SafeAreaView>
        <StatusBar />
      </SafeAreaView>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 20,
          paddingVertical: 20,
        }}
      >
        <View>
          <TouchableOpacity
            style={styles.signIn}
            onPress={() => router.push("/home")}
          >
            <FontAwesome name="google" size={23} color="#de5246" />
            <Text> Sign in with Google</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.signIn}>
            <FontAwesome name="apple" size={23} color="black" />
            <Text> Sign in with Apple</Text>
          </TouchableOpacity>
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
    width: "auto",
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
