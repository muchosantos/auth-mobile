import TopHeader from "@/components/TopHeader";
import { useSupabaseUser } from "@/hooks/useSupabaseUser";
import { fetchUserProfile } from "@/store/userSlice";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "./../../../store/store";

const Home = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();


  const { user, loading } = useSupabaseUser();

  useEffect(() => {
    if (user) {
      dispatch(fetchUserProfile(user.id));
    }
  }, [user]);

  return (
    <SafeAreaView
      style={{
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
      }}
    >
      <TopHeader />

  
    </SafeAreaView>
  );
};

export default Home;
