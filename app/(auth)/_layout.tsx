import { Stack } from "expo-router";

export default function AuthRoutesLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      {/* za presentation, pogledacu kod ovog lika sto sam gledao za food app. */}
      <Stack.Screen name="register" options={{ headerShown: false }} />
      <Stack.Screen name="forgot-password" options={{ headerShown: false }} />
      <Stack.Screen name="verify-email" options={{ headerShown: false }} />
      <Stack.Screen name="create-new-password" options={{ headerShown: false }} />
      <Stack.Screen name="login-password" options={{ headerShown: false }} />
      <Stack.Screen name="register-password" options={{ headerShown: false }} />
    </Stack>
  );
}
