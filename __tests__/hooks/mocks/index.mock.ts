export const createBookDetailsMock: IRegisterBookDetails = {
    book_author: "teste",
    book_collection: "teste",
    description: "teste",
    edition: "teste",
    pages: 3,
    released_date: new Date("2024-05-29T12:00:00.000Z"),
    store_url: "teste",
    title: "teste",
    status: "dropped",
    tags: "ficção"
};

export const createBookMock: IRegisterBookParams = {
    bookDetails: createBookDetailsMock,
    imageField: new File([], "teste"),
};

export const createBookFormData = () => {
    const formData: FormData = new FormData();
    formData.append("bookDetails", JSON.stringify(createBookDetailsMock));
    formData.append("imageField", new File([], "teste"));

    return formData;
};

export const editBookDetailsMock: IEditBookParams = {
    
    book_author: "teste editado",
    book_collection: "teste editado",
    description: "teste editado",
    edition: "teste editado",
    pages: 3,
    released_date: new Date("2024-05-29T12:00:00.000Z"),
    store_url: "teste editado",
    title: "teste editado",
    status: "dropped",
    tags: "ficção editado"
};