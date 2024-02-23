import { Tabs } from "expo-router/";
import {
  MaterialCommunityIcons,
  Ionicons,
  EvilIcons,
  Feather,
  Entypo,
  MaterialIcons,
  Octicons,
  AntDesign,
  FontAwesome,
} from "@expo/vector-icons";

export default function AppLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#fff", // Semi-transparent white
          borderTopColor: "#ccc",
          borderTopWidth: 4,
          shadowColor: "#000", // Add shadow for 3D effect
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        },

        tabBarActiveTintColor: "#FCA311",

        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 500,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarLabel: "Home",

          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "home-sharp" : "home-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="messenger"
        options={{
          tabBarLabel: "Messenger",
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name={focused ? "message-text" : "message-text-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="bookings"
        options={{
          tabBarLabel: "Bookings",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "file-tray-full" : "file-tray-full-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          headerTitle: "Account",
          tabBarLabel: "Account",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "person-sharp" : "person-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
