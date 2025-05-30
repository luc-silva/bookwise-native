import useApi from "@/src/hooks/useApi";
import { routes } from "@/src/proxy/routes/index.routes";
import axios, { AxiosResponse } from "axios";
import { useCallback, useState } from "react";

export default function useLoginFetch() {
    const [isLoginLoading, setIsLoginLoading] = useState(false);
    const [isLoginError, setIsLoginError] = useState(false);
    const { basicApi } = useApi(null);

    const submitLoginCredentials = useCallback(
        async (
            body: ILoginArguments
        ): Promise<AxiosResponse<ILoginResponse, any>> => {
            return await basicApi.post<ILoginResponse>(
                routes.user.paths.login,
                body
            );
        },
        [basicApi]
    );

    const loadSubmitLoginCredentials = useCallback(
        async (body: ILoginArguments): Promise<ILoginResponse> => {
            setIsLoginLoading(true);
            return await submitLoginCredentials(body)
                .then(({ data }) => {
                    return data;
                })
                .catch((error) => {
                    setIsLoginError(true);
                    console.log(error.message);
                    throw error;
                })
                .finally(() => {
                    setIsLoginLoading(false);
                });
        },
        [submitLoginCredentials, isLoginLoading]
    );

    return {
        isLoginLoading,
        setIsLoginLoading,
        submitLoginCredentials,
        loadSubmitLoginCredentials,
        isLoginError,
        setIsLoginError,
    };
}
