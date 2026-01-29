import FormInput from "@/components/FormInput";
import { supabase } from "@/lib/supabase";
import { showPredefinedAlert } from "@/store/alertSlice";
import { MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";

// if (password.trim() === "") {
//   dispatch(showPredefinedAlert("ENTER_PASSWORD"));
//   return;
// }

// const hasUpperCase = /[A-Z]/.test(password);
// const hasNumber = /\d/.test(password);

// if (password.length < 6 || !hasUpperCase || !hasNumber) {
//   dispatch(showPredefinedAlert("WEAK_PASSWORD"));
//   return;
// }

// if (confirmPassword.trim() === "") {
//   dispatch(showPredefinedAlert("CONFIRM_PASSWORD"));
//   return;
// }

// if (password !== confirmPassword) {
//   dispatch(showPredefinedAlert("MATCH_PASSWORDS"));
//   return;
// }

const RegisterPassword = () => {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const { email } = useLocalSearchParams();

  const signUpWithEmail = async () => {
    if (!password.trim()) {
      dispatch(showPredefinedAlert("ENTER_PASSWORD"));
      return;
    }
  
    if (
      password.length < 6 ||
      !/[A-Z]/.test(password) ||
      !/\d/.test(password)
    ) {
      dispatch(showPredefinedAlert("WEAK_PASSWORD"));
      return;
    }
  
    if (!confirmPassword.trim()) {
      dispatch(showPredefinedAlert("CONFIRM_PASSWORD"));
      return;
    }
  
    if (password !== confirmPassword) {
      dispatch(showPredefinedAlert("MATCH_PASSWORDS"));
      return;
    }
  
    setLoading(true);
  
    const { error } = await supabase.auth.signUp({
      email: email.toString(),
      password,
    });
  
    setLoading(false);
  
    if (error) {
      dispatch(showPredefinedAlert("SOMETHING_WENT_WRONG"));
      console.log(error);
      return;
    }
  
    router.replace("/(tabs)");
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
          Create your
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

        <FormInput
          placeholder="Confrim password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          type="password"
        />
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
          onPress={() => signUpWithEmail()}
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

export default RegisterPassword;
