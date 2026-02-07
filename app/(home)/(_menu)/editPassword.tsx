import { SettingsInput } from "@/components/SettingsInput";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    ActivityIndicator,
    Pressable,
    ScrollView,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const EditPassword = () => {
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  return (
    <SafeAreaView
      style={{
        paddingHorizontal: 20,
        backgroundColor: "#0a0a0a",
        height: "100%",
      }}
    >
      <View
        style={{
          borderColor: "#fff",
          flexDirection: "row",
          alignItems: "center",
          marginTop: 20,
          position: "relative",
        }}
      >
        <Pressable
          onPress={() => router.back()}
          style={{ position: "absolute", left: 0, zIndex: 1 }}
        >
          <AntDesign name="arrow-left" size={20} color={"#fff"} />
        </Pressable>
        <Text
          style={{
            flex: 1,
            textAlign: "center",

            color: "#fff",
          }}
        >
          Manage passwords
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginTop: 20 }}
      >
        <View style={{ borderColor: "#fff", marginVertical: 30, gap: 10 }}>
          <SettingsInput
            label="Current Password"
            value={currentPassword}
            onChangeText={setCurrentPassword}
            placeholder="Enter your current password"
            isPassword={true}
          />

          <SettingsInput
            label="New Password"
            value={newPassword}
            onChangeText={setNewPassword}
            placeholder="Enter new password"
            isPassword={true}
          />

          <SettingsInput
            label="Confirm new password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirm new password"
            isPassword={true}
          />
        </View>

        <View>
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
            onPress={() => console.log()}
          >
            {loading ? (
              <ActivityIndicator color="#fff" size={17} />
            ) : (
              <Text style={{ fontSize: 14, color: "#000" }}>Save</Text>
            )}
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditPassword;
