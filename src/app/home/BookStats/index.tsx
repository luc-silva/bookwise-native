import { View, Text, ActivityIndicator } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import useStyle from "./styles";
import { useEffect } from "react";
import { useHomeContext } from "../context";
import ErrorOverlay from "./ErrorOverlay";
import LoadingOverlay from "./LoadingOverlay";

type BookStatsProps = {
    user: ILoginResponse | null;
};

export default function BookStats({ user }: BookStatsProps) {
    const styles = useStyle();

    const { isStatusError, isStatusLoading, userStatus, loadUserStatus } =
        useHomeContext();

    useEffect(() => {
        if (user) {
            loadUserStatus(user.id);
        }
    }, [user]);

    if (isStatusLoading) return <LoadingOverlay />;
    if (isStatusError || !user || !userStatus) return <ErrorOverlay />;

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <View style={styles.item}>
                    <MaterialCommunityIcons
                        name="book-check"
                        size={20}
                        color="#5568FE"
                    />
                    <Text style={styles.value}>{userStatus.read}</Text>
                    <Text style={styles.label}>Lidos</Text>
                </View>
                <View style={styles.item}>
                    <MaterialCommunityIcons
                        name="book-open-variant"
                        size={20}
                        color="#FFD166"
                    />
                    <Text style={styles.value}>{userStatus.not_read}</Text>
                    <Text style={styles.label}>Não lidos</Text>
                </View>
                <View style={styles.item}>
                    <MaterialCommunityIcons
                        name="book-remove"
                        size={20}
                        color="#FF6B6B"
                    />
                    <Text style={styles.value}>{userStatus.dropped}</Text>
                    <Text style={styles.label}>Dropados</Text>
                </View>
            </View>
            <View style={styles.progressBarBg}>
                <View
                    style={[
                        styles.progressBar,
                        { width: `${userStatus.total_read || 0}%` },
                    ]}
                />
            </View>
            <Text style={styles.percentText}>
                {userStatus.total_read.toFixed(2)}% lidos
            </Text>
        </View>
    );
}
