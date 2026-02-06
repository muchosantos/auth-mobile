import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const TopHeader = () => {
  const router = useRouter();

  return (
    <View
      style={{
        height: 300,
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
      }}
    >
      <View
        style={{
          backgroundColor: "#A3ABAA",
          width: "100%",
          height: "40%",
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "flex-end",
          padding: 20,
        }}
      >
        <Text style={{ fontSize: 20, color: "#fff", letterSpacing: -1 }}>
          Authentication.
        </Text>

        <TouchableOpacity onPress={() => router.push('/(home)/menu')}>
          <AntDesign name="menu" size={20} color={"white"} />
        </TouchableOpacity>
      </View>

      <View
        style={{
          backgroundColor: "#B5BABA",
          width: "100%",
          height: "60%",
          justifyContent: "center",
          padding: 20,
        }}
      >
        <Text style={{ fontSize: 30, color: "#1a1a1a", letterSpacing: -1 }}>
          Supabase
        </Text>
      </View>
    </View>
  );
};

export default TopHeader;
