import { Stack } from "expo-router";

export default function AuthRoutesLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      {/* za presentation, pogledacu kod ovog lika sto sam gledao za food app. */}
      <Stack.Screen
        name="register"
        options={{ headerShown: false}}
      />
    </Stack>
  );
}
