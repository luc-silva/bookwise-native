import { useApplicationContext } from "@/src/context/Application";
import { createContext, PropsWithChildren, useContext } from "react";
import useHomeFetcher from "../hooks/useHomeFetcher";

type IHomepageHooks = ReturnType<typeof useHomeFetcher>;

export const HomeContext = createContext({} as IHomepageHooks);

export const HomeProvider = ({ children }: PropsWithChildren) => {
    const { user } = useApplicationContext();
    const config = { ...useHomeFetcher(user) };
    return (
        <HomeContext.Provider value={config}>{children}</HomeContext.Provider>
    );
};

export const useHomeContext = () => useContext(HomeContext);
