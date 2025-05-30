import useEdit from "@/src/app/bookEdit/hook/useEdit";
import { renderHook } from "@testing-library/react-native";
import { bookDetailsMock } from "./mocks/index.mock";

describe("useEdit", () => {
    it("Deve settar os campos corretamente caso há detalhes do livro", () => {
        const { result } = renderHook(() => useEdit(bookDetailsMock));

        expect(result.current.values.bookAuthor).toBe("O Testador");
        expect(result.current.values.description).toBe("Teste testado teste");
        expect(result.current.values.edition).toBe("45");
        expect(result.current.values.franchise).toBe("Saga do Teste");
        expect(result.current.values.pages).toBe(50);
        expect(result.current.values.releasedDate).toEqual(
            new Date("2024-05-29T12:00:00.000Z")
        );
        expect(result.current.values.status).toBe("read");
        expect(result.current.values.storeUrl).toBe("123");
        expect(result.current.values.tags).toBe("teste");
        expect(result.current.values.title).toBe("A Saga Do Teste");
        expect(result.current.values.volume).toBe("123");
    });
});
