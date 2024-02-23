import { Stack, Tabs, Link, router, useGlobalSearchParams } from "expo-router";
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
  tasker,
} from "../constants/contants";

import { useFonts, Quicksand_400Regular } from "@expo-google-fonts/quicksand";
import { Raleway_400Regular } from "@expo-google-fonts/raleway";

const Reviews = ({ name, rating, avatar, reviews, totaltasks, desc }) => {
  const item = useGlobalSearchParams();
  return (
    <>
      <View
        style={{
          borderBottomWidth: 1,
          paddingVertical: 10,
          borderBottomColor: "#ccc",
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 17, marginVertical: 8 }}>
          Reviews & rating
        </Text>

        <View
          style={{
            flexDirection: "row",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <View>
            <Image
              source={avatar}
              style={{ height: 50, width: 50, borderRadius: 999 }}
            />
          </View>

          <View>
            <View
              style={{
                flexDirection: "row",
                flex: 1,
                justifyContent: "space-between",

                paddingHorizontal: 16,
              }}
            >
              <View>
                <Text>{name}</Text>
              </View>
              <View>
                <Text>
                  <MaterialIcons name="star-rate" size={15} color="black" />
                  {rating}
                </Text>
              </View>
            </View>

            <Text style={{ paddingHorizontal: 16 }}>
              Thursday, April 10, 2024
            </Text>
          </View>
        </View>
        <View>
          <Text>{item.id}</Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({});
export default Reviews;
