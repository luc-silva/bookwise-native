import { useEffect } from "react";
import { View, FlatList, ActivityIndicator } from "react-native";
import useStyle from "./styles";
import BookStats from "./BookStats";
import { SafeAreaView } from "react-native-safe-area-context";
import Footer from "./Footer";
import BookCard from "./BookCard";
import { useHomeContext } from "./context";
import { useApplicationContext } from "@/src/context/Application";
import LoadingOverlay from "@/src/components/LoadingOverlay";

export default function Home() {
    const styles = useStyle();
    const { loadUserBooks, isBooksLoading, userBooks } = useHomeContext();
    const { user } = useApplicationContext();

    useEffect(() => {
        loadUserBooks();
    }, []);

    if (isBooksLoading) return <LoadingOverlay />;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#f5f6fa" }}>
            <View style={styles.statsContainer}>
                <BookStats user={user} />
            </View>
            <FlatList
                data={userBooks}
                keyExtractor={(item) => item._id}
                contentContainerStyle={styles.list}
                renderItem={({ item }: { item: IBookId }) => (
                    <BookCard data={item} key={item._id} />
                )}
            />
            <Footer />
        </SafeAreaView>
    );
}
