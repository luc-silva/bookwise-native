import axios from "axios";
import { useCallback, useMemo } from "react";
import Constants from "expo-constants";

export default function useApi(user: IUser | null) {
    const { apiUrl, apiPort } = Constants?.expoConfig?.extra ?? {};

    const basicApi = useMemo(() => {
        return axios.create({
            baseURL: `${apiUrl}:${apiPort}/api/v1/`,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }, [apiUrl, apiPort]);

    const securedApi = useMemo(() => {
        return axios.create({
            baseURL: `${apiUrl}:${apiPort}/api/v1/`,
            headers: {
                authorization: `Bearer ${user?.token}`,
            },
        });
    }, [user, apiUrl, apiPort]);

    const getBaseUrl = useCallback(() => {
        return `${apiUrl}:${apiPort}`;
    }, [apiUrl, apiPort]);

    return { basicApi, securedApi, getBaseUrl };
}
