import FormInput from "@/components/FormInput";
import { supabase } from "@/lib/supabase";
import { showPredefinedAlert } from "@/store/alertSlice";
import * as QueryParams from "expo-auth-session/build/QueryParams";
import * as Linking from "expo-linking";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";

const createSessionFromUrl = async (url: string) => {
  const { params, errorCode } = QueryParams.getQueryParams(url);
  if (errorCode) throw new Error(errorCode);
  const { access_token, refresh_token } = params;
  if (!access_token) return;
  const { data, error } = await supabase.auth.setSession({
    access_token,
    refresh_token,
  });
  if (error) throw error;
  return data.session;
};

const CreateNewPassword = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const url = Linking.getLinkingURL();
    if (url) {
      createSessionFromUrl(url);
    }
  }, []);

  const createNewPassword = async () => {
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

    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (!error) {
      dispatch(showPredefinedAlert("PASSWORD_CHANGED_SUCCESS"));
      return;
    }

    if (error) {
      dispatch(showPredefinedAlert("SOMETHING_WENT_WRONG"));
      return;
    }
    setLoading(false);
  };

  return (
    <SafeAreaView
      style={{
        height: "100%",
        backgroundColor: "#121212",
      }}
    >
      {/* <View style={{ paddingHorizontal: 20 }}>
        <Pressable onPress={() => router.back()}>
          <MaterialIcons name="arrow-back-ios" size={24} color="white" />
        </Pressable>
      </View> */}

      <View style={{ marginBottom: 50, paddingHorizontal: 20, marginTop: 50 }}>
        <Text
          style={{
            fontSize: 45,
            textAlign: "left",
            color: "#fff",
            fontWeight: "bold",
          }}
        >
          Create
        </Text>
        <Text
          style={{
            fontSize: 45,
            textAlign: "left",
            color: "#fff",
            fontWeight: "bold",
          }}
        >
          New Password
        </Text>
      </View>

      <View style={{ paddingHorizontal: 20 }}>
        <Text style={{ color: "#ABABAB", fontSize: 18, marginBottom: 30 }}>
          Your new password must be different from the previous one.
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
          onPress={() => createNewPassword()}
        >
          {loading ? (
            <ActivityIndicator color="#000" size={17} />
          ) : (
            <Text style={{ fontSize: 14, color: "#000" }}>Save</Text>
          )}
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default CreateNewPassword;
