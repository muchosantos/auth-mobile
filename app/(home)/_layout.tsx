import { useSupabaseUser } from "@/hooks/useSupabaseUser";
import { Redirect, Stack } from "expo-router";

export default function HomeStackLayout() {
  const { user, loading } = useSupabaseUser();

  if (loading) {
    return null; // ili splash
  }

  if (!user) {
    return <Redirect href="/(auth)" />;
  }

  return (
    <Stack>
      <Stack.Screen name="tabs" options={{ headerShown: false }} />
      <Stack.Screen name="(_menu)" options={{ headerShown: false }} />
      <Stack.Screen
        name="menu"
        options={{
          headerShown: false,
          animation: "slide_from_right",
          presentation: "card",
        }}
      />
    </Stack>
  );
}

