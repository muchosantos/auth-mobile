import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";

import FormInput from "@/components/FormInput";
import { supabase } from "@/lib/supabase";
import { showPredefinedAlert } from "@/store/alertSlice";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

import {
  GoogleSignin,
  isErrorWithCode,
  isSuccessResponse,
  statusCodes,
} from "@react-native-google-signin/google-signin";

GoogleSignin.configure({
  webClientId:
    "724696297512-i9hs5vt88ncb2gkj258m0n0k84l2elm9.apps.googleusercontent.com",
  iosClientId:
    "724696297512-aiqaoioro0khah83mp4ssiji4kqh8oa1.apps.googleusercontent.com",
  
});

const TestAuth = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();

  const checkIfEmailExist = async () => {
    if (!email.trim()) {
      dispatch(showPredefinedAlert("ENTER_CREDENTIALS"));
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
    if (!data) {
      dispatch(showPredefinedAlert("INCORRECT_EMAIL"));
      return;
    }

    // Email postoji
    router.push({
      pathname: "/(auth)/login-password",
      params: { email: data.email },
    });
  };

  const handleGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();

      if (isSuccessResponse(response)) {
        // set state - supabase
        console.log(response);
      } else {
        // baci svoj alert
        console.log("canceled by user u - if else");
      }
    } catch (error) {
      console.log(error);

      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.IN_PROGRESS:
            // operation (eg. sign in) already in progress
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            // Android only, play services not available or outdated
            break;
          default:
          // some other error happened
        }
      } else {
        // an error that's not related to google sign in occurred
        console.log("server greska - nema veze sa google sign in");
      }
    }
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{
        flex: 1,
        backgroundColor: "#121212",
        justifyContent: "center",
      }}
    >
      {/* <TouchableWithoutFeedback> */}
      <SafeAreaView style={{}}>
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
            Hey,
          </Text>
          <Text
            style={{
              fontSize: 45,
              textAlign: "left",
              color: "#fff",
              fontWeight: "bold",
            }}
          >
            Welcome back
          </Text>
        </View>

        {/* email */}
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

        {/* Signin Btn */}
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
              <Text style={{ fontSize: 14, color: "#000" }}>Continue</Text>
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
            onPress={() => handleGoogleSignIn()}
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
            onPress={() => router.push("/(auth)/register")}
            style={{
              justifyContent: "center",
              alignItems: "center",
              paddingVertical: 10,
              borderRadius: 20,
            }}
          >
            <Text style={{ color: "#ABABAB" }}>
              Dont have an account?{" "}
              <Text style={{ color: "#fff", fontWeight: "600" }}>Sign up</Text>
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
      {/* </TouchableWithoutFeedback> */}
    </KeyboardAwareScrollView>
  );
};

export default TestAuth;
