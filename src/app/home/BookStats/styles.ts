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
        row: {
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            marginBottom: 6,
        },
        item: {
            alignItems: "center",
            flex: 1,
        },
        value: {
            fontSize: REM + 2,
            fontWeight: "bold",
            color: "#222",
            marginTop: 2,
        },
        label: {
            fontSize: REM - 3,
            color: "#888",
            marginTop: 0,
        },
        progressBarBg: {
            width: "100%",
            height: 6,
            backgroundColor: "#e1e6f0",
            borderRadius: 3,
            marginTop: 4,
            marginBottom: 2,
            overflow: "hidden",
        },
        progressBar: {
            height: "100%",
            backgroundColor: "#5568FE",
            borderRadius: 3,
        },
        percentText: {
            fontSize: REM - 3,
            color: "#5568FE",
            marginTop: 2,
        },
    });
}