import FormInput from "@/components/FormInput";
import { supabase } from "@/lib/supabase";
import { showAlert, showPredefinedAlert } from "@/store/alertSlice";
import { AntDesign } from "@expo/vector-icons";

import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";

const Register = () => {
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const dispatch = useDispatch();

  const checkIfEmailExist = async () => {
    if (email.trim() === "") {
      dispatch(
        showAlert({
          title: "Enter your credentials",
          message: "Enter your email address to create an account.",
          buttons: [
            {
              text: "OK",
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

    const { data, error } = await supabase
      .from("profiles")
      .select("email")
      .eq("email", email.trim().toLowerCase())
      .maybeSingle();

    setLoading(false);

    // DB error (network, RLS, query fail)
    if (error) {
      console.log(error);
      dispatch(showPredefinedAlert("SOMETHING_WENT_WRONG"));
      return;
    }

    // Email NE postoji
    if (data) {
      dispatch(showPredefinedAlert("ACCOUNT_EXIST"));
      return;
    }

    router.push({
      pathname: "/(auth)/register-password",
      params: { email },
    });
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{
        flex: 1,
        backgroundColor: "#121212",
        justifyContent: "center",
      }}
    >
      <SafeAreaView
        style={{
          height: "100%",
          backgroundColor: "#121212",
          justifyContent: "center",
        }}
      >
        {/* title */}
        <View style={{ marginBottom: 50, paddingHorizontal: 20 }}>
          <Text
            style={{
              fontSize: 45,
              textAlign: "left",
              color: "#fff",
              fontWeight: "bold",
            }}
          >
            Create New
          </Text>
          <Text
            style={{
              fontSize: 45,
              textAlign: "left",
              color: "#fff",
              fontWeight: "bold",
            }}
          >
            Account
          </Text>
        </View>

        {/* email i password input */}
        <View
          style={{
            paddingHorizontal: 20,
            width: "100%",
            marginBottom: 30,
            gap: 20,
          }}
        >
          <FormInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            type="email"
          />
        </View>

        {/* Signup Btn */}
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
            onPress={() => checkIfEmailExist()}
          >
            {loading ? (
              <ActivityIndicator color="black" size={17} />
            ) : (
              <Text style={{ fontSize: 14, color: "#000" }}>Create an account</Text>
            )}
          </Pressable>
        </View>

        {/* Or */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 30,
            paddingHorizontal: 20,
          }}
        >
          {/* Left line */}
          <View style={{ flex: 1, height: 1, backgroundColor: "#ABABAB" }} />

          {/* Text */}
          <Text
            style={{
              color: "#ABABAB",
              textAlign: "center",
              fontWeight: "600",
              marginHorizontal: 10, // prostor između linija i teksta
            }}
          >
            Or
          </Text>

          {/* Right line */}
          <View style={{ flex: 1, height: 1, backgroundColor: "#ABABAB" }} />
        </View>

        {/* oauth providers */}
        <View
          style={{
            paddingHorizontal: 20,
            width: "100%",
            gap: 10,
            marginBottom: 50,
          }}
        >
          <Pressable
            style={{
              backgroundColor: "#1A1A1A",
              flexDirection: "row",
              gap: 10,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 20,
              paddingVertical: 10,
            }}
          >
            <AntDesign name="google" color={"white"} size={30} />
            <Text style={{ color: "white" }}>Continue with Google</Text>
          </Pressable>

          <Pressable
            style={{
              backgroundColor: "#1A1A1A",
              flexDirection: "row",
              gap: 10,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 20,
              paddingVertical: 10,
            }}
          >
            <AntDesign name="apple" color={"white"} size={30} />
            <Text style={{ color: "#fff" }}>Continue with Apple</Text>
          </Pressable>
        </View>

        <View style={{ paddingHorizontal: 20, width: "100%" }}>
          <Pressable
            onPress={() => {
              router.push("/(auth)");
              // reset state
            }}
            style={{
              justifyContent: "center",
              alignItems: "center",
              paddingVertical: 10,
              borderRadius: 20,
            }}
          >
            <Text style={{ color: "#ABABAB" }}>
              Already have an account?{" "}
              <Text style={{ color: "#fff", fontWeight: "600" }}>Login</Text>
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};

export default Register;
