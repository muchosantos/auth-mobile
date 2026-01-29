import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import GlobalAlert from "@/components/GlobalAlert";
import { store } from "@/store/store";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { Provider } from "react-redux";
// export const unstable_settings = {
//   anchor: "(tabs)",
// };

export default function RootLayout() {
  

  return (
    <Provider store={store}>
      <KeyboardProvider>
        <Slot />
        <GlobalAlert />
        <StatusBar style="auto" />
      </KeyboardProvider>
    </Provider>
  );
}
