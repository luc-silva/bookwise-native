import axios from "axios";
import { act, render } from "@testing-library/react-native";
import { calledUrls, setupAxiosGetMock } from "../testUtils/AxiosMock";
import { TestComponent } from "../testUtils/TestComponent";
import { routes } from "@/src/proxy/routes/index.routes";
import useRegisterFetch from "@/src/app/register/hooks/useRegisterFetcher";

jest.mock("axios");
let mockFn: jest.Mock;

beforeEach(() => {
    jest.clearAllMocks();
    ({ mockFn } = setupAxiosGetMock("http://localhost:6060"));
});

describe("useRegisterFetch", () => {
    it("Deve submeter os dados corretamente", async () => {
        let useRegisterFetchHook = {} as ReturnType<typeof useRegisterFetch>;
        mockFn.mockResolvedValueOnce({ data: { token: "abc" } });

        render(
            <TestComponent
                callback={(hook) => (useRegisterFetchHook = hook)}
                hookFunctions={[
                    () => useRegisterFetch({ id: "123", token: "1312" }),
                ]}
            />
        );
        await act(async () => {
            await useRegisterFetchHook.createUser({
                name: {
                    first: "Teste",
                    last: "da Silva",
                },
                password: "123",
                email: "teste",
                username: "teste",
            });
        });
        expect(mockFn).toHaveBeenCalledWith(routes.user.paths.create, {
            name: {
                first: "Teste",
                last: "da Silva",
            },
            password: "123",
            email: "teste",
            username: "teste",
        });
    });

    it("deve controlar o loading corretamente", async () => {
        let useRegisterFetchHook = {} as ReturnType<typeof useRegisterFetch>;
        let resolvePromise: (value?: any) => void;
        const promise = new Promise((resolve) => {
            resolvePromise = resolve;
        });
        mockFn.mockReturnValueOnce(promise as any);

        render(
            <TestComponent
                callback={(hook) => (useRegisterFetchHook = hook)}
                hookFunctions={[
                    () => useRegisterFetch({ id: "123", token: "1312" }),
                ]}
            />
        );

        act(() => {
            useRegisterFetchHook.loadCreateUser({
                name: {
                    first: "Teste",
                    last: "da Silva",
                },
                password: "123",
                email: "teste",
                username: "teste",
            });
        });
        expect(useRegisterFetchHook.isCreateUserLoading).toBe(true);

        await act(async () => {
            resolvePromise({ data: { token: "abc" } });
            await promise;
        });
        expect(useRegisterFetchHook.isCreateUserLoading).toBe(false);
    });
});
