import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import useLogin from "./hooks/useLogin";
import useLoginFetch from "./hooks/useLoginFetch";
import useStyle from "./styles";
import ButtonText from "@/src/components/ButtonText";
import { useApplicationContext } from "@/src/context/Application";

export default function Login() {
    const { email, handleEmailChange, handlePasswordChange, password } =
        useLogin();
    const { loadSubmitLoginCredentials } = useLoginFetch();
    const { setupUser } = useApplicationContext();
    const styles = useStyle();
    const router = useRouter();

    const handlelogin = async () => {
        await loadSubmitLoginCredentials({ email, password })
            .then((data) => {
                setupUser(data);
            })
            .catch((e) => {
                console.log(e);
                throw e;
            });
    };

    const handleRegister = () => {
        router.push("/register");
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bem-vindo ao Bookwise</Text>
            <TextInput
                value={email}
                onChange={handleEmailChange}
                style={styles.input}
                placeholder="E-mail"
                placeholderTextColor="#aaa"
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                value={password}
                onChange={handlePasswordChange}
                style={styles.input}
                placeholder="Senha"
                placeholderTextColor="#aaa"
                secureTextEntry
            />
            <ButtonText
                onPress={handlelogin}
                style={styles.button}
                text="Entrar"
            />
            <TouchableOpacity onPress={handleRegister}>
                <Text style={styles.registerText}>
                    Não tem conta? Cadastre-se
                </Text>
            </TouchableOpacity>
        </View>
    );
}
