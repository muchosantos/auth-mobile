import { AntDesign } from "@expo/vector-icons";
import React, { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

type FormInputType = "email" | "password";

interface FormInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  type?: FormInputType;
}

const FormInput: React.FC<FormInputProps> = ({
  value,
  onChangeText,
  placeholder,
  type = "email",
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [secure, setSecure] = useState<boolean>(type === "password");

  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: isFocused ? "#ABABAB" : "#1A1A1A",
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 12,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#1A1A1A",
      }}
    >
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secure}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={{
          flex: 1,
          fontSize: 14,
          color:"#fff"
        }}
        placeholderTextColor="#ABABAB"
      />

      {/* ICONS — samo kad je fokus */}
      {isFocused && type === "email" && value.length > 0 && (
        <Pressable onPress={() => onChangeText("")}>
          <AntDesign name="close" size={16} color="#ABABAB" />
        </Pressable>
      )}

      {isFocused && type === "password" && (
        <Pressable onPress={() => setSecure((prev) => !prev)}>
          <Text style={{ fontSize: 18 }}>
            {secure ? (
              <AntDesign name="eye" size={16} color="#ABABAB" />
            ) : (
              <AntDesign name="eye-invisible" size={16} color="#ABABAB" />
            )}
          </Text>
        </Pressable>
      )}
    </View>
  );
};

export default FormInput;
