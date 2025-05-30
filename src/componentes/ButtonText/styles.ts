import { Dimensions, StyleSheet } from "react-native";

const { height } = Dimensions.get("window");

export default function useStyle() {
    const REM = 16;
    return StyleSheet.create({
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
    });
}
