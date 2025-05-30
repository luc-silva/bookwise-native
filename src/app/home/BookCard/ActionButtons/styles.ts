import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");
const REM = 16;

export default function useStyle() {
    return StyleSheet.create({
        actions: {
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            marginLeft: 10,
            alignSelf: "stretch",
            gap: 8,
        },
        actionBtn: {
            padding: 6,
            borderRadius: 8,
        },
    });
}
