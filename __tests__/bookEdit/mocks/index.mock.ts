export const bookMock: IBook = {
    _id: "123",
    book_author: "O Testador",
    book_collection: "Senhor dos Testes",
    description: "Teste testado teste",
    edition: "45",
    pages: 50,
    released_date: new Date("2024-05-29T12:00:00.000Z"),
    status: "read",
    store_url: "123",
    tags: "teste",
    title: "A Saga Do Teste",
    user: "123",
    franchise: "Saga do Teste",
    volume: "123",
};

export const imageMock: IImage = {
    _id: "213",
    book: "213",
    buffer: { data: [], type: "jpeg" },
    createdAt: new Date("2024-05-29T12:00:00.000Z"),
    updatedAt: new Date("2024-05-29T12:00:00.000Z"),
    user: "123",
};

export const bookDetailsMock: IBookDetails = {
    bookDetails: bookMock,
    image: imageMock,
};
