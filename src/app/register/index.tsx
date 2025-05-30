import { Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import useStyle from "./styles";
import useRegister from "./hooks/useRegister";
import useRegisterFetch from "./hooks/useRegisterFetcher";

export default function Register() {
    const styles = useStyle();
    const router = useRouter();

    const {
        email,
        firstName,
        handleEmail,
        handleFirstName,
        handleLastName,
        handlePassword,
        handleUsername,
        lastName,
        password,
        username,
    } = useRegister();
    const { loadCreateUser, isCreateUserLoading } = useRegisterFetch(null);

    const handleRegister = async () => {
        const data: IRegisterUserParams = {
            email,
            name: { first: firstName, last: lastName },
            password,
            username,
        };
        await loadCreateUser(data).then(() => {
            handleGoToLogin();
        });
    };

    const handleGoToLogin = () => {
        router.replace("/login");
    };

    return (
        <ScrollView
            style={{ flex: 1, backgroundColor: "#f5f6fa" }}
            contentContainerStyle={{
                padding: 32,
                paddingBottom: 64,
            }}
            keyboardShouldPersistTaps="handled"
        >
            <Text style={styles.title}>Crie sua conta</Text>
            <TextInput
                value={firstName}
                onChange={handleFirstName}
                style={styles.input}
                placeholder="Nome"
                placeholderTextColor="#aaa"
                autoCapitalize="words"
            />
            <TextInput
                value={lastName}
                onChange={handleLastName}
                style={styles.input}
                placeholder="Sobrenome"
                placeholderTextColor="#aaa"
                autoCapitalize="words"
            />
            <TextInput
                value={username}
                onChange={handleUsername}
                style={styles.input}
                placeholder="Nome de usuário"
                placeholderTextColor="#aaa"
                autoCapitalize="none"
            />
            <TextInput
                value={email}
                onChange={handleEmail}
                style={styles.input}
                placeholder="E-mail"
                placeholderTextColor="#aaa"
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                value={password}
                onChange={handlePassword}
                style={styles.input}
                placeholder="Senha"
                placeholderTextColor="#aaa"
                secureTextEntry
            />
            <TouchableOpacity
                onPress={handleRegister}
                style={styles.button}
                disabled={isCreateUserLoading}
            >
                <Text style={styles.buttonText}>Cadastrar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleGoToLogin}>
                <Text style={styles.registerText}>Já tem conta? Entrar</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}
