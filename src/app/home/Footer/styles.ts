import { StyleSheet } from "react-native";

export default function useStyle() {
    return StyleSheet.create({
        footer: {
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "flex-end",
            backgroundColor: "#f9fafb",
            paddingVertical: 10,
            paddingHorizontal: 18,
            borderTopWidth: 1,
            borderTopColor: "#e5e7eb",
            gap: 32,
        },
        footerIconButton: {
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 16,
        },
        footerIconLabel: {
            fontSize: 12,
            color: "#6b7280", // gray-500
            marginTop: 2,
            fontWeight: "500",
            letterSpacing: 0.2,
        },
    });
}
