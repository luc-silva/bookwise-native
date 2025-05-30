import { act, renderHook } from "@testing-library/react-native";
import useLogin from "@/src/app/login/hooks/useLogin";

describe("useLogin", () => {
    it("deve atualizar o email corretamente", () => {
        const { result } = renderHook(() => useLogin());
        act(() => {
            result.current.handleEmailChange({
                nativeEvent: { text: "test@email.com" },
            } as any);
        });
        expect(result.current.email).toBe("test@email.com");
    });

    it("deve atualizar a senha corretamente", () => {
        const { result } = renderHook(() => useLogin());
        act(() => {
            result.current.handlePasswordChange({
                nativeEvent: { text: "123456" },
            } as any);
        });
        expect(result.current.password).toBe("123456");
    });
});
