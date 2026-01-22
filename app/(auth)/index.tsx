import FormInput from "@/components/FormInput";
import { AntDesign } from "@expo/vector-icons";
import { AuthError } from "@supabase/supabase-js";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, Alert, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const TestAuth = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const [error, setError] = useState<AuthError | null>(null);

  // login
  const signInWithEmail = async () => {
    // prva provera je inputi
    if (email.trim() === "" || password.trim() === "") {
      Alert.alert("Enter email and password");
      return;
    }

    // setLoading(true);

    // try {
    //   const { error } = await supabase.auth.signInWithPassword({
    //     email: email,
    //     password: password,
    //   });

    //   if (error) setError(error); // netacan pass ili email
    //   else router.replace("/(tabs)"); // ide samo ako nema greške
    // } catch (err) {
    //   console.log("Network ili..", err); // network ili neočekivana greška
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
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

        <View>
          <Pressable onPress={() => router.push('/(auth)/forgot-password')}>
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
          onPress={() => signInWithEmail()}
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
  );
};

export default TestAuth;
