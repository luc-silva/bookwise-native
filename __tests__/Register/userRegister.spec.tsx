import { render } from "@testing-library/react-native";
import { act } from "react";
import { TestComponent } from "../testUtils/TestComponent";
import useRegister from "@/src/app/register/hooks/useRegister";

describe("useRegister", () => {
    it("Deve alterar nome e sobrenome corretamente", () => {
        let useRegisterHook = {} as ReturnType<typeof useRegister>;
        render(
            <TestComponent
                callback={(hook) => {
                    useRegisterHook = hook;
                }}
                hookFunctions={[useRegister]}
            />
        );
        act(() => {
            useRegisterHook.handleFirstName({
                nativeEvent: { text: "teste" },
            } as any);
            useRegisterHook.handleLastName({
                nativeEvent: { text: "da silva" },
            } as any);
        });

        expect(useRegisterHook.firstName).toBe("teste");
        expect(useRegisterHook.lastName).toBe("da silva");
    });

    it("Deve alterar username corretamente", () => {
        let useRegisterHook = {} as ReturnType<typeof useRegister>;
        render(
            <TestComponent
                callback={(hook) => {
                    useRegisterHook = hook;
                }}
                hookFunctions={[useRegister]}
            />
        );
        act(() => {
            useRegisterHook.handleUsername({
                nativeEvent: { text: "teste" },
            } as any);
        });

        expect(useRegisterHook.username).toBe("teste");
    });

    it("Deve alterar email corretamente", () => {
        let useRegisterHook = {} as ReturnType<typeof useRegister>;
        render(
            <TestComponent
                callback={(hook) => {
                    useRegisterHook = hook;
                }}
                hookFunctions={[useRegister]}
            />
        );
        act(() => {
            useRegisterHook.handleEmail({
                nativeEvent: { text: "teste@teste.com" },
            } as any);
        });

        expect(useRegisterHook.email).toBe("teste@teste.com");
    });

    it("Deve alterar senha corretamente", () => {
        let useRegisterHook = {} as ReturnType<typeof useRegister>;
        render(
            <TestComponent
                callback={(hook) => {
                    useRegisterHook = hook;
                }}
                hookFunctions={[useRegister]}
            />
        );
        act(() => {
            useRegisterHook.handlePassword({
                nativeEvent: { text: "123" },
            } as any);
        });

        expect(useRegisterHook.password).toBe("123");
    });
});
