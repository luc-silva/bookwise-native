import { StyleSheet } from "react-native";

const REM = 16;

export default function useStyle() {
    return StyleSheet.create({
        container: {
            padding: 2 * REM,
            paddingBottom: 4 * REM,
            backgroundColor: "#f5f6fa",
        },
        title: {
            fontSize: 2 * REM,
            fontWeight: "bold",
            color: "#222",
            marginBottom: 2 * REM,
            textAlign: "center",
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
            marginBottom: REM,
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
    });
}