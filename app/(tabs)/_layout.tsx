import { Tabs } from "expo-router";

export default function TabsRoutesLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ headerShown: false }} />
      {/* za presentation, pogledacu kod ovog lika sto sam gledao za food app. */}
      <Tabs.Screen name="profile" options={{ headerShown: false }} />
    </Tabs>
  );
}
