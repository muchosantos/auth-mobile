import { supabase } from "@/lib/supabase";
import { router, Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import "react-native-reanimated";

import GlobalAlert from "@/components/GlobalAlert";
import { store } from "@/store/store";
import { Provider } from "react-redux";

// export const unstable_settings = {
//   anchor: "(tabs)",
// };

export default function RootLayout() {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        router.replace("/(tabs)"); // ako je logged in, šalje direktno u tabs
      }
      setLoading(false); // završi loading, prikazuje Slot ako nije logovan
    };

    checkSession();
  }, []);

  // if (loading) return null; // ili neki Splash / ActivityIndicator

  return (
    <Provider store={store}>
      <Slot />
      <GlobalAlert /> 
      <StatusBar style="auto" />
    </Provider>
  );
}
