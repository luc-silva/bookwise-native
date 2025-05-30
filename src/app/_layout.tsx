import { Slot, useRouter } from "expo-router";
import { ApplicationContext } from "@/src/context/Application";
import { useEffect } from "react";
import useApplication from "../hooks/useApplication";
import { HomeProvider } from "./home/context";
import { View } from "react-native";

export default function RootLayout() {
    const router = useRouter();
    const config = useApplication();

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (config.user) {
                router.replace("/home");
            } else {
                router.replace("/login");
            }
        }, 10);
        return () => clearTimeout(timeout);
    }, [config.user]);

    return (
        <ApplicationContext.Provider value={config}>
            <HomeProvider>
                <View style={{ flex: 1 }}>
                    <Slot />
                </View>
            </HomeProvider>
        </ApplicationContext.Provider>
    );
}
