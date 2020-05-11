import vmsfetch from "./vmsfetch";

const vmsCocoTask = async (video_url, funcType) => {
    let url = "/v1/coco_task";
    let callback_url = `https://yssjgateway.estv.com.cn/cms/v4/anonymous/vms/center/callBack.vms|http://vms.site.estv.com.cn/callback/index?site_id=10001`
    let Group = funcType == 1 ? "transv" : "transa";
    let Data = funcType == 1 ? {
        video_url: video_url,
        v_rate: 256,
        codex: "Main",
        fps: 25,
        height: 480,
        width: 720,
        speed: "medium",
        watermark_enable: false,
        format: "mp4",
        callback_url
    } : {
        audio_url: video_url,
        a_rate: 128,
        format: "mp3",
        callback_url
    };
    let res = await vmsfetch.post(url, {
        Data: JSON.stringify(Data),
        Category: "transcode",
        Group,
        Priority: 1,
        Type: "single"
    });
    return res;
};

export default vmsCocoTask;