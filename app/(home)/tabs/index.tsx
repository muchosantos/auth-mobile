import TopHeader from "@/components/TopHeader";
import { supabase } from "@/lib/supabase";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


const Home = () => {
  const router = useRouter();
  const signOut = async () => {
    supabase.auth.signOut();
    router.replace("/(auth)");
  };


  return (
    <SafeAreaView
      style={{
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
      }}
    >
      <TopHeader />

      <Pressable
        style={{
          backgroundColor: "#fff",
          flexDirection: "row",
          borderWidth: 1,
          gap: 10,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 20,
          paddingVertical: 18,
          marginTop: 20,
          width: "100%",
        }}
        onPress={() => signOut()}
      >
        <Text>Logout</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default Home;
