import { hideAlert } from "@/store/alertSlice";
import { RootState } from "@/store/store";
import React from "react";
import { Modal, Pressable, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";



const GlobalAlert: React.FC = () => {
  const dispatch = useDispatch();
  const { visible, title, message, buttons, layout } = useSelector(
    (state: RootState) => state.alert
  );

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
          <View>
            <Text style={{ color: "#fff", fontSize: 18, fontWeight: "600" }}>
              {title}
            </Text>
            <Text style={{ color: "#aaa", marginTop: 10 }}>{message}</Text>
          </View>

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
                onPress={() => {
                  dispatch(hideAlert());
                  btn.onPress();
                }}
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

export default GlobalAlert;