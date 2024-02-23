import { Stack, Tabs } from "expo-router";
import store from "./store";
import { Provider } from "react-redux";

export default function Layout() {
  return (
    <>
      <Provider store={store}>
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
            }}
          />
          <Stack.Screen
            name="completed"
            options={{
              presentation: "modal",
              headerShadowVisible: false,
            }}
          />
          <Stack.Screen
            name="completedn"
            options={{
              presentation: "modal",
            }}
          />
          <Stack.Screen
            name="invoice"
            options={{
              presentation: "modal",
            }}
          />
          <Stack.Screen
            name="notification"
            options={{
              presentation: "modal",
            }}
          />
        </Stack>
      </Provider>
    </>
  );
}
