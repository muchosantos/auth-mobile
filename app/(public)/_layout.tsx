import { Stack } from "expo-router";

export default function PublicStackLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="create-new-password"
        options={{ headerShown: false }}
      />
    </Stack>
  );
}
