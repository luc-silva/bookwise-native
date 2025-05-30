import { useCallback, useState } from "react";
import { NativeSyntheticEvent, TextInputChangeEventData } from "react-native";

interface UserData {
    name: {
        first: string;
        last?: string;
    };
    password: string;
    email: string;
    username: string;
}

export default function useRegister() {
    const [lastName, setLastName] = useState("");
    const handleLastName = useCallback(
        (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
            const { text } = event.nativeEvent;
            setLastName(text);
        },
        [lastName]
    );

    const [firstName, setFirstName] = useState("");
    const handleFirstName = useCallback(
        (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
            const { text } = event.nativeEvent;
            setFirstName(text);
        },
        [firstName]
    );

    const [username, setUsername] = useState("");
    const handleUsername = useCallback(
        (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
            const { text } = event.nativeEvent;
            setUsername(text);
        },
        [username]
    );

    const [email, setEmail] = useState("");
    const handleEmail = useCallback(
        (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
            const { text } = event.nativeEvent;
            setEmail(text);
        },
        [email]
    );

    const [password, setPassword] = useState("");
    const handlePassword = useCallback(
        (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
            const { text } = event.nativeEvent;
            setPassword(text);
        },
        [password]
    );
    return {
        lastName,
        handleLastName,
        firstName,
        handleFirstName,
        username,
        handleUsername,
        email,
        handleEmail,
        password,
        handlePassword,
    };
}
