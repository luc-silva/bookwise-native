import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");
const REM = 16;

export default function useStyle() {
    return StyleSheet.create({
        centered: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#f5f6fa",
        },
    });
}
