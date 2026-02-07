import { useState } from "react";
import { Text, TextInput, View } from "react-native";

interface SettingsTextAreaProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export function SettingsTextArea({
  label,
  value,
  onChangeText,
  placeholder,
}: SettingsTextAreaProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View
      style={{
        backgroundColor: "#404040",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: isFocused ? "#fff" : "#666",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#999", fontSize: 12, marginBottom: 4 }}>
          {label}
        </Text>
        {/* {value.length > 0 && (
          <Pressable onPress={() => onChangeText("")}>
            <AntDesign name="close" size={20} color="#fff" />
          </Pressable>
        )} */}
      </View>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#666"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        multiline
        numberOfLines={4}
        textAlignVertical="top"
        style={{ color: "#fff", fontSize: 16, minHeight: 80 }}
      />
    </View>
  );
}
