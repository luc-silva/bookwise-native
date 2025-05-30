import { useCallback, useState } from "react";
import { NativeSyntheticEvent, TextInputChangeEventData } from "react-native";

export default function useCreateBook() {
    const [bookAuthor, setBookAuthor] = useState("");
    const handleBookAuthorChange = useCallback(
        (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
            const { text } = event.nativeEvent;
            setBookAuthor(text);
        },
        [bookAuthor]
    );

    const [title, setTitle] = useState("");
    const handleTitleChange = useCallback(
        (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
            const { text } = event.nativeEvent;
            setTitle(text);
        },
        [title]
    );

    const [description, setDescription] = useState("");
    const handleDescriptionChange = useCallback(
        (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
            const { text } = event.nativeEvent;
            setDescription(text);
        },
        [description]
    );

    const [edition, setEdition] = useState("");
    const handleEditionChange = useCallback(
        (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
            const { text } = event.nativeEvent;
            setEdition(text);
        },
        [edition]
    );

    const [tags, setTags] = useState("");
    const handleTagsChange = useCallback(
        (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
            const { text } = event.nativeEvent;
            setTags(text);
        },
        [tags]
    );

    const [status, setStatus] = useState<"read" | "not-read" | "dropped">(
        "not-read"
    );
    const handleStatusChange = useCallback(
        (value: "read" | "not-read" | "dropped") => {
            setStatus(value);
        },
        [status]
    );

    const [pages, setPages] = useState(0);
    const handlePagesChange = useCallback(
        (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
            const { text } = event.nativeEvent;
            setPages(Number(text));
        },
        [pages]
    );

    const [releasedDate, setReleasedDate] = useState(new Date());
    const handleReleasedDateChange = useCallback(
        (selectedDate?: Date) => {
            if (selectedDate) setReleasedDate(selectedDate);
        },
        [releasedDate]
    );

    const [storeUrl, setStoreUrl] = useState("");
    const handleStoreUrlChange = useCallback(
        (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
            const { text } = event.nativeEvent;
            setStoreUrl(text);
        },
        [storeUrl]
    );

    const [volume, setVolume] = useState("");
    const handleVolumeChange = useCallback(
        (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
            const { text } = event.nativeEvent;
            setVolume(text);
        },
        [volume]
    );

    const [franchise, setFranchise] = useState("");
    const handleFranchiseChange = useCallback(
        (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
            const { text } = event.nativeEvent;
            setFranchise(text);
        },
        [franchise]
    );

    const [cover, setCover] = useState<string | null>(null);
    const handleCoverChange = useCallback(
        (value: string) => {
            setCover(value);
        },
        [cover]
    );

    return {
        handles: {
            handleBookAuthorChange,
            handleCoverChange,
            handleDescriptionChange,
            handleEditionChange,
            handleFranchiseChange,
            handlePagesChange,
            handleReleasedDateChange,
            handleStatusChange,
            handleStoreUrlChange,
            handleTagsChange,
            handleTitleChange,
            handleVolumeChange,
        },
        values: {
            bookAuthor,
            title,
            description,
            edition,
            tags,
            status,
            pages,
            releasedDate,
            storeUrl,
            volume,
            franchise,
            cover,
        },
        setters: {
            setBookAuthor,
            setCover,
            setDescription,
            setEdition,
            setFranchise,
            setPages,
            setReleasedDate,
            setStatus,
            setStoreUrl,
            setTags,
            setTitle,
            setVolume,
        },
    };
}
