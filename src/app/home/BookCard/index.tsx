import {
    View,
    Text,
    Image,
    ActivityIndicator,
    TouchableOpacity,
} from "react-native";
import useStyle from "./styles";
import moment from "moment";
import { useEffect, useMemo } from "react";
import useImageFetcher from "../../../hooks/useImageFetcher";
import { useApplicationContext } from "@/src/context/Application";
import useBookFetcher from "../../../hooks/useBookFetcher";
import { fromByteArray } from "base64-js";
import ActionButtons from "./ActionButtons";
import { useNavigation, useRouter } from "expo-router";

interface IProps {
    data: IBookId;
}

export default function BookCard({ data }: IProps) {
    const styles = useStyle();
    const { user } = useApplicationContext();
    const { getImage } = useImageFetcher(user);
    const {
        bookDetails: book,
        loadBookDetails,
        isBookDetailsLoading,
    } = useBookFetcher(user);
    const router = useRouter();

    useEffect(() => {
        loadBookDetails(data._id);
    }, [data]);

    useEffect(() => {
        if (book) {
            getImage(book.image._id);
        }
    }, [book]);

    const parsedImage = useMemo(() => {
        if (book) {
            return fromByteArray(new Uint8Array(book.image.buffer.data));
        }
        return ``;
    }, [book]);

    if (isBookDetailsLoading || !book) {
        return (
            <View style={[styles.card, styles.centered]}>
                <ActivityIndicator size="large" color="#5568FE" />
            </View>
        );
    }

    return (
        <View>
            <TouchableOpacity
                onPress={() =>
                    router.push({
                        pathname: "/bookDetails",
                        params: { bookId: data._id },
                    })
                }
                style={styles.card}
            >
                <Image
                    source={{ uri: `data:image/jpeg;base64,${parsedImage}` }}
                    style={styles.cover}
                    resizeMode="cover"
                />
                <View style={styles.info}>
                    <Text style={styles.title}>{book.bookDetails.title}</Text>
                    <Text style={styles.tag}>{book.bookDetails.tags}</Text>
                    <Text
                        style={[
                            styles.status,
                            book.bookDetails.status === "read"
                                ? styles.statusRead
                                : styles.statusNotRead,
                        ]}
                    >
                        {book.bookDetails.status === "read"
                            ? "Lido"
                            : "Não lido"}
                    </Text>
                    <Text style={styles.date}>
                        Lançamento:{" "}
                        {moment(book.bookDetails.released_date).format(
                            "DD/MM/YYYY"
                        )}
                    </Text>
                </View>
                <ActionButtons data={data} />
            </TouchableOpacity>
        </View>
    );
}
