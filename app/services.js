import { Stack, Tabs, Link, router } from "expo-router";
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
  Pressable,
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

export default function services({ navigation }) {
  return (
    <>
      <View style={{ flex: 1 }}>
        <ScrollView>
          <StatusBar />
          <Image
            source={require("../assets/images/cleaning.png")}
            resizeMode="cover"
            style={{ height: 300, width: "auto" }}
          />

          <SafeAreaView
            style={{
              flex: 1,
              marginTop: -10,
            }}
          >
            <Stack.Screen
              options={{
                headerShadowVisible: false,
                boxShadow: false,
                headerTitle: "",

                headerTransparent: true,
                headerBackTitle: "Go back",
              }}
            />

            <View style={{}}>
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
                  Bathroom and Toilet cleaning
                </Text>
                <Text>
                  <MaterialIcons name="star-rate" size={16} color="black" /> 5.8
                  (115K Total services booked)
                </Text>
              </View>

              <View>
                <View style={styles.recommendedCard}>
                  <FlatList
                    data={offers}
                    renderItem={({ item }) => (
                      <View
                        style={{
                          flexDirection: "row",
                          marginVertical: 10,
                          borderBottomWidth: 1,
                          borderColor: "#ccc",

                          backgroundColor: "#fff",
                        }}
                      >
                        <View style={{ marginHorizontal: 8 }}>
                          <TouchableOpacity
                            onPress={() =>
                              router.push({
                                pathname: `modal`,
                                params: item,
                              })
                            }
                            style={{
                              marginVertical: 5,

                              backgroundColor: "#fff",
                              width: 250,
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
                              <MaterialIcons
                                name="star-rate"
                                size={13}
                                color="#36454f"
                              />
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
                            <Text
                              style={{ paddingVertical: 2, color: "#36454f" }}
                            >
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

                                {item.description.map((desc, index) => (
                                  <Text
                                    key={index}
                                    style={{ marginVertical: 5 }}
                                  >
                                    &bull; {desc}
                                  </Text>
                                ))}
                              </View>
                            </Text>
                          </TouchableOpacity>
                        </View>
                        <View>
                          <Image
                            source={item.image}
                            style={styles.recommendedImage}
                          />
                        </View>
                      </View>
                    )}
                    keyExtractor={(item) => item.id}
                  />
                  <View
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <TouchableOpacity
                      style={{
                        backgroundColor: "#ccc",
                        paddingHorizontal: 16,
                        borderRadius: 4,
                      }}
                    >
                      <Feather name="more-horizontal" size={24} color="white" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </SafeAreaView>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  recommendedImage: {
    height: 80,
    width: 80,
    borderRadius: 8,
  },

  recomendedCard: { marginHorizontal: 10 },
});
