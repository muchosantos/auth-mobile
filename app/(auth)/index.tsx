import { FormInput } from "@/components/FormInput";
import { supabase } from "@/lib/supabase";
import { AntDesign } from "@expo/vector-icons";
import { AuthError } from "@supabase/supabase-js";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, Alert, Pressable, Text, View } from "react-native";

const TestAuth = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const [error, setError] = useState<AuthError | null>(null);


  // login
  const signInWithEmail = async () => {

    // prva provera je inputi
    if (email.trim() === '' || password.trim() === '') {
      Alert.alert("Enter email and password");
      return;
    }
    


    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) setError(error); // netacan pass ili email
      else router.replace("/(tabs)"); // ide samo ako nema greške
    } catch (err) {
      console.log("Network ili..", err); // network ili neočekivana greška
    } finally {
      setLoading(false);
    }
  };

  return (
    <View
      style={{
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View style={{ marginBottom: 50 }}>
        <Text style={{ fontSize: 40, textAlign: "center" }}>
          Welcome to Login
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

  

        <Pressable
          style={{
            backgroundColor: "#fff",
            flexDirection: "row",
            gap: 10,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 20,
            paddingVertical: 18,
            marginTop: 20,
          }}
          onPress={() => signInWithEmail()}
        >
          {loading ? (
            <ActivityIndicator color="#000" size={17} />
          ) : (
            <Text>Login</Text>
          )}
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

      <View style={{ paddingHorizontal: 20, width: "100%" }}>
        <Pressable
          onPress={() => router.push("/(auth)/register")}
          style={{
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 1,
            paddingVertical: 10,
            borderRadius: 20,
          }}
        >
          <Text>Create new account</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default TestAuth;
