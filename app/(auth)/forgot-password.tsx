import FormInput from "@/components/FormInput";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ForgotPassword = () => {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter()

  const handleForgotPassword = async () => {
    setLoading(true)

    router.push('/(auth)/verify-email')

    setLoading(false)
  }
  return (
    <SafeAreaView
      style={{
        height: "100%",
        backgroundColor: "#121212",
      }}
    >
      <View style={{paddingHorizontal:20}}>
        <Pressable onPress={() => router.back()}>
          <MaterialIcons name="arrow-back-ios" size={24} color="white" />
        </Pressable>
      </View>

      <View style={{ marginBottom: 50, paddingHorizontal: 20, marginTop: 50 }}>
        <Text
          style={{
            fontSize: 45,
            textAlign: "left",
            color: "#fff",
            fontWeight: "bold",
          }}
        >
          Forgot
        </Text>
        <Text
          style={{
            fontSize: 45,
            textAlign: "left",
            color: "#fff",
            fontWeight: "bold",
          }}
        >
          Password?
        </Text>
      </View>

      <View style={{ paddingHorizontal: 20 }}>
        <Text style={{ color: "#ABABAB", fontSize: 18, marginBottom: 30 }}>
          Enter your email adress
        </Text>

        <FormInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          type="email"
        />
      </View>

      <View style={{ paddingHorizontal: 20, marginTop: 30 }}>
        <Pressable
          style={{
            backgroundColor: "#fff",
            flexDirection: "row",
            gap: 10,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 20,
            paddingVertical: 12,
          }}
          onPress={() => handleForgotPassword()}
        >
          {loading ? (
            <ActivityIndicator color="#fff" size={14} />
          ) : (
            <Text style={{ fontSize: 14, color: "#000" }}>Send</Text>
          )}
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default ForgotPassword;
