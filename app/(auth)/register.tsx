import CustomAlert from "@/components/CustomModal";
import FormInput from "@/components/FormInput";
import { supabase } from "@/lib/supabase";
import { AntDesign } from "@expo/vector-icons";

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

  const [showAlert1, setShowAlert1] = useState<boolean>(false);
  const [showAlert2, setShowAlert2] = useState<boolean>(false);
  const [showAlert3, setShowAlert3] = useState<boolean>(false);
  const [showAlert4, setShowAlert4] = useState<boolean>(false);
  const [showAlert5, setShowAlert5] = useState<boolean>(false);

  const signUpWithEmail = async () => {
    if (email.trim() === "") {
      setShowAlert1(true);
      return;
    }

    if (password.trim() === "") {
      setShowAlert2(true);
      return;
    }

    if (confirmPassword.trim() === "") {
      setShowAlert4(true);
      return;
    }

    if (password !== confirmPassword) {
      setShowAlert3(true);
      return;
    }

    setLoading(true);

    try {
      const {
        data: { session },
        error,
      } = await supabase.auth.signUp({
        email: email,
        password: password,
      });

      if (error) {
        setShowAlert5(true); // netacan pass ili email
        return; // prekida dalje izvršavanje ako postoji greška
      }

      router.replace("/(tabs)");

      // ovo je za later - deep linking.
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
        justifyContent: "center",
      }}
    >
      <CustomAlert
        visible={showAlert1}
        title="Enter your credentials"
        message="Enter your email address to create an account"
        buttons={[
          {
            text: "Try again",
            onPress: () => setShowAlert1(false),
            backgroundColor: "#4285F4",
          },
        ]}
        layout="vertical"
      />

      <CustomAlert
        visible={showAlert2}
        title="Enter your password"
        message="You didn't enter a password. Please enter your password."
        buttons={[
          {
            text: "Try again",
            onPress: () => {
              setShowAlert2(false);
            },
            backgroundColor: "#4285F4",
          },
        ]}
        layout="horizontal"
      />

      <CustomAlert
        visible={showAlert3}
        title="Passwords doesn't match"
        message="Your passwords doesn't match. Please try again."
        buttons={[
          {
            text: "Try again",
            onPress: () => {
              setShowAlert3(false);
            },
            backgroundColor: "#4285F4",
          },
        ]}
        layout="horizontal"
      />

      <CustomAlert
        visible={showAlert4}
        title="Please confirm your password"
        message="Enter the same password to confirm registration."
        buttons={[
          {
            text: "Try again",
            onPress: () => {
              setShowAlert4(false);
            },
            backgroundColor: "#4285F4",
          },
        ]}
        layout="horizontal"
      />

      <CustomAlert
        visible={showAlert5}
        title="User already exist!"
        message="User with this email already exist."
        buttons={[
          {
            text: "Ok",
            onPress: () => {
              setShowAlert5(false);
            },
            backgroundColor: "#4285F4",
          },
          {
            text: "Login to your account",
            onPress: () => {
              setShowAlert5(false);
              router.push("/(auth)");
            },
            backgroundColor: "#8D8D8D",
          },
        ]}
        layout="vertical"
      />

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
            <ActivityIndicator color="black" size={17} />
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
