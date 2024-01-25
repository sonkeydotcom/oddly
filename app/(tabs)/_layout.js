import { Tabs } from "expo-router/";
import {
  MaterialCommunityIcons,
  Ionicons,
  EvilIcons,
  Feather,
  Entypo,
  MaterialIcons,
  FontAwesome,
} from "@expo/vector-icons";

export default function AppLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
        }}
      />

      <Tabs.Screen
        name="show"
        options={{
          tabBarIcon: () => (
            <MaterialIcons name="favorite-outline" size={24} color="black" />
          ),
        }}
      />
      <Tabs.Screen
        name="notification"
        options={{
          tabBarIcon: () => (
            <FontAwesome name="bell-o" size={23} color="black" />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: () => (
            <Ionicons name="ios-person-outline" size={24} color="black" />
          ),
        }}
      />
    </Tabs>
  );
}
