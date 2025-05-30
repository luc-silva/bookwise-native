import useCreateBook from "../../createBook/hooks/useCreateBook";

export const getEditParams = ({
    values,
}: Pick<ReturnType<typeof useCreateBook>, "values">): IEditBookParams => {
    return {
        book_author: values.bookAuthor,
        book_collection: "",
        edition: values.edition,
        description: values.description,
        pages: values.pages,
        released_date: values.releasedDate,
        status: values.status,
        store_url: values.storeUrl,
        tags: values.tags,
        title: values.title,
        franchise: values.franchise,
        volume: values.volume,
    };
};
