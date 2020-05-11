import { httpFilesUpload } from "@/services/resource";

const uploadFile = async (files, { type = "image", typeId, mark = false } = {}) => {
    let res = await httpFilesUpload({
        uploadFile: files,
        type,
        typeId: typeId || 0,
        mark
    });
    return res;
};

export default uploadFile;