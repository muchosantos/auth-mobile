import { SettingsInput } from "@/components/SettingsInput";
import { SettingsTextArea } from "@/components/SettingsTextarea";
import { RootState } from "@/store/store";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

const EditProfile = () => {
  const router = useRouter();
  const { profile, loading, error } = useSelector(
    (state: RootState) => state.user
  );

  const [fullName, setFullName] = useState(profile?.full_name || "");
  const [email, setEmail] = useState(profile?.email || "");
  const [username, setUsername] = useState(profile?.username || "");
  const [description, setDescription] = useState("");

  // const handlePickImage = async () => {
  //   const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

  //   if (status !== 'granted') {
  //     alert('Potrebna je dozvola za pristup galeriji');
  //     return;
  //   }

  //   const result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //     allowsEditing: true,
  //     aspect: [1, 1],
  //     quality: 0.8,
  //   });

  //   if (!result.canceled) {
  //     // result.assets[0].uri - putanja do slike
  //     await uploadAvatar(result.assets[0].uri);
  //   }
  // };

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
          Edit Profile
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginTop: 20 }}
      >
        <View style={{ borderColor: "#fff", marginVertical: 30, gap: 10 }}>
          <SettingsInput
            label="Full Name"
            value={fullName}
            onChangeText={setFullName}
            placeholder="Enter your name and surname"
          />

          <SettingsInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
          />

          <SettingsInput
            label="Username"
            value={username}
            onChangeText={setUsername}
            placeholder="Enter your username"
          />

          <SettingsTextArea
            label="Profile Description"
            value={description}
            onChangeText={setDescription}
            placeholder="Describe your profile"
          />
        </View>

        <View style={{ alignItems: "center" }}>
          <Text style={{ color: "#fff" }}>Change your profile image</Text>
          <Pressable onPress={() => console.log("image")}>
            <View
              style={{
                width: 150,
                height: 150,
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
            <View
              style={{
                position: "absolute",
                bottom: 25,
                right: 5,
                backgroundColor: "#404040",
                borderRadius: 20,
                padding: 8,
                borderWidth: 2,
                borderColor: "#fff",
              }}
            >
              <AntDesign name="edit" size={20} color="#fff" />
            </View>
          </Pressable>
        </View>

        <View style={{ marginTop: 30 }}>
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

export default EditProfile;
