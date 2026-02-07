import { AntDesign } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

interface SettingsButtonProps {
  icon: keyof typeof AntDesign.glyphMap;
  label: string;
  description: string;
  onPress: () => void;
}

export function SettingsButton({
  icon,
  label,
  description,
  onPress,
}: SettingsButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        backgroundColor: "#404040",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 20,
      }}
    >
      <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
        <AntDesign name={icon} size={34} color={"#fff"} />
        <View style={{ gap: 2 }}>
          <Text style={{ color: "#fff", fontSize: 16 }}>{label}</Text>
          <Text style={{ fontSize: 12, color: "#d1d1d1", }}>{description}</Text>
        </View>
      </View>
      <AntDesign name="arrow-right" size={20} color={"#fff"} />
    </Pressable>
  );
}
