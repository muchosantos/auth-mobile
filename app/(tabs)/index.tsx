import { supabase } from "@/lib/supabase";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";

const Home = () => {
  const router = useRouter()
  const signOut = async () => {
    supabase.auth.signOut()
    router.replace('/(auth)')
  }

  return (
    <View
      style={{
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal:20,
      }}
    >
      <View style={{ marginBottom: 50 }}>
        <Text style={{ fontSize: 40, textAlign: "center" }}>
          Welcome to Auth Test
        </Text>
        <Text style={{ fontSize: 10, textAlign: "center" }}>
          You are now authenticated.
        </Text>
      </View>

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
          width:'100%'
        }}
        onPress={() => signOut()}
      >
        <Text>Logout</Text>
      </Pressable>
    </View>
  );
};

export default Home;
