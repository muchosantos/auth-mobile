import React from "react";
import { Modal, Pressable, Text, TextStyle, View, ViewStyle } from "react-native";

interface AlertButton {
  text: string;
  onPress: () => void;
  backgroundColor?: string;
  textColor?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

interface CustomAlertProps {
  visible: boolean;
  title: string;
  message: string;
  buttons?: AlertButton[];
  layout?: "vertical" | "horizontal"; // kako će dugmad biti raspoređena
}

const CustomAlert: React.FC<CustomAlertProps> = ({
  visible,
  title,
  message,
  buttons = [{ text: "OK", onPress: () => {} }],
  layout = "vertical",
}) => {
  return (
    <Modal transparent animationType="fade" visible={visible}>
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.8)",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: "85%",
            backgroundColor: "#1C1C1E",
            borderRadius: 30,
            padding: 20,
          }}
        >
          {/* Title & Message */}
          <View>
            <Text style={{ color: "#fff", fontSize: 18, fontWeight: "600" }}>
              {title}
            </Text>
            <Text style={{ color: "#aaa", marginTop: 10 }}>{message}</Text>
          </View>

          {/* Buttons */}
          <View
            style={{
              flexDirection: layout === "horizontal" ? "row" : "column",
              justifyContent: "space-between",
              marginTop: 20,
              gap: layout === "vertical" ? 8 : 12,
            }}
          >
            {buttons.map((btn, index) => (
              <Pressable
                key={index}
                onPress={btn.onPress}
                style={{
                  flex: layout === "horizontal" ? 1 : undefined,
                  backgroundColor: btn.backgroundColor ?? "#4285F4",
                  borderRadius: 25,
                  paddingVertical: 15,
                  alignItems: "center",
                  justifyContent: "center",
                  ...btn.style,
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: btn.textColor ?? "#fff",
                    textAlign: "center",
                    ...btn.textStyle,
                  }}
                >
                  {btn.text}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CustomAlert;
