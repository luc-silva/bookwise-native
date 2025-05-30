import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");
const REM = 16;

export default function useStyle() {
    return StyleSheet.create({
        list: {
            paddingHorizontal: REM,
            paddingTop: REM,
            paddingBottom: 2 * REM,
            backgroundColor: "#f5f6fa",
        },
        card: {
            flexDirection: "row",
            backgroundColor: "#fff",
            borderRadius: REM * 1.2,
            marginBottom: REM * 1.5,
            padding: REM,
            shadowColor: "#5568FE",
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.1,
            shadowRadius: 12,
            elevation: 4,
            alignItems: "center",
            minHeight: 120,
        },
        cover: {
            width: 80,
            height: 110,
            borderRadius: 12,
            marginRight: REM,
            backgroundColor: "#e3e7fa",
            borderWidth: 2,
            borderColor: "#5568FE22",
        },
        info: {
            flex: 1,
            justifyContent: "center",
        },
        title: {
            fontSize: REM + 4,
            fontWeight: "bold",
            color: "#222",
            marginBottom: 6,
        },
        tag: {
            alignSelf: "flex-start",
            backgroundColor: "#5568FE",
            color: "#fff",
            fontSize: REM - 2,
            fontWeight: "600",
            borderRadius: 8,
            paddingHorizontal: 10,
            paddingVertical: 2,
            marginBottom: 6,
            overflow: "hidden",
        },
        status: {
            alignSelf: "flex-start",
            fontSize: REM - 2,
            fontWeight: "bold",
            borderRadius: 8,
            paddingHorizontal: 10,
            paddingVertical: 2,
            marginBottom: 6,
            backgroundColor: "#e1e1e1",
            color: "#222",
            overflow: "hidden",
        },
        statusRead: {
            backgroundColor: "#27ae60",
            color: "#fff",
        },
        statusNotRead: {
            backgroundColor: "#e67e22",
            color: "#fff",
        },
        date: {
            fontSize: REM - 3,
            color: "#888",
            marginTop: 2,
        },
        statsContainer: {
            marginBottom: REM,
        },
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
