import { Stack } from "expo-router";

export default function MenuStackLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="editProfile"
        options={{
          headerShown: false,
          animation: "slide_from_right",
          presentation: "card",
        }}
      />
    </Stack>
  );
}
