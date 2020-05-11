/**
 * 为上传文件在vms中创建一条记录
 * @param {object} file 记录数据
 * @param {number} func_type 文件类型 默认音频 1视频
 */

import { httpVmsProxy } from "@/services/resource";

const vmsCreateRecord = async (file, func_type) => {
    let url = func_type == 1 ? "/vms/video/create" : "/vms/audio/create";
    let res = await httpVmsProxy({
        method: "post",
        uri: url,
        paramStr: JSON.stringify({
            ...file,
            audio: file.videoUrl,
            video: file.videoUrl,
            filesize: file.fileSize,
            folderid: 0,
            func_type
        })
    });
    if (res.success) {
        return {
            ...res.body,
            success: res.body.state,
            message: res.body.error
        };
    }
    return res;
};

export default vmsCreateRecord;
