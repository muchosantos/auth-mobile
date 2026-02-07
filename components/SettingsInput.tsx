import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

interface SettingsInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  isPassword?: boolean;
}

export function SettingsInput({
  label,
  value,
  onChangeText,
  placeholder,
  isPassword = false,
}: SettingsInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <View
      style={{
        backgroundColor: "#404040",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: isFocused ? "#fff" : "#666",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <View style={{ flex: 1 }}>
        <Text style={{ color: "#999", fontSize: 12, marginBottom: 2 }}>
          {label}
        </Text>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#666"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={isPassword && !isPasswordVisible}
          style={{ color: "#fff", fontSize: 16 }}
        />
      </View>
      {isPassword && isFocused ? (
        <Pressable onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
          <AntDesign
            name={isPasswordVisible ? "eye" : "eye-invisible"}
            size={20}
            color="#fff"
          />
        </Pressable>
      ) : (
        value.length > 0 &&
        isFocused && (
          <Pressable onPress={() => onChangeText("")}>
            <AntDesign name="close" size={16} color="#fff" />
          </Pressable>
        )
      )}
    </View>
  );
}
