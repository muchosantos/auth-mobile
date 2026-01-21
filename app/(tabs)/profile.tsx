import React from "react";
import { Text, View } from "react-native";

const Profile = () => {
  return (
    <View
      style={{
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
      }}
    >
      <View style={{ marginBottom: 50 }}>
        <Text style={{ fontSize: 40, textAlign: "center" }}>
          Under maintanance.
        </Text>
        <Text style={{ fontSize: 10, textAlign: "center" }}>Comming soon</Text>
      </View>
    </View>
  );
};

export default Profile;
