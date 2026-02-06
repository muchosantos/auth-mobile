import { useSupabaseUser } from "@/hooks/useSupabaseUser";
import { Redirect, Stack } from "expo-router";

export default function AuthRoutesLayout() {
  const { user, loading } = useSupabaseUser();

  if (loading) {
    return null;
  }

  if (user) {
    return <Redirect href="/(home)/tabs" />;
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="register" options={{ headerShown: false }} />
      <Stack.Screen name="forgot-password" options={{ headerShown: false }} />
      <Stack.Screen name="verify-email" options={{ headerShown: false }} />
      <Stack.Screen name="login-password" options={{ headerShown: false }} />
      <Stack.Screen name="register-password" options={{ headerShown: false }} />
    </Stack>
  );
}

