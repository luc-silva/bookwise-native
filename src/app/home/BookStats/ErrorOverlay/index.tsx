import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View, Text } from "react-native";
import useStyle from "./styles";

export default function ErrorOverlay() {
    const styles = useStyle();
    return (
        <View style={styles.container}>
            <MaterialCommunityIcons
                name="alert-circle"
                size={32}
                color="#FF6B6B"
            />
            <Text
                style={{
                    color: "#FF6B6B",
                    marginTop: 8,
                    fontWeight: "bold",
                }}
            >
                Erro ao carregar status
            </Text>
        </View>
    );
}
