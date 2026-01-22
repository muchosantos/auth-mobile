import FormInput from "@/components/FormInput";
import { supabase } from "@/lib/supabase";
import { AntDesign } from "@expo/vector-icons";
import { AuthError } from "@supabase/supabase-js";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, Alert, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Register = () => {
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const [error, setError] = useState<AuthError | null>(null);
  const [matchPassword, setMatchPassword] = useState<boolean | null>(null);

  const isDisabled = loading || !email || !password || !confirmPassword;

  const signUpWithEmail = async () => {
    setLoading(true);

    if (password !== confirmPassword) {
      console.log("Pass doesnt match");
      setMatchPassword(false);
      setLoading(false);
      return;
    }

    try {
      const {
        data: { session },
        error,
      } = await supabase.auth.signUp({
        email: email,
        password: password,
      });

      if (error) {
        setError(error);
        return; // prekida dalje izvršavanje ako postoji greška
      }

      router.replace("/(tabs)");

      if (!session) {
        Alert.alert("Please check your inbox for email verification!");
      }
    } catch (err) {
      console.log(err); // network ili neočekivana greška
    } finally {
      setLoading(false); // uvek isključuje loader
    }
  };

  return (
    <SafeAreaView
      style={{
        height: "100%",
        backgroundColor: "#121212",
        justifyContent:'center'
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
          Lets s get
        </Text>
        <Text
          style={{
            fontSize: 45,
            textAlign: "left",
            color: "#fff",
            fontWeight: "bold",
          }}
        >
          Started
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

        <FormInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          type="password"
        />

        <FormInput
          placeholder="Confrim password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          type="password"
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
          onPress={() => signUpWithEmail()}
        >
          {loading ? (
            <ActivityIndicator color="#fff" size={14} />
          ) : (
            <Text style={{ fontSize: 14, color: "#000" }}>Sign in</Text>
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
          onPress={() => router.push("/(auth)")}
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
  );
};

export default Register;
