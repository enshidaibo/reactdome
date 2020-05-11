/**
 * 在vms中创建任务记录
 */
import { httpVmsProxy } from "@/services/resource";

const vmsTranscode = async (task_id, videouploadid, func_type) => {
    let res = await httpVmsProxy({
        method: "post",
        uri: "/vms/transcode/create",
        paramStr: JSON.stringify({
            task_id,
            videouploadid,
            framerate: 0,
            bitrate: 0,
            weight: 1,
            format: "sd",
            func_type
        })
    });
    if (res.success && res.body.state != false) {
        return {
            ...res.body,
            success: true
        };
    }
    return {
        success: false
    };
};

export default vmsTranscode;