import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const EditProfile = () => {
  const router = useRouter();
  return (
    <SafeAreaView style={{ paddingHorizontal: 20 }}>
      <Pressable onPress={() => router.back()}>
        <AntDesign name="arrow-left" size={20} />
      </Pressable>
      <View style={{ marginVertical: 20 }}>
        <Text>EditProfile</Text>
      </View>
    </SafeAreaView>
  );
};

export default EditProfile;
