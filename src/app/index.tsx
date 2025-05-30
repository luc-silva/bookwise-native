import { useEffect } from "react";
import { useRouter } from "expo-router";
import { useApplicationContext } from "@/src/context/Application";

export default function Index() {
    const router = useRouter();
    const { user } = useApplicationContext();

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (user) {
                router.replace("/home");
            } else {
                router.replace("/login");
            }
        }, 10);
        return () => clearTimeout(timeout);
    }, [user]);
    return null;
}
