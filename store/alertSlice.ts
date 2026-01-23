import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TextStyle, ViewStyle } from "react-native";
import { AlertConfigKey, alertConfigs } from "./../helpers/alertConfigs";

interface AlertButton {
  text: string;
  onPress: () => void;
  backgroundColor?: string;
  textColor?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

interface AlertState {
  visible: boolean;
  title: string;
  message: string;
  buttons: AlertButton[];
  layout: "vertical" | "horizontal";
}

const initialState: AlertState = {
  visible: false,
  title: "",
  message: "",
  buttons: [],
  layout: "vertical",
};


const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    // kada nemam unapred pripremljen config
    showAlert: (
      state,
      action: PayloadAction<{
        title: string;
        message: string;
        buttons?: AlertButton[];
        layout?: "vertical" | "horizontal";
      }>
    ) => {
      state.visible = true;
      state.title = action.payload.title;
      state.message = action.payload.message;
      state.buttons = action.payload.buttons as any || [
        { text: "OK", onPress: () => {} },
      ];
      state.layout = action.payload.layout || "vertical";
    },
    // predefinasni
    showPredefinedAlert: (state, action: PayloadAction<AlertConfigKey>) => {
      const config = alertConfigs[action.payload];
      state.visible = true;
      state.title = config.title;
      state.message = config.message;
      state.buttons = config.buttons;
      state.layout = config.layout;
    },
    hideAlert: (state) => {
      state.visible = false;
    },
  },
});

export const { showAlert, showPredefinedAlert, hideAlert } = alertSlice.actions;
export default alertSlice.reducer;