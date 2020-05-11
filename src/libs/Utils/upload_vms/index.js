import vmsfetch from "./vmsfetch";
import vmsGetName from "./vmsGetName";
import vmsUpload from "./vmsUpload";
import vmsCreateRecord from "./vmsCreateRecord";
import vmsSaveCms from "./vmsSaveCms";
import vmsCocoTask from "./vmsCocoTask";
import vmsTranscode from "./vmsTranscode";

const vmsUploadFile = async (file, { func_type = 1, typeId, onProgress } = {}) => {
    let filename = await vmsGetName(file);
    if (!filename.success) {
        return filename;
    }
    let uploadres = await vmsUpload(file, filename.data, onProgress);
    if (!uploadres.success) {
        return uploadres;
    }
    let filetype = file.type.split("/")[1];
    let achieverateconfig = func_type == 1 ? {
        sdBitRate: 256,
        hdBitRate: 512,
        edBitRate: 1024
    } : {
        sdBitRate: 0,
        hdBitRate: 0,
        edBitRate: 0
    };
    let achieverate = await vmsfetch.post("v1/file_server/getachieverate", {
        ...achieverateconfig,
        filename: filename.data,
        filetype: filetype
    });
    if (!achieverate.success) {
        return achieverate;
    }
    let record = await vmsCreateRecord(uploadres.data, func_type);
    if (!record.success) {
        return record;
    }
    let coco_task = await vmsCocoTask(uploadres.data.videoUrl, func_type);
    let transcode = await vmsTranscode(coco_task.Id, record.data.id * 1, func_type);
    if (!transcode.success) {
        return transcode;
    }
    let res = await vmsSaveCms({ ...uploadres.data, tid: coco_task.Id }, file.name, func_type, typeId);
    if (!res.success) {
        return res;
    }
    return uploadres;
};
export default vmsUploadFile;