import { StyleSheet } from "react-native";

export default function useStyle() {
    return StyleSheet.create({
        container: {
            padding: 24,
            backgroundColor: "#f5f6fa",
            flexGrow: 1,
        },
        label: {
            fontSize: 16,
            color: "#5568FE",
            fontWeight: "bold",
            marginBottom: 6,
            marginTop: 18,
        },
        input: {
            backgroundColor: "#fff",
            borderRadius: 8,
            padding: 12,
            fontSize: 16,
            borderWidth: 1,
            borderColor: "#e1e1e1",
            marginBottom: 8,
        },
        button: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: 12,
            borderRadius: 8,
        },
        buttonText: {
            fontWeight: "bold",
            fontSize: 15,
        },
        saveButton: {
            backgroundColor: "#5568FE",
            paddingVertical: 14,
            borderRadius: 8,
            alignItems: "center",
            marginTop: 32,
            marginBottom: 32,
        },
        saveButtonText: {
            color: "#fff",
            fontWeight: "bold",
            fontSize: 16,
        },
        centered: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
        },
    });
}