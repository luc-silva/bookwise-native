import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Alert,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import useBookFetcher from "@/src/hooks/useBookFetcher";
import { useEffect, useMemo, useState } from "react";
import useStyle from "./styles";
import { useApplicationContext } from "@/src/context/Application";
import useEdit from "./hook/useEdit";
import DateTimePicker from "@react-native-community/datetimepicker";
import LoadingOverlay from "@/src/components/LoadingOverlay";
import { getEditParams } from "./utils";

export default function BookEdit() {
    const styles = useStyle();
    const navigation = useNavigation();
    const route = useRoute();
    const { bookId } = route.params as { bookId: string };
    const { user } = useApplicationContext();

    const {
        bookDetails: book,
        loadBookDetails,
        isBookDetailsLoading,
        loadEditBook,
        isBookEditLoading,
    } = useBookFetcher(user);
    const { values, handles } = useEdit(book);

    const [showPicker, setShowPicker] = useState(false);

    useEffect(() => {
        loadBookDetails(bookId).catch((e) => {
            console.log(e);
        });
    }, [bookId]);

    const handleDatepick = (_: any, selectedDate: any) => {
        setShowPicker(false);
        if (selectedDate) handles.handleReleasedDateChange(selectedDate);
    };

    const handleSave = async () => {
        const data: IEditBookParams = getEditParams({ values });
        if (book) {
            loadEditBook(book?.bookDetails._id, data);
            Alert.alert("Sucesso", "Livro atualizado!");
            navigation.goBack();
        }
    };

    const isLoading = useMemo(() => {
        return isBookEditLoading || isBookDetailsLoading || !book;
    }, [isBookEditLoading, isBookDetailsLoading, book]);

    if (isLoading) return <LoadingOverlay />;

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.label}>Título</Text>
            <TextInput
                style={styles.input}
                value={values.title}
                onChange={handles.handleTitleChange}
            />
            <Text style={styles.label}>Autor</Text>
            <TextInput
                style={styles.input}
                value={values.bookAuthor}
                onChange={handles.handleBookAuthorChange}
            />
            <Text style={styles.label}>Descrição</Text>
            <TextInput
                style={styles.input}
                value={values.description}
                onChange={handles.handleDescriptionChange}
                multiline
            />
            <Text style={styles.label}>Edição</Text>
            <TextInput
                style={styles.input}
                value={values.edition}
                onChange={handles.handleEditionChange}
            />
            <Text style={styles.label}>Franquia</Text>
            <TextInput
                style={styles.input}
                value={values.franchise}
                onChange={handles.handleFranchiseChange}
            />
            <Text style={styles.label}>Páginas</Text>
            <TextInput
                style={styles.input}
                value={String(values.pages)}
                onChange={handles.handlePagesChange}
                keyboardType="numeric"
            />
            <Text style={styles.label}>Data de Lançamento</Text>
            <TouchableOpacity
                onPress={() => setShowPicker(true)}
                style={styles.input}
            >
                <Text>
                    {values.releasedDate instanceof Date
                        ? values.releasedDate.toISOString().slice(0, 10)
                        : String(values.releasedDate)}
                </Text>
            </TouchableOpacity>
            {showPicker && (
                <DateTimePicker
                    value={
                        values.releasedDate instanceof Date
                            ? values.releasedDate
                            : new Date(values.releasedDate)
                    }
                    mode="date"
                    display="default"
                    onChange={handleDatepick}
                />
            )}
            <Text style={styles.label}>Status</Text>
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "100%",
                    marginBottom: 16,
                }}
            >
                <TouchableOpacity
                    style={[
                        styles.button,
                        {
                            flex: 1,
                            marginRight: 6,
                            backgroundColor:
                                values.status === "read"
                                    ? "#5568FE"
                                    : "#e1e1e1",
                        },
                    ]}
                    onPress={() => handles.handleStatusChange("read")}
                >
                    <Text
                        style={[
                            styles.buttonText,
                            {
                                color:
                                    values.status === "read"
                                        ? "#fff"
                                        : "#5568FE",
                            },
                        ]}
                    >
                        Lido
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.button,
                        {
                            flex: 1,
                            marginHorizontal: 6,
                            backgroundColor:
                                values.status === "not-read"
                                    ? "#FFD166"
                                    : "#e1e1e1",
                        },
                    ]}
                    onPress={() => handles.handleStatusChange("not-read")}
                >
                    <Text
                        style={[
                            styles.buttonText,
                            {
                                color:
                                    values.status === "not-read"
                                        ? "#fff"
                                        : "#FFD166",
                            },
                        ]}
                    >
                        Não lido
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.button,
                        {
                            flex: 1,
                            marginLeft: 6,
                            backgroundColor:
                                values.status === "dropped"
                                    ? "#FF6B6B"
                                    : "#e1e1e1",
                        },
                    ]}
                    onPress={() => handles.handleStatusChange("dropped")}
                >
                    <Text
                        style={[
                            styles.buttonText,
                            {
                                color:
                                    values.status === "dropped"
                                        ? "#fff"
                                        : "#FF6B6B",
                            },
                        ]}
                    >
                        Dropado
                    </Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.label}>URL da Loja</Text>
            <TextInput
                style={styles.input}
                value={values.storeUrl}
                onChange={handles.handleStoreUrlChange}
            />
            <Text style={styles.label}>Tags</Text>
            <TextInput
                style={styles.input}
                value={values.tags}
                onChange={handles.handleTagsChange}
            />
            <Text style={styles.label}>Volume</Text>
            <TextInput
                style={styles.input}
                value={values.volume}
                onChange={handles.handleVolumeChange}
            />
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Salvar</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}
