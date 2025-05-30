import useApi from "@/src/hooks/useApi";
import { routes } from "@/src/proxy/routes/index.routes";
import { useCallback, useState } from "react";

export default function useHomeFetcher(user: IUser | null) {
    const { securedApi } = useApi(user);

    const [isBooksLoading, setIsBooksLoading] = useState(false);
    const [isBooksError, setIsBooksError] = useState(false);
    const [userBooks, setUserBooks] = useState<IBookId[]>([]);
    const getUserBooks = useCallback(async () => {
        return await securedApi?.get<IBookId[]>(routes.user.paths.getUserBooks);
    }, [securedApi]);
    const loadUserBooks = useCallback(async () => {
        setIsBooksLoading(true);
        setIsBooksError(false);
        return await getUserBooks()
            .then(({ data }) => {
                setUserBooks(data);
            })
            .catch(() => {
                setIsBooksError(true);
            })
            .finally(() => {
                setIsBooksLoading(false);
            });
    }, [isBooksLoading, isBooksError, userBooks, getUserBooks]);

    const [isStatusLoading, setIsStatusLoading] = useState(false);
    const [isStatusError, setIsStatusError] = useState(false);
    const [userStatus, setUserStatus] = useState<IUserStatus | null>(null);
    const getUserStatus = useCallback(
        async (id: string) => {
            return await securedApi?.get<IUserStatus>(
                routes.user.paths.getUserStatus(id)
            );
        },
        [securedApi]
    );
    const loadUserStatus = useCallback(
        async (id: string) => {
            setIsStatusError(false);
            setIsStatusLoading(true);
            return await getUserStatus(id)
                .then(({ data }) => {
                    setUserStatus(data);
                })
                .catch(() => {
                    setIsStatusError(true);
                })
                .finally(() => {
                    setIsStatusLoading(false);
                });
        },
        [isStatusLoading, isStatusError, userStatus, getUserStatus]
    );

    return {
        getUserBooks,
        isBooksLoading,
        isBooksError,
        userBooks,
        loadUserBooks,
        getUserStatus,
        loadUserStatus,
        isStatusLoading,
        isStatusError,
        userStatus,
    };
}
