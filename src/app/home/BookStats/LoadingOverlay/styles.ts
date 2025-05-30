import { StyleSheet } from "react-native";
const REM = 16;

export default function useStyle() {
    return StyleSheet.create({
        container: {
            backgroundColor: "#fff",
            borderRadius: REM,
            padding: REM / 1.5,
            marginHorizontal: REM,
            marginBottom: REM,
            alignItems: "center",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.04,
            shadowRadius: 4,
            elevation: 1,
        },
    });
}
