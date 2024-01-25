import { Stack, Tabs } from "expo-router";
export default function Layout() {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            // Hide the header for all other routes.
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="(tabs)"
          options={{
            // Hide the header for all other routes.
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="modal"
          options={{
            // Set the presentation mode to modal for our modal route.
            presentation: "modal",
            headerShadowVisible: false,
            boxShadow: false,
            headerTitle: "",

            headerTransparent: true,
            headerBackTitleVisible: false,
          }}
        />
      </Stack>
    </>
  );
}
