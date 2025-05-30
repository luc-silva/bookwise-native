export const routes = {
    user: {
        base: "user",
        paths: {
            create: "user/",
            login: "user/login",
            getUserStatus: (id: string): string => `user/${id}/status`,
            getUserBooks: "user/books",
        },
    },
    book: {
        base: "book",
        paths: {
            create: "book/",
            delete: (id: string) => `book/${id}`,
            update: (id: string) => `book/${id}`,
            getDetails: (id: string) => `book/${id}`
        },
    },
    image: {
        base: "image",
        paths: {
            update: (id: string): string => `image/${id}`,
            getImage: (id: string): string => `image/${id}`,
        },
    },
};
