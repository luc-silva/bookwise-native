interface ILoginArguments {
    password: string;
    email: string;
}

interface ILoginResponse {
    token: string;
    id: string;
}

interface IUser {
    token: string;
    id: string;
}

type IBookId = { _id: string };

type IStatus = "read" | "not-read" | "dropped";

interface IBook {
    user: string;
    _id: string;
    book_collection: string;
    book_author: string;
    title: string;
    description: string;
    volume: string;
    pages: number;
    edition: string;
    released_date: Date;
    store_url: string;
    volume?: string;
    franchise?: string;
    tags: string;
    status: IStatus;
}

interface IImage {
    _id: string;
    book: string;
    user: string;
    buffer: {
        type: string;
        data: number[];
    };
    createdAt: Date;
    updatedAt: Date;
}

interface IBookDetails {
    bookDetails: IBook;
    image: IImage;
}

interface IUserStatus {
    read: number;
    not_read: number;
    dropped: number;
    total: number;
    total_read: number;
}

interface IRegisterUserParams {
    name: {
        first: string;
        last?: string;
    };
    password: string;
    email: string;
    username: string;
}

interface IRegisterBookDetails {
    book_collection: string;
    book_author: string;
    title: string;
    description: string;
    volume: string;
    pages: number;
    edition: string;
    released_date: Date;
    store_url: string;
    volume?: string;
    franchise?: string;
    tags: string;
    status: IStatus;
}

interface IRegisterBookParams {
    bookDetails: IRegisterBookDetails;
    imageField: File;
}

interface IEditBookParams {
    book_collection: string;
    book_author: string;
    title: string;
    description: string;
    volume: string;
    pages: number;
    edition: string;
    released_date: Date;
    store_url: string;
    volume?: string;
    franchise?: string;
    tags: string;
    status: IStatus;
}
