export default function prepareData(data: IRegisterBookDetails, image: string) {
    const formData = new FormData();
    const imageName = image.split("/").pop() || "cover.jpg";

    const imageBlob = {
        uri: image,
        name: imageName,
        type: "image/jpeg",
    };
    formData.append("imageField", imageBlob as any);
    formData.append("bookDetails", JSON.stringify(data));

    return formData;
}
