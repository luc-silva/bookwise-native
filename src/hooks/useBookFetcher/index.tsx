import useApi from "@/src/hooks/useApi";
import { routes } from "@/src/proxy/routes/index.routes";
import { useCallback, useState } from "react";

export default function useBookFetcher(user: IUser | null) {
    const { securedApi } = useApi(user);

    const [isBookDetailsLoading, setIsBookDetailsLoading] = useState(false);
    const [isBookDetailsError, setIsBookDetailsError] = useState(false);
    const [bookDetails, setBookDetails] = useState<IBookDetails | null>(null);
    const getBookDetails = useCallback(
        async (id: string) => {
            return await securedApi.get(routes.book.paths.getDetails(id));
        },
        [securedApi]
    );
    const loadBookDetails = useCallback(
        async (id: string) => {
            setIsBookDetailsLoading(true);
            setIsBookDetailsError(false);
            return await getBookDetails(id)
                .then(({ data }) => {
                    setBookDetails(data);
                })
                .catch((e) => {
                    setIsBookDetailsError(true);
                })
                .finally(() => {
                    setIsBookDetailsLoading(false);
                });
        },
        [isBookDetailsLoading, isBookDetailsError, bookDetails, getBookDetails]
    );

    const [isBookDeleteLoading, setIsBookDeleteLoading] = useState(false);
    const [isBookDeleteError, setIsBookDeleteError] = useState(false);
    const deleteBook = useCallback(
        async (id: string) => {
            return await securedApi.delete(routes.book.paths.delete(id));
        },
        [securedApi]
    );
    const loadDeleteBook = useCallback(
        async (id: string) => {
            setIsBookDeleteError(false);
            setIsBookDeleteLoading(true);
            return await deleteBook(id)
                .catch(() => {
                    setIsBookDeleteError(true);
                })
                .finally(() => setIsBookDeleteLoading(false));
        },
        [deleteBook, isBookDeleteLoading, isBookDeleteError]
    );

    const [isBookCreateLoading, setIsBookCreateLoading] = useState(false);
    const [isBookCreateError, setIsBookCreateError] = useState(false);
    const createBook = useCallback(
        async (data: FormData) => {
            return await securedApi.post(routes.book.paths.create, data, {
                headers: { "Content-Type": "multipart/form-data" },
            });
        },
        [securedApi]
    );
    const loadCreateBook = useCallback(
        async (data: FormData) => {
            setIsBookCreateLoading(true);
            setIsBookCreateError(false);
            return await createBook(data)
                .catch((e) => {
                    setIsBookCreateError(true);
                })
                .finally(() => setIsBookCreateLoading(false));
        },
        [createBook, isBookCreateLoading, isBookCreateError]
    );

    const [isBookEditLoading, setIsBookEditLoading] = useState(false);
    const [isBookEditError, setIsBookEditError] = useState(false);
    const editBook = useCallback(
        async (id: string, data: IEditBookParams) => {
            return await securedApi.patch(routes.book.paths.update(id), data);
        },
        [securedApi]
    );
    const loadEditBook = useCallback(
        async (id: string, data: IEditBookParams) => {
            setIsBookEditLoading(true);
            setIsBookEditError(false);
            return await editBook(id, data)
                .catch((e) => {
                    setIsBookEditError(true);
                })
                .finally(() => setIsBookEditLoading(false));
        },
        [editBook, isBookEditLoading, isBookEditError]
    );

    return {
        isBookDetailsLoading,
        isBookDetailsError,
        bookDetails,
        getBookDetails,
        loadBookDetails,
        deleteBook,
        isBookDeleteLoading,
        isBookDeleteError,
        loadDeleteBook,
        loadCreateBook,
        isBookCreateLoading,
        isBookCreateError,
        createBook,
        isBookEditLoading,
        isBookEditError,
        editBook,
        loadEditBook
    };
}
