import FormInput from "@/components/FormInput";
import { supabase } from "@/lib/supabase";
import { showPredefinedAlert } from "@/store/alertSlice";
import { MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";

const LoginPassword = () => {
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const { email } = useLocalSearchParams();

  const signInWithEmail = async () => {
    if (password.trim() === "") {
      dispatch(showPredefinedAlert("ENTER_PASSWORD"));
      return;
    }

    setLoading(true);
    const mail = email.toString();

    const { error } = await supabase.auth.signInWithPassword({
      email: mail,
      password,
    });

    if (error) {
      dispatch(showPredefinedAlert("INCORRECT_PASSWORD"));
      setLoading(false);
      console.log(error)
      return;
    }

    router.replace("/(home)/tabs");
    setLoading(false);
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
          Enter your
        </Text>
        <Text
          style={{
            fontSize: 45,
            textAlign: "left",
            color: "#fff",
            fontWeight: "bold",
          }}
        >
          Password
        </Text>
      </View>

      <View
        style={{
          paddingHorizontal: 20,
          width: "100%",
          marginBottom: 30,
          gap: 20,
        }}
      >
        <FormInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          type="password"
        />
        <View>
          <Pressable onPress={() => router.push("/(auth)/forgot-password")}>
            <Text
              style={{
                color: "#ABABAB",
                textAlign: "center",
                fontWeight: "600",
              }}
            >
              Forgot password?
            </Text>
          </Pressable>
        </View>
      </View>

      <View style={{ paddingHorizontal: 20 }}>
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
          onPress={() => signInWithEmail()}
        >
          {loading ? (
            <ActivityIndicator color="black" size={17} />
          ) : (
            <Text style={{ fontSize: 14, color: "#000" }}>Sign in</Text>
          )}
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default LoginPassword;
