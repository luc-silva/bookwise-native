import { useCallback, useState } from "react";

export default function useApplication() {
    const [user, setUser] = useState<ILoginResponse | null>(null);

    const setupUser = useCallback((userData: IUser) => {
        setUser(userData);
    }, []);

    const logout = useCallback(() => {
        setUser(null);
    }, []);

    return { user, setUser, logout, setupUser };
}
