import useImageFetcher from "@/src/hooks/useImageFetcher";
import { TestComponent } from "@/__tests__/testUtils/TestComponent";
import { render } from "@testing-library/react-native";
import axios from "axios";
import { act } from "react";
import { calledUrls, setupAxiosGetMock } from "../testUtils/AxiosMock";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("useImageFetcher", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        setupAxiosGetMock();
    });

    it("Deve chamar URL correta para a busca de imagem", async () => {
        let hook = {} as ReturnType<typeof useImageFetcher>;

        render(
            <TestComponent
                callback={(innerHook: ReturnType<typeof useImageFetcher>) => {
                    hook = innerHook;
                }}
                hookFunctions={[
                    () => useImageFetcher({ id: "123", token: "1312" }),
                ]}
            />
        );

        await act(async () => {
            await hook.getImage("123");
        });
        expect(calledUrls[0]).toBe("http://localhost:6060/image/123");
    });

    it("Deve controlar o fluxo de chamada corretamente", async () => {
        let hook = {} as ReturnType<typeof useImageFetcher>;
        let resolvePromise: (value?: any) => void;
        const promise = new Promise((resolve) => {
            resolvePromise = resolve;
        });

        mockedAxios.post.mockReturnValueOnce(promise as any);

        render(
            <TestComponent
                callback={(innerHook: ReturnType<typeof useImageFetcher>) => {
                    hook = innerHook;
                }}
                hookFunctions={[
                    () => useImageFetcher({ id: "123", token: "1312" }),
                ]}
            />
        );

        act(() => {
            hook.loadImage("123");
        });
        expect(hook.isImageLoading).toBe(true);

        await act(async () => {
            resolvePromise({ data: [] });
            await promise;
        });
        expect(hook.isImageLoading).toBe(false);
    });
});
