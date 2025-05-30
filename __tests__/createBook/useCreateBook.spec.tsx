import useCreateBook from "@/src/app/createBook/hooks/useCreateBook";
import { renderHook } from "@testing-library/react-native";
import { act } from "react";

describe("useCreateBook", () => {
    it("Deve alterar titulo do livro corretamente", () => {
        const { result } = renderHook(() => useCreateBook());
        act(() => {
            result.current.handles.handleTitleChange({
                nativeEvent: { text: "Novo Título" }
            } as any);
        });
        expect(result.current.values.title).toBe("Novo Título");
    });

    it("Deve alterar autor corretamente", () => {
        const { result } = renderHook(() => useCreateBook());
        act(() => {
            result.current.handles.handleBookAuthorChange({
                nativeEvent: { text: "Autor" }
            } as any);
        });
        expect(result.current.values.bookAuthor).toBe("Autor");
    });

    it("Deve alterar descrição corretamente", () => {
        const { result } = renderHook(() => useCreateBook());
        act(() => {
            result.current.handles.handleDescriptionChange({
                nativeEvent: { text: "Descrição" }
            } as any);
        });
        expect(result.current.values.description).toBe("Descrição");
    });

    it("Deve alterar edição corretamente", () => {
        const { result } = renderHook(() => useCreateBook());
        act(() => {
            result.current.handles.handleEditionChange({
                nativeEvent: { text: "2" }
            } as any);
        });
        expect(result.current.values.edition).toBe("2");
    });

    it("Deve alterar tags corretamente", () => {
        const { result } = renderHook(() => useCreateBook());
        act(() => {
            result.current.handles.handleTagsChange({
                nativeEvent: { text: "tag1,tag2" }
            } as any);
        });
        expect(result.current.values.tags).toBe("tag1,tag2");
    });

    it("Deve alterar status corretamente", () => {
        const { result } = renderHook(() => useCreateBook());
        act(() => {
            result.current.handles.handleStatusChange("read");
        });
        expect(result.current.values.status).toBe("read");
    });

    it("Deve alterar páginas corretamente", () => {
        const { result } = renderHook(() => useCreateBook());
        act(() => {
            result.current.handles.handlePagesChange({
                nativeEvent: { text: "123" }
            } as any);
        });
        expect(result.current.values.pages).toBe(123);
    });

    it("Deve alterar data de lançamento corretamente", () => {
        const { result } = renderHook(() => useCreateBook());
        act(() => {
            result.current.handles.handleReleasedDateChange(new Date("2024-05-29T12:00:00.000Z"));
        });
        expect(result.current.values.releasedDate).toEqual(new Date("2024-05-29T12:00:00.000Z"));
    });

    it("Deve alterar url da loja corretamente", () => {
        const { result } = renderHook(() => useCreateBook());
        act(() => {
            result.current.handles.handleStoreUrlChange({
                nativeEvent: { text: "https://loja.com" }
            } as any);
        });
        expect(result.current.values.storeUrl).toBe("https://loja.com");
    });

    it("Deve alterar volume corretamente", () => {
        const { result } = renderHook(() => useCreateBook());
        act(() => {
            result.current.handles.handleVolumeChange({
                nativeEvent: { text: "5" }
            } as any);
        });
        expect(result.current.values.volume).toBe("5");
    });

    it("Deve alterar franquia corretamente", () => {
        const { result } = renderHook(() => useCreateBook());
        act(() => {
            result.current.handles.handleFranchiseChange({
                nativeEvent: { text: "Marvel" }
            } as any);
        });
        expect(result.current.values.franchise).toBe("Marvel");
    });

    it("Deve alterar cover corretamente", () => {
        const { result } = renderHook(() => useCreateBook());
        act(() => {
            result.current.handles.handleCoverChange("imagem_base64");
        });
        expect(result.current.values.cover).toBe("imagem_base64");
    });
});