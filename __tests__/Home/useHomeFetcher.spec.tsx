import useHomeFetcher from "@/src/app/home/hooks/useHomeFetcher";
import useApi from "@/src/hooks/useApi";
import { TestComponent } from "@/__tests__/testUtils/TestComponent";
import { render } from "@testing-library/react-native";
import axios from "axios";
import { act } from "react";
import { calledUrls, setupAxiosGetMock } from "../testUtils/AxiosMock";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("useHomeFetcher", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        setupAxiosGetMock();
    });

    it("Deve chamar URL correta para listagem de livros", async () => {
        let hook = {} as ReturnType<typeof useHomeFetcher>;

        render(
            <TestComponent
                callback={(innerHook: ReturnType<typeof useHomeFetcher>) => {
                    hook = innerHook;
                }}
                hookFunctions={[
                    () => useHomeFetcher({ id: "123", token: "1312" }),
                ]}
            />
        );

        await act(async () => {
            await hook.getUserBooks();
        });
        expect(calledUrls[0]).toBe("http://localhost:6060/user/books");
    });

    it("Deve controlar o fluxo de chamada corretamente", async () => {
        let hook = {} as ReturnType<typeof useHomeFetcher>;
        let resolvePromise: (value?: any) => void;
        const promise = new Promise((resolve) => {
            resolvePromise = resolve;
        });

        mockedAxios.post.mockReturnValueOnce(promise as any);

        render(
            <TestComponent
                callback={(innerHook: ReturnType<typeof useHomeFetcher>) => {
                    hook = innerHook;
                }}
                hookFunctions={[
                    () => useHomeFetcher({ id: "123", token: "1312" }),
                ]}
            />
        );

        act(() => {
            hook.loadUserBooks();
        });
        expect(hook.isBooksLoading).toBe(true);

        await act(async () => {
            resolvePromise({ data: [] });
            await promise;
        });
        expect(hook.isBooksLoading).toBe(false);
    });

    it("Deve chamar URL correta para status", async () => {
        let hook = {} as ReturnType<typeof useHomeFetcher>;

        render(
            <TestComponent
                callback={(innerHook: ReturnType<typeof useHomeFetcher>) => {
                    hook = innerHook;
                }}
                hookFunctions={[
                    () => useHomeFetcher({ id: "123", token: "1312" }),
                ]}
            />
        );

        await act(async () => {
            await hook.getUserStatus("123");
        });
        expect(calledUrls[0]).toBe("http://localhost:6060/user/123/status");
    });

    it("Deve controlar o fluxo de chamada corretamente", async () => {
        let hook = {} as ReturnType<typeof useHomeFetcher>;
        let resolvePromise: (value?: any) => void;
        const promise = new Promise((resolve) => {
            resolvePromise = resolve;
        });

        mockedAxios.post.mockReturnValueOnce(promise as any);

        render(
            <TestComponent
                callback={(innerHook: ReturnType<typeof useHomeFetcher>) => {
                    hook = innerHook;
                }}
                hookFunctions={[
                    () => useHomeFetcher({ id: "123", token: "1312" }),
                ]}
            />
        );

        act(() => {
            hook.loadUserStatus("123");
        });
        expect(hook.isStatusLoading).toBe(true);

        await act(async () => {
            resolvePromise({ data: [] });
            await promise;
        });
        expect(hook.isStatusLoading).toBe(false);
    });
});
