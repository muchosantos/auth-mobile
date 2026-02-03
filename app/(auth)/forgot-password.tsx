import FormInput from "@/components/FormInput";
import { supabase } from "@/lib/supabase";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { showAlert } from "@/store/alertSlice";
import { makeRedirectUri } from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import { useDispatch } from "react-redux";

WebBrowser.maybeCompleteAuthSession();
const redirectTo = makeRedirectUri();

const ForgotPassword = () => {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();
  const dispatch = useDispatch();

  const handleForgotPassword = async () => {
    if (email.trim() === "") {
      dispatch(
        showAlert({
          title: "Enter your email",
          message: "Enter your email address to recover your password.",
          buttons: [
            {
              text: "Try again",
              onPress: () => {},
              backgroundColor: "#4285F4",
            },
          ],
          layout: "vertical" as const,
        })
      );
      return;
    }


    setLoading(true);

    // pa provera da li postoji taj na bazi prvo
    await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${redirectTo}(auth)/create-new-password`,
    });
    setLoading(false);



    // check your email alert
    dispatch(
      showAlert({
        title: "Check your email",
        message: "We’ve sent you a password reset link. Open your email and follow the instructions to create a new password.",
        buttons: [
          {
            text: "Close",
            onPress: () => {},
            backgroundColor: "#4285F4",
          },
        ],
        layout: "vertical" as const,
      })
    );
  };
  return (
    <SafeAreaView
      style={{
        height: "100%",
        backgroundColor: "#121212",
      }}
    >
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
            <ActivityIndicator color="black" size={17} />
          ) : (
            <Text style={{ fontSize: 14, color: "#000" }}>Send</Text>
          )}
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default ForgotPassword;
