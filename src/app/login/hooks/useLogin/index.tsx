import { useState } from "react";
import { NativeSyntheticEvent, TextInputChangeEventData } from "react-native";

export default function useLogin() {
    const [email, setEmail] = useState<string>("");
    const handleEmailChange = (
        event: NativeSyntheticEvent<TextInputChangeEventData>
    ) => {
        const { text } = event.nativeEvent;
        setEmail(text);
    };

    const [password, setPassword] = useState<string>("");
    const handlePasswordChange = (
        event: NativeSyntheticEvent<TextInputChangeEventData>
    ) => {
        const { text } = event.nativeEvent;
        setPassword(text);
    };
    
    return {
        email,
        setEmail,
        handleEmailChange,
        password,
        setPassword,
        handlePasswordChange,
    };
}
