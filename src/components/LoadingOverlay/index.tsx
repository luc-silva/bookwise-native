import { ActivityIndicator, View } from "react-native";
import useStyle from "./styles";

export default function LoadingOverlay() {
    const styles = useStyle();
    return (
        <View style={styles.centered}>
            <ActivityIndicator size="large" color="#5568FE" />
        </View>
    );
}
