/**
 * 保存记录到cms
 */
import { httpFilesSave } from "@/services/resource";

const vmsSaveCms = async (data, fileName, type, typeId) => {
    let res = await httpFilesSave({
        filePath: data.videoUrl,
        fileName,
        type,
        typeId,
        tid: data.tid,
        // tags: "",
        thumb: data.thumb,
        mediaTime: data.duration
    });

    return res;
};

export default vmsSaveCms;
