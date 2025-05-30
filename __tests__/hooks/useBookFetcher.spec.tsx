import { TestComponent } from "@/__tests__/testUtils/TestComponent";
import { render, renderHook } from "@testing-library/react-native";
import axios from "axios";
import { act } from "react";
import { calledUrls, setupAxiosGetMock } from "../testUtils/AxiosMock";
import useBookFetcher from "@/src/hooks/useBookFetcher";
import { routes } from "@/src/proxy/routes/index.routes";
import { createBookFormData, editBookDetailsMock } from "./mocks/index.mock";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;
let mockFn: jest.Mock;

describe("useBookFetcher", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        ({ mockFn } = setupAxiosGetMock("http://localhost:6060"));
    });

    it("Deve chamar URL correta para detalhes de livro", async () => {
        let hook = {} as ReturnType<typeof useBookFetcher>;

        render(
            <TestComponent
                callback={(innerHook: ReturnType<typeof useBookFetcher>) => {
                    hook = innerHook;
                }}
                hookFunctions={[
                    () => useBookFetcher({ id: "123", token: "1312" }),
                ]}
            />
        );

        await act(async () => {
            await hook.getBookDetails("123");
        });
        expect(calledUrls[0]).toBe("http://localhost:6060/book/123");
    });

    it("Deve controlar o fluxo de chamada corretamente", async () => {
        let hook = {} as ReturnType<typeof useBookFetcher>;
        let resolvePromise: (value?: any) => void;
        const promise = new Promise((resolve) => {
            resolvePromise = resolve;
        });

        mockedAxios.get.mockReturnValueOnce(promise as any);

        render(
            <TestComponent
                callback={(innerHook: ReturnType<typeof useBookFetcher>) => {
                    hook = innerHook;
                }}
                hookFunctions={[
                    () => useBookFetcher({ id: "123", token: "1312" }),
                ]}
            />
        );

        act(() => {
            hook.loadBookDetails("123");
        });
        expect(hook.isBookDetailsLoading).toBe(true);

        await act(async () => {
            resolvePromise({ data: [] });
            await promise;
        });
        expect(hook.isBookDetailsLoading).toBe(false);
    });

    it("Deve chamar URL correta para deletar livro", async () => {
        let hook = {} as ReturnType<typeof useBookFetcher>;

        render(
            <TestComponent
                callback={(innerHook: ReturnType<typeof useBookFetcher>) => {
                    hook = innerHook;
                }}
                hookFunctions={[
                    () => useBookFetcher({ id: "123", token: "1312" }),
                ]}
            />
        );

        await act(async () => {
            await hook.deleteBook("123");
        });
        expect(calledUrls[0]).toBe("http://localhost:6060/book/123");
    });

    it("Deve controlar o fluxo de chamada corretamente", async () => {
        let hook = {} as ReturnType<typeof useBookFetcher>;
        let resolvePromise: (value?: any) => void;
        const promise = new Promise((resolve) => {
            resolvePromise = resolve;
        });

        mockedAxios.get.mockReturnValueOnce(promise as any);

        render(
            <TestComponent
                callback={(innerHook: ReturnType<typeof useBookFetcher>) => {
                    hook = innerHook;
                }}
                hookFunctions={[
                    () => useBookFetcher({ id: "123", token: "1312" }),
                ]}
            />
        );

        act(() => {
            hook.loadDeleteBook("123");
        });
        expect(hook.isBookDeleteLoading).toBe(true);

        await act(async () => {
            resolvePromise({ data: [] });
            await promise;
        });
        expect(hook.isBookDeleteLoading).toBe(false);
        expect(hook.isBookDeleteError).toBe(false);
    });

    it("Deve chamar axios.post ao submeter as credenciais", async () => {
        let useBookFetcherHook = {} as ReturnType<typeof useBookFetcher>;
        mockFn.mockResolvedValueOnce({ data: { token: "abc" } });

        render(
            <TestComponent
                callback={(hook) => (useBookFetcherHook = hook)}
                hookFunctions={[
                    () => useBookFetcher({ id: "123", token: "1312" }),
                ]}
            />
        );
        await act(async () => {
            await useBookFetcherHook.createBook(createBookFormData());
        });
        expect(mockFn).toHaveBeenCalledWith(
            routes.book.paths.create,
            createBookFormData(),
            { headers: { "Content-Type": "multipart/form-data" } }
        );
    });

    it("Deve controlar o loading corretamente", async () => {
        let hook = {} as ReturnType<typeof useBookFetcher>;
        let resolvePromise: (value?: any) => void;
        const promise = new Promise((resolve) => {
            resolvePromise = resolve;
        });
        mockFn.mockReturnValueOnce(promise as any);

        render(
            <TestComponent
                callback={(h) => (hook = h)}
                hookFunctions={[
                    () => useBookFetcher({ id: "123", token: "1312" }),
                ]}
            />
        );

        act(() => {
            hook.loadCreateBook(createBookFormData());
        });
        expect(hook.isBookCreateLoading).toBe(true);

        await act(async () => {
            resolvePromise({ data: { token: "abc" } });
            await promise;
        });
        expect(hook.isBookCreateLoading).toBe(false);
    });

    it("Deve chamar a URL e enviar os dados de update coretamente", async () => {
        mockFn.mockResolvedValueOnce({ data: { token: "abc" } });

        const { result } = renderHook(() =>
            useBookFetcher({ id: "123", token: "1312" })
        );
        await act(async () => {
            await result.current.editBook('123', editBookDetailsMock);
        });
        expect(mockFn).toHaveBeenCalledWith(
            routes.book.paths.update("123"),
            editBookDetailsMock,
        );
    });

    it("Deve controlar o fluxo de update corretamente", async () => {
        let resolvePromise: (value?: any) => void;
        const promise = new Promise((resolve) => {
            resolvePromise = resolve;
        });
        mockFn.mockReturnValueOnce(promise as any);

        const { result } = renderHook(() =>
            useBookFetcher({ id: "123", token: "1312" })
        );

        act(() => {
            result.current.loadEditBook("123", editBookDetailsMock);
        });
        expect(result.current.isBookEditLoading).toBe(true);

        await act(async () => {
            resolvePromise({ data: { token: "abc" } });
            await promise;
        });
        expect(result.current.isBookEditLoading).toBe(false);
    });
});
