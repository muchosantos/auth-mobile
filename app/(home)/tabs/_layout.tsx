import { FontAwesome5, Octicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function PlayerTabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: "Home",
          tabBarIcon: ({ focused, color }) => (
            <Octicons name="home-fill" size={24} color="black" />
          ),
        }}
      />
      {/* za presentation, pogledacu kod ovog lika sto sam gledao za food app. */}
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          title: "Profile",
          tabBarIcon: ({ focused, color }) => (
            <FontAwesome5 name="user-alt" size={24} color="black" />
          ),
        }}
      />
    </Tabs>
  );
}
