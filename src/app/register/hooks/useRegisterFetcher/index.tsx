import useApi from "@/src/hooks/useApi";
import { routes } from "@/src/proxy/routes/index.routes";
import { useCallback, useState } from "react";



export default function useRegisterFetch(user: ILoginResponse | null) {
    const { basicApi } = useApi(user);

    const [isCreateUserLoading, setIsCreatingUserLoading] = useState(false);
    const [isCreateUserError, setIsCreatingUserError] = useState(false);
    const createUser = useCallback(
        async (data: IRegisterUserParams) => {
            return await basicApi.post(routes.user.paths.create, data);
        },
        [basicApi]
    );
    const loadCreateUser = useCallback(
        async (body: IRegisterUserParams) => {
            setIsCreatingUserError(false);
            setIsCreatingUserLoading(true);
            return await createUser(body)
                .catch(() => setIsCreatingUserError(true))
                .finally(() => setIsCreatingUserLoading(false));
        },
        [isCreateUserLoading, isCreateUserError, createUser]
    );

    return {
        isCreateUserLoading,
        isCreateUserError,
        createUser,
        loadCreateUser,
    };
}
