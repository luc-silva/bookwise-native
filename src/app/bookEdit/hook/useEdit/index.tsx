import useCreateBook from "@/src/app/createBook/hooks/useCreateBook";
import { useEffect, useMemo, useRef } from "react";

export default function useEdit(bookDetails: IBookDetails | null) {
    const bookHook = useCreateBook();
    const lastId = useRef<string | undefined>(undefined);

    useEffect(() => {
        const currentId = bookDetails?.bookDetails?._id;
        if (bookDetails && currentId && lastId.current !== currentId) {
            lastId.current = currentId;
            const book = bookDetails.bookDetails;
            bookHook.setters.setBookAuthor(book.book_author);
            bookHook.setters.setDescription(book.description);
            bookHook.setters.setEdition(book.edition);
            bookHook.setters.setFranchise(book.franchise || "");
            bookHook.setters.setPages(book.pages);
            bookHook.setters.setReleasedDate(book.released_date);
            bookHook.setters.setStatus(book.status);
            bookHook.setters.setStoreUrl(book.store_url);
            bookHook.setters.setTags(book.tags);
            bookHook.setters.setTitle(book.title);
            bookHook.setters.setVolume(book.volume);
        }
    }, [bookDetails]);

    return { ...bookHook };
}
