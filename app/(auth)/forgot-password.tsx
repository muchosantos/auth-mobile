import CustomAlert from "@/components/CustomModal";
import FormInput from "@/components/FormInput";
import { supabase } from "@/lib/supabase";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import * as Linking from "expo-linking";

const ForgotPassword = () => {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const [showAlert1, setShowAlert1] = useState<boolean>(false);
  const [showAlert2, setShowAlert2] = useState<boolean>(false);

  const redirectUrl = Linking.createURL("create-new-password");

  const handleForgotPassword = async () => {
    if (email.trim() === "") {
      setShowAlert1(true);
      return;
    }

    setLoading(true);

    await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: redirectUrl,
    });

    setLoading(false);
  };
  return (
    <SafeAreaView
      style={{
        height: "100%",
        backgroundColor: "#121212",
      }}
    >
      <CustomAlert
        visible={showAlert1}
        title="Enter your email"
        message="Enter your email address to recover your password."
        buttons={[
          {
            text: "Try again",
            onPress: () => setShowAlert1(false),
            backgroundColor: "#4285F4",
          },
        ]}
        layout="vertical"
      />

      <View style={{ paddingHorizontal: 20 }}>
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
