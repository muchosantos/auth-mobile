import { FormInput } from "@/components/FormInput";
import { supabase } from "@/lib/supabase";
import { AntDesign } from "@expo/vector-icons";
import { AuthError } from "@supabase/supabase-js";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";

const Register = () => {
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const [error, setError] = useState<AuthError | null>(null);

  const isDisabled = loading || !email || !password || !confirmPassword;

  console.log(error);

  const signUpWithEmail = async () => {
    setLoading(true);

    if (password !== confirmPassword) {
      console.log("Pass doesnt match");
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
    <View
      style={{
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 2,
      }}
    >
      <View style={{ marginBottom: 50 }}>
        <Text style={{ fontSize: 40, textAlign: "center" }}>
          Welcome to Register
        </Text>
        <Text style={{ fontSize: 10, textAlign: "center" }}>
          This is testing of Supabase SDK and Supabase Auth.
        </Text>
      </View>

      {/* email i password input */}
      <View style={{ paddingHorizontal: 20, width: "100%", marginBottom: 50 }}>
        <FormInput
          label="Email"
          placeholder="Enter email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <FormInput
          label="Password"
          placeholder="Enter password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          error={undefined}
        />

        <FormInput
          label="Confirm password"
          placeholder="Enter password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          error={undefined}
        />

        <Pressable
          style={{
            backgroundColor: "#d1d1d1",
            flexDirection: "row",
            gap: 10,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 20,
            paddingVertical: 18,
            marginTop: 20,
          }}
          onPress={() => signUpWithEmail()}
        >
          <Text>Register</Text>
        </Pressable>
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
            backgroundColor: "#4285F4",
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
            backgroundColor: "#0a1a1a",
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

      <Pressable onPress={() => router.back()}>
        <Text>
          Have an account?{" "}
          <Text style={{ color: "blue", fontWeight: "bold" }}>Login here</Text>
        </Text>
      </Pressable>
    </View>
  );
};

export default Register;
