import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity, View, Text } from "react-native";
import useStyle from "./styles";
import { useRouter } from "expo-router";
import { useApplicationContext } from "@/src/context/Application";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Footer() {
    const styles = useStyle();
    const router = useRouter();
    const { logout } = useApplicationContext();
    const insets = useSafeAreaInsets();

    const handleRedirect = () => {
        router.push("/createBook");
    };

    return (
        <View style={[styles.footer, { paddingBottom: insets.bottom || 18 }]}>
            <TouchableOpacity
                style={styles.footerIconButton}
                onPress={handleRedirect}
                activeOpacity={0.7}
            >
                <MaterialCommunityIcons
                    name="plus-circle-outline"
                    size={32}
                    color="#6366f1"
                />
                <Text style={styles.footerIconLabel}>Novo livro</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.footerIconButton}
                onPress={logout}
                activeOpacity={0.7}
            >
                <MaterialCommunityIcons
                    name="logout"
                    size={32}
                    color="#f43f5e"
                />
                <Text style={styles.footerIconLabel}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
}
