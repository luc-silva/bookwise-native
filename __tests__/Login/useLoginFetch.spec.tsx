import axios from "axios";
import useLoginFetch from "../../src/app/login/hooks/useLoginFetch";
import { act, render } from "@testing-library/react-native";
import { calledUrls, setupAxiosGetMock } from "../testUtils/AxiosMock";
import { TestComponent } from "../testUtils/TestComponent";
import { routes } from "@/src/proxy/routes/index.routes";

jest.mock("axios");
let mockFn: jest.Mock;

beforeEach(() => {
    jest.clearAllMocks();
    ({ mockFn } = setupAxiosGetMock("http://localhost:6060"));
});

describe("useLoginFetch", () => {
    it("deve chamar axios.post ao submeter as credenciais", async () => {
        let hook = {} as ReturnType<typeof useLoginFetch>;
        mockFn.mockResolvedValueOnce({ data: { token: "abc" } });

        render(
            <TestComponent
                callback={(h) => (hook = h)}
                hookFunctions={[useLoginFetch]}
            />
        );
        await act(async () => {
            await hook.loadSubmitLoginCredentials({
                email: "a",
                password: "b",
            });
        });
        expect(mockFn).toHaveBeenCalledWith(routes.user.paths.login, {
            email: "a",
            password: "b",
        });
    });

    it("deve controlar o loading corretamente", async () => {
        let hook = {} as ReturnType<typeof useLoginFetch>;
        let resolvePromise: (value?: any) => void;
        const promise = new Promise((resolve) => {
            resolvePromise = resolve;
        });
        mockFn.mockReturnValueOnce(promise as any);

        render(
            <TestComponent
                callback={(h) => (hook = h)}
                hookFunctions={[useLoginFetch]}
            />
        );

        act(() => {
            hook.loadSubmitLoginCredentials({ email: "a", password: "b" });
        });
        expect(hook.isLoginLoading).toBe(true);

        await act(async () => {
            resolvePromise({ data: { token: "abc" } });
            await promise;
        });
        expect(hook.isLoginLoading).toBe(false);
    });

    it("deve setar isLoginError em caso de erro", async () => {
        let hook = {} as ReturnType<typeof useLoginFetch>;
        let error: { data: { error: string } } | undefined = undefined;

        mockFn.mockRejectedValueOnce({
            data: { error: "Usuário não encontrado" },
        });

        render(
            <TestComponent
                callback={(h) => (hook = h)}
                hookFunctions={[useLoginFetch]}
            />
        );
        await act(async () => {
            await hook
                .loadSubmitLoginCredentials({
                    email: "a",
                    password: "b",
                })
                .catch((e) => {
                    error = e;
                });
        });
        expect(hook.isLoginError).toBe(true);
    });

    it("deve enviar o body correto", async () => {
        let hook = {} as ReturnType<typeof useLoginFetch>;

        render(
            <TestComponent
                callback={(h) => (hook = h)}
                hookFunctions={[useLoginFetch]}
            />
        );
        await act(async () => {
            await hook.loadSubmitLoginCredentials({
                email: "a",
                password: "b",
            });
        });

        expect(mockFn).toHaveBeenCalledWith(routes.user.paths.login, {
            email: "a",
            password: "b",
        });
    });
});
