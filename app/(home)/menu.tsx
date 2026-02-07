import { SettingsButton } from "@/components/SettingsButton";
import { supabase } from "@/lib/supabase";
import { AppDispatch, RootState } from "@/store/store";
import { clearUser } from "@/store/userSlice";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";

const Menu = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const { profile, loading, error } = useSelector(
    (state: RootState) => state.user
  );

  const signOut = async () => {
    supabase.auth.signOut();
    dispatch(clearUser());
    router.replace("/(auth)");
  };

  return (
    // safe area pravi dole border, samo izbaci safearea ako neces. Pusti sad
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
          Settings
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginTop: 20 }}
      >
        {/* top */}
        <View style={{ borderColor: "#fff" }}>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* profile */}
            <View
              style={{
                width: 80,
                height: 80,
                borderRadius: 500,
                overflow: "hidden",
                marginVertical: 20,
              }}
            >
              <Image
                source={{ uri: profile?.avatar_url }}
                style={{ width: "100%", height: "100%" }}
              />
            </View>
            <Text
              style={{
                marginVertical: 10,
                fontSize: 26,
                fontWeight: "bold",
                color: "#fff",
              }}
            >
              {profile?.full_name}
            </Text>
            <Text>
              <Text style={{ fontSize: 12, color: "#a0a0a0" }}>
                {profile?.email}
              </Text>
            </Text>
          </View>
        </View>

        {/* Mid - boxes */}
        <View style={{ borderColor: "#fff", marginVertical: 30, gap: 5 }}>
          <SettingsButton
            icon="user"
            description="Change username, email, avatar"
            label="Edit Profile"
            onPress={() => router.push("/(home)/(_menu)/editProfile")}
          />
          <SettingsButton
            icon="lock"
            label="Password"
            description="Change your password"
            onPress={() => router.push("/(home)/(_menu)/editPassword")}
          />
          <SettingsButton
            icon="credit-card"
            label="Subscription"
            description="Manage your subcription plan"
            onPress={() => router.push("/(home)/(_menu)/editProfile")}
          />
        </View>

        <View style={{ borderColor: "#fff", marginVertical: 0, gap: 5 }}>
          <SettingsButton
            icon="bell"
            description="Manage notifications"
            label="Notifications"
            onPress={() => router.push("/(home)/(_menu)/editProfile")}
          />
          <SettingsButton
            icon="file-text"
            label="Privacy policy"
            description="Privacy and Data"
            onPress={() => router.push("/(home)/(_menu)/editProfile")}
          />
          <SettingsButton
            icon="file-protect"
            label="Terms of use"
            description="Terms and conditions"
            onPress={() => router.push("/(home)/(_menu)/editProfile")}
          />
        </View>

        <View style={{ borderColor: "#fff", marginTop: 30, gap: 5 }}>
          <SettingsButton
            icon="bulb"
            label="Change appearance"
            description="Chose light or dark appearance"
            onPress={() => signOut()}
          />
        </View>

        {/* bottom - boxes */}
        <View style={{ borderColor: "#fff", marginTop: 30, gap: 5 }}>
          <SettingsButton
            icon="poweroff"
            label="Logout"
            description="Logout from account"
            onPress={() => signOut()}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Menu;
