import { StyleSheet } from "react-native";

export default function useStyle() {
    return StyleSheet.create({
        container: {
    flex: 1, // Adicione esta linha!
    padding: 24,
    alignItems: "center",
    backgroundColor: "#f5f6fa",
},
        cover: {
            width: 160,
            height: 220,
            borderRadius: 12,
            marginBottom: 16,
        },
        title: {
            fontSize: 22,
            fontWeight: "bold",
            color: "#222",
            marginBottom: 8,
            textAlign: "center",
        },
        author: {
            fontSize: 16,
            color: "#5568FE",
            marginBottom: 8,
        },
        description: {
            fontSize: 15,
            color: "#444",
            marginBottom: 12,
            textAlign: "center",
        },
        info: {
            fontSize: 14,
            color: "#888",
            marginBottom: 4,
        },
        actions: {
            flexDirection: "row",
            marginTop: 24,
            gap: 16,
        },
        button: {
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 8,
        },
        editButton: {
            backgroundColor: "#5568FE",
        },
        deleteButton: {
            backgroundColor: "#FF6B6B",
        },
        buttonText: {
            color: "#fff",
            fontWeight: "bold",
            marginLeft: 8,
        },
        centered: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
        },
    });
}