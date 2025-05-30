import axios from "axios";

export const calledUrls: string[] = [];

export function setupAxiosGetMock(baseURL = "http://localhost:6060") {
    calledUrls.length = 0;

    const mockFn = jest.fn((url, body?: any) => {
        const fullUrl =
            baseURL.replace(/\/$/, "") + "/" + url.replace(/^\//, "");
        calledUrls.push(fullUrl);
        return Promise.resolve({ data: [] });
    });

    const mockInstance = { get: mockFn, post: mockFn, delete: mockFn, patch: mockFn, baseURL };
    jest.spyOn(axios, "create").mockReturnValue(mockInstance as any);
    return { mockFn, mockInstance };
}
