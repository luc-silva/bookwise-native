import useApplication from "@/src/hooks/useApplication";
import { createContext, PropsWithChildren, useContext } from "react";

export const ApplicationContext = createContext(
    {} as ReturnType<typeof useApplication>
);

export const ApplicationProvider = ({ children }: PropsWithChildren) => {
    const config = useApplication();
    return <ApplicationContext.Provider value={config} children={children} />;
};

export const useApplicationContext = () => useContext(ApplicationContext);
