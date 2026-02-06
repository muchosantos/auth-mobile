import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Menu = () => {
  const router = useRouter();
  return (
    <SafeAreaView style={{ paddingHorizontal: 20 }}>
      <Pressable onPress={() => router.back()}>
        <AntDesign name="arrow-left" size={20} />
      </Pressable>

      <View style={{ marginTop: 20 }}>
        <Pressable
          style={{
            padding: 10,
            borderRadius: 10,
            backgroundColor: "#cecece",
          }}
          onPress={() => router.push("/(home)/(_menu)/editProfile")}
        >
          <Text style={{ fontSize: 16 }}>Edit Profile</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Menu;
