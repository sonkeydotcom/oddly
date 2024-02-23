import {
  Stack,
  Tabs,
  Link,
  router,
  useLocalSearchParams,
  useGlobalSearchParams,
  param,
  useRoute,
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

const Tasker = ({ totaltasks, desc }) => {
  const taskade = useLocalSearchParams();

  return (
    <>
      <View
        style={{
          flexDirection: "row",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontWeight: 600, fontSize: 16 }}>
          {taskade.displayName}
        </Text>
      </View>
      <View
        style={{
          paddingVertical: 10,

          flexDirection: "row",
        }}
      >
        <MaterialIcons name="event-available" size={16} color="black" />
        <Text style={{ marginHorizontal: 4, textTransform: "capitalize" }}>
          {taskade?.availalibity}
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
        }}
      >
        <AntDesign name="checkcircleo" size={16} color="black" />
        <Text style={{ marginHorizontal: 4 }}>
          {taskade?.completedTasks} Completed tasks
        </Text>
      </View>
      <View
        style={{
          borderBottomWidth: 1,
          paddingVertical: 10,
          borderBottomColor: "#ccc",
        }}
      >
        <Text>
          {" "}
          <MaterialCommunityIcons
            name="format-quote-open"
            size={24}
            color="black"
          />{" "}
          {taskade?.bio}
        </Text>
      </View>
      <View
        style={{
          borderBottomWidth: 1,
          paddingVertical: 10,
          borderBottomColor: "#ccc",
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 16, marginVertical: 8 }}>
          Photos
        </Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({});
export default Tasker;
