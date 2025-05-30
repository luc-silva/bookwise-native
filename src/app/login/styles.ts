import { Dimensions, StyleSheet } from "react-native";

const { height } = Dimensions.get("window");

export default function useStyle() {
    const REM = 16;
    return StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: 2 * REM,
            backgroundColor: "#f5f6fa",
            height,
        },
        input: {
            width: "100%",
            padding: REM,
            marginBottom: REM,
            backgroundColor: "#fff",
            borderRadius: REM,
            borderWidth: 1,
            borderColor: "#e1e1e1",
            fontSize: REM,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.08,
            shadowRadius: 4,
            elevation: 2,
        },
        button: {
            width: "100%",
            height: 3 * REM,
            backgroundColor: "#5568FE",
            borderRadius: REM,
            justifyContent: "center",
            alignItems: "center",
            marginTop: REM,
            shadowColor: "#5568FE",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 8,
            elevation: 3,
        },
        buttonText: {
            color: "#fff",
            fontWeight: "bold",
            fontSize: REM + 2,
            letterSpacing: 1,
        },
        registerText: {
            marginTop: 2 * REM,
            color: "#5568FE",
            fontSize: REM,
            textDecorationLine: "underline",
            textAlign: "center",
        },
        title: {
            fontSize: 2 * REM,
            fontWeight: "bold",
            color: "#222",
            marginBottom: 2 * REM,
            textAlign: "center",
        },
    });
}