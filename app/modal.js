import {
  Stack,
  Tabs,
  Link,
  router,
  useNavigation,
  useRouter,
  useLocalSearchParams,
} from "expo-router";
import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
} from "react-native";
import {
  MaterialCommunityIcons,
  Ionicons,
  EvilIcons,
  Feather,
  MaterialIcons,
  FontAwesome,
  AntDesign,
} from "@expo/vector-icons";

import {
  categories,
  color,
  trending,
  mostBooked,
  offers,
} from "../constants/contants";

export default function Modal() {
  const navigation = useNavigation();
  const item = useLocalSearchParams();

  const isPresented = router.canGoBack();
  console.log(item);
  return (
    <>
      {/* Use `../` as a simple way to navigate to the root. This is not analogous to "goBack". */}
      {!isPresented && <Link href="../">Dismiss</Link>}
      {/* Native modals have dark backgrounds on iOS, set the status bar to light content. */}
      <StatusBar style="light" />

      <ScrollView>
        <StatusBar />
        <Image
          source={require("../assets/images/cleaning.png")}
          style={{ height: 200 }}
        />

        <View>
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: `modal`,
                params: item,
              })
            }
            style={{
              paddingHorizontal: 8,
              marginVertical: 5,
              paddingVertical: 25,
              backgroundColor: "#fff",
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>
              {item.name}
            </Text>
            <Text
              style={{
                paddingVertical: 2,
                color: "#36454f",
              }}
            >
              <MaterialIcons name="star-rate" size={13} color="#36454f" />
              {item.rating} ({item.reviews} reviews )
            </Text>
            <Text
              style={{
                paddingVertical: 2,
                color: "#36454f",
              }}
            >
              <MaterialCommunityIcons
                name="currency-ngn"
                size={12}
                color="#36454f"
              />
              {item.price} &bull; {item.duration}
            </Text>
            <Text style={{ paddingVertical: 2, color: "#36454f" }}>
              <View
                style={{
                  flexDirection: "column",
                  width: "",
                  marginHorizontal: 8,
                  paddingVertical: 5,
                }}
              >
                <Text>Description:</Text>
                <View style={{}}></View>
              </View>
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            paddingLeft: 8,
            paddingVertical: 8,
            backgroundColor: "#fff",
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 18,
              marginVertical: 8,
            }}
          >
            Reviews
          </Text>
          <FlatList
            data={reviews}
            renderItem={({ item }) => (
              <>
                <View
                  style={{
                    flexDirection: "row",
                    marginVertical: 10,
                    marginHorizontal: 10,
                    alignItems: "center",
                  }}
                >
                  <View style={{ marginHorizontal: 10, paddingVertical: 10 }}>
                    <Image
                      style={{ height: 40, width: 40 }}
                      source={item.favicon}
                    />
                  </View>
                  <View style={{ marginHorizontal: 10, paddingVertical: 10 }}>
                    <Text>{item.name}</Text>
                    <Text>
                      <MaterialIcons
                        name="star-rate"
                        size={13}
                        color="#36454f"
                      />
                      {item.rating} ({item.reviews} reviews ){" "}
                    </Text>
                    <Text>{item.timestamp}</Text>
                    <Text>{item.description}</Text>
                  </View>
                  <View></View>
                </View>
              </>
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
      </ScrollView>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={{
            borderColor: "#ccc",
            borderRadius: 8,
            borderWidth: 1,
            paddingVertical: 9,
            paddingHorizontal: 10,
            marginHorizontal: 4,
          }}
        >
          <MaterialIcons name="favorite-outline" size={24} color="red" />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "#ccc",
            borderColor: "#ccc",
            borderRadius: 8,
            borderWidth: 1,
            paddingVertical: 12,
            paddingHorizontal: 10,
            width: 300,
          }}
        >
          <Text style={{ textAlign: "center", color: "#fff" }}>
            {" "}
            Book service{" "}
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
