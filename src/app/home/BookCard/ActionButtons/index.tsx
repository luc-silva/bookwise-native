import { View, TouchableOpacity } from "react-native";
import { useApplicationContext } from "@/src/context/Application";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import useBookFetcher from "../../../../hooks/useBookFetcher";
import useStyle from "./styles";
import { useRouter } from "expo-router";
import { useHomeContext } from "../../context";

interface IProps {
    data: IBookId;
}

export default function ActionButtons({ data }: IProps) {
    const styles = useStyle();
    const { user } = useApplicationContext();
    const { loadDeleteBook, isBookDeleteLoading } = useBookFetcher(user);
    const { loadUserBooks } = useHomeContext();

    const router = useRouter();

    const handleEdit = () => {
        router.push({ pathname: "/bookEdit", params: { bookId: data._id } });
    };

    const handleDelete = () => {
        loadDeleteBook(data._id).then(() => {
            loadUserBooks();
        });
    };

    const buttonsDisabled = isBookDeleteLoading;
    return (
        <View style={styles.actions}>
            <TouchableOpacity
                style={styles.actionBtn}
                onPress={handleEdit}
                accessibilityLabel="Editar livro"
                disabled={buttonsDisabled}
            >
                <MaterialCommunityIcons
                    name="pencil"
                    size={22}
                    color="#5568FE"
                />
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.actionBtn}
                onPress={handleDelete}
                accessibilityLabel="Excluir livro"
                disabled={buttonsDisabled}
            >
                <MaterialCommunityIcons
                    name="trash-can"
                    size={22}
                    color="#FF6B6B"
                />
            </TouchableOpacity>
        </View>
    );
}
