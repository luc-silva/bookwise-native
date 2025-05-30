import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Alert,
    ScrollView,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import useBookFetcher from "@/src/hooks/useBookFetcher";
import { useEffect } from "react";
import moment from "moment";
import useStyle from "./styles";
import { fromByteArray } from "base64-js";
import { useRouter } from "expo-router";
import { useApplicationContext } from "@/src/context/Application";

export default function BookDetails() {
    const styles = useStyle();
    const navigation = useNavigation();
    const route = useRoute();
    const { bookId } = route.params as { bookId: string };
    const router = useRouter();
    const { user } = useApplicationContext();

    const {
        bookDetails: book,
        loadBookDetails,
        isBookDetailsLoading,
        deleteBook,
    } = useBookFetcher(user);

    useEffect(() => {
        loadBookDetails(bookId);
    }, [bookId]);

    const handleDelete = async () => {
        Alert.alert(
            "Excluir Livro",
            "Tem certeza que deseja excluir este livro?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Excluir",
                    style: "destructive",
                    onPress: async () => {
                        await deleteBook(bookId);
                        navigation.goBack();
                    },
                },
            ]
        );
    };

    if (isBookDetailsLoading || !book) {
        return (
            <View style={styles.centered}>
                <Text>Carregando...</Text>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Image
                source={{
                    uri: `data:image/jpeg;base64,${
                        book.image && book.image.buffer
                            ? fromByteArray(
                                  new Uint8Array(book.image.buffer.data)
                              )
                            : ""
                    }`,
                }}
                style={styles.cover}
                resizeMode="cover"
            />
            <Text style={styles.title}>{book.bookDetails.title}</Text>
            <Text style={styles.author}>
                Autor: {book.bookDetails.book_author}
            </Text>
            <Text style={styles.description}>
                {book.bookDetails.description}
            </Text>
            <Text style={styles.info}>
                Edição: {book.bookDetails.edition} | Páginas:{" "}
                {book.bookDetails.pages}
            </Text>
            <Text style={styles.info}>
                Lançamento:{" "}
                {moment(book.bookDetails.released_date).format("DD/MM/YYYY")}
            </Text>
            <Text style={styles.info}>Tags: {book.bookDetails.tags}</Text>
            <View style={styles.actions}>
                <TouchableOpacity
                    style={[styles.button, styles.editButton]}
                    onPress={() =>
                        router.push({
                            pathname: "/bookEdit",
                            params: { bookId },
                        })
                    }
                >
                    <MaterialCommunityIcons
                        name="pencil"
                        size={20}
                        color="#fff"
                    />
                    <Text style={styles.buttonText}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, styles.deleteButton]}
                    onPress={handleDelete}
                >
                    <MaterialCommunityIcons
                        name="trash-can"
                        size={20}
                        color="#fff"
                    />
                    <Text style={styles.buttonText}>Excluir</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}
