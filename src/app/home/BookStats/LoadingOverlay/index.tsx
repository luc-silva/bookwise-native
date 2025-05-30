import { View, Text, ActivityIndicator } from "react-native";
import useStyle from "./styles";

export default function LoadingOverlay() {
    const styles = useStyle();
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#5568FE" />
            <Text style={{ color: "#5568FE", marginTop: 8 }}>
                Carregando status...
            </Text>
        </View>
    );
}
