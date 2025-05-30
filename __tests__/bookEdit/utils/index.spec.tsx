import { getEditParams } from "@/src/app/bookEdit/utils";
import useCreateBook from "@/src/app/createBook/hooks/useCreateBook";
import { renderHook } from "@testing-library/react-native";
import { act } from "react";

describe("getEditParams", () => {
    it("Deve retornar um objeto corretamente", () => {
        const { result } = renderHook(useCreateBook);

        const parseResult = getEditParams(result.current);

        expect(parseResult).toBeInstanceOf(Object);
    });

    it("Deve retornar um objeto com os dados formatados", () => {
        const { result } = renderHook(useCreateBook);

        act(() => {
            result.current.setters.setBookAuthor("Teste");
            result.current.setters.setDescription("Teste 2");
            result.current.setters.setEdition("Teste 3");
            result.current.setters.setFranchise("Teste 4");
            result.current.setters.setPages(4);
            result.current.setters.setReleasedDate(
                new Date("2024-05-29T12:00:00.000Z")
            );
            result.current.setters.setStatus("read");
            result.current.setters.setStoreUrl("Teste 5");
            result.current.setters.setTags("Teste 6");
            result.current.setters.setTitle("Teste 7");
            result.current.setters.setVolume("Teste 8");
        });

        const parseResult = getEditParams(result.current);

        expect(parseResult.book_author).toBe("Teste");
        expect(parseResult.description).toBe("Teste 2");
        expect(parseResult.edition).toBe("Teste 3");
        expect(parseResult.franchise).toBe("Teste 4");
        expect(parseResult.pages).toBe(4);
        expect(parseResult.released_date).toEqual(
            new Date("2024-05-29T12:00:00.000Z")
        );
        expect(parseResult.status).toBe("read");
        expect(parseResult.store_url).toBe("Teste 5");
        expect(parseResult.tags).toBe("Teste 6");
        expect(parseResult.title).toBe("Teste 7");
        expect(parseResult.volume).toBe("Teste 8");
    });
});
