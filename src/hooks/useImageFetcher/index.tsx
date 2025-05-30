import useApi from "@/src/hooks/useApi";
import { routes } from "@/src/proxy/routes/index.routes";
import { useCallback, useState } from "react";

export default function useImageFetcher(user: IUser | null) {
    const { securedApi } = useApi(user);

    const [isImageLoading, setIsImageLoading] = useState(false);
    const [isImageError, setIsImageError] = useState(false);
    const getImage = useCallback(async (imageId: string) => {
        console.log({ imageId });
        return await securedApi.get(routes.image.paths.getImage(imageId));
    }, []);

    const loadImage = useCallback(
        async (id: string) => {
            setIsImageLoading(true);
            setIsImageError(false);
            return await getImage(id)
                .then(({ data }) => {
                    return data;
                })
                .catch(() => {
                    setIsImageError(true);
                })
                .finally(() => {
                    setIsImageLoading(false);
                });
        },
        [isImageLoading, isImageError, getImage]
    );

    return { isImageLoading, isImageError, getImage, loadImage };
}
