import { act, render } from "@testing-library/react-native";
import useApplication from "../../src/hooks/useApplication";
import useLoginFetch from "@/src/app/login/hooks/useLoginFetch";
import { TestComponent } from "@/__tests__/testUtils/TestComponent";
import axios from "axios";
import { setupAxiosGetMock } from "../testUtils/AxiosMock";

jest.mock("axios");
jest.mock("expo-router", () => ({
    useRouter: () => ({
        replace: jest.fn(),
        push: jest.fn(),
        back: jest.fn(),
    }),
}));
let mockFn: jest.Mock;

describe("useApplication hook", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        ({ mockFn } = setupAxiosGetMock("http://localhost:6060"));
    });

    it("Deve deslogar usuário corretamente", () => {
        let hook = {} as ReturnType<typeof useApplication>;
        render(
            <TestComponent
                callback={(h) => (hook = h)}
                hookFunctions={[useApplication]}
            />
        );

        act(() => {
            hook.logout();
        });

        expect(hook.user).toBe(null);
    });

    it("Deve definir usuário corretamente", async () => {
        let appHook = {} as ReturnType<typeof useApplication>;
        let loginFetchHook = {} as ReturnType<typeof useLoginFetch>;

        mockFn.mockResolvedValueOnce({ data: { token: "123" } });

        render(
            <TestComponent
                hookFunctions={[useLoginFetch, useApplication]}
                callback={(loginHook, applicationHook) => {
                    loginFetchHook = loginHook;
                    appHook = applicationHook;
                }}
            />
        );

        await act(async () => {
            await loginFetchHook
                .loadSubmitLoginCredentials({
                    email: "teste",
                    password: "123",
                })
                .then((data) => {
                    appHook.setUser(data);
                });
        });

        expect(appHook.user).toEqual({ token: "123" });
    });
});
