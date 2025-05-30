type HookFunction<T> = () => T;

export const TestComponent = <T extends any[]>({
    callback,
    hookFunctions,
}: {
    callback: (...hooks: T) => void;
    hookFunctions: [...{ [K in keyof T]: HookFunction<T[K]> }];
}) => {
    const hooks = hookFunctions.map(fn => fn()) as T;
    callback(...hooks);
    return null;
};