import { useState } from "react";
import {
    Text,
    TextInput,
    TouchableOpacity,
    View,
    ScrollView,
    Image,
    Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import useStyle from "./styles";
import useCreateBook from "./hooks/useCreateBook";
import useBookFetcher from "@/src/hooks/useBookFetcher";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useApplicationContext } from "@/src/context/Application";
import prepareData from "./utils";
import { useRouter } from "expo-router";

export default function BookRegister() {
    const styles = useStyle();
    const { handles, values } = useCreateBook();
    const { user } = useApplicationContext();
    const { loadCreateBook } = useBookFetcher(user);
    const router = useRouter();

    const [showPicker, setShowPicker] = useState(false);

    const pickImage = async () => {
        if (Platform.OS !== "web") {
            const { status } =
                await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== "granted") {
                alert("Permissão para acessar as imagens é necessária!");
                return;
            }
        }
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [3, 4],
            quality: 1,
        });

        if (!result.canceled && result.assets && result.assets.length > 0) {
            handles.handleCoverChange(result.assets[0].uri);
        }
    };
    const handleDatepick = (_: any, selectedDate: any) => {
        setShowPicker(false);
        if (selectedDate) handles.handleReleasedDateChange(selectedDate);
    };

    const handleRegister = () => {
        if (!values.cover) return;

        const data: IRegisterBookDetails = {
            book_author: values.bookAuthor,
            book_collection: "",
            description: values.description,
            edition: values.edition,
            pages: values.pages,
            released_date: values.releasedDate,
            store_url: values.storeUrl,
            title: values.title,
            franchise: values.franchise,
            volume: values.volume,
            status: values.status,
            tags: values.tags,
        };

        const formData = prepareData(data, values.cover);
        loadCreateBook(formData).then(() => {
            router.back();
        });
    };

    return (
        <ScrollView
            style={{ flex: 1, backgroundColor: "#f5f6fa" }}
            contentContainerStyle={styles.container}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
        >
            <Text style={styles.title}>Cadastrar Livro</Text>
            <TextInput
                value={values.bookAuthor}
                onChange={handles.handleBookAuthorChange}
                style={styles.input}
                placeholder="Autor"
                placeholderTextColor="#aaa"
            />
            <TextInput
                value={values.title}
                onChange={handles.handleTitleChange}
                style={styles.input}
                placeholder="Título"
                placeholderTextColor="#aaa"
            />
            <TextInput
                value={values.description}
                onChange={handles.handleDescriptionChange}
                style={styles.input}
                placeholder="Descrição"
                placeholderTextColor="#aaa"
                multiline
            />
            <TextInput
                value={values.edition}
                onChange={handles.handleEditionChange}
                style={styles.input}
                placeholder="Edição"
                placeholderTextColor="#aaa"
            />
            <TextInput
                value={values.tags}
                onChange={handles.handleTagsChange}
                style={styles.input}
                placeholder="Tags (separadas por vírgula)"
                placeholderTextColor="#aaa"
            />
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
            <TextInput
                value={`${values.pages}`}
                onChange={handles.handlePagesChange}
                style={styles.input}
                placeholder="Páginas"
                placeholderTextColor="#aaa"
                keyboardType="numeric"
            />
            <TouchableOpacity
                onPress={() => setShowPicker(true)}
                style={styles.input}
            >
                <Text>{values.releasedDate.toISOString().slice(0, 10)}</Text>
            </TouchableOpacity>
            {showPicker && (
                <DateTimePicker
                    value={values.releasedDate}
                    mode="date"
                    display="default"
                    onChange={handleDatepick}
                />
            )}
            <TextInput
                value={values.storeUrl}
                onChange={handles.handleStoreUrlChange}
                style={styles.input}
                placeholder="URL da loja (opcional)"
                placeholderTextColor="#aaa"
            />
            <TextInput
                value={values.volume}
                onChange={handles.handleVolumeChange}
                style={styles.input}
                placeholder="Volume (opcional)"
                placeholderTextColor="#aaa"
            />
            <TextInput
                value={values.franchise}
                onChange={handles.handleFranchiseChange}
                style={styles.input}
                placeholder="Franquia (opcional)"
                placeholderTextColor="#aaa"
            />
            <TouchableOpacity
                onPress={pickImage}
                style={[
                    styles.button,
                    { flexDirection: "row", alignItems: "center" },
                ]}
            >
                <Text style={styles.buttonText}>
                    {values.cover ? "Alterar capa" : "Selecionar capa"}
                </Text>
            </TouchableOpacity>
            {values.cover && (
                <Image
                    source={{ uri: values.cover }}
                    style={{
                        width: 120,
                        height: 160,
                        borderRadius: 12,
                        marginTop: 16,
                        marginBottom: 8,
                    }}
                    resizeMode="cover"
                />
            )}
            <TouchableOpacity onPress={handleRegister} style={styles.button}>
                <Text style={styles.buttonText}>Cadastrar Livro</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}
