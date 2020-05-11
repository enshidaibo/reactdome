import { message } from "antd";

const types = {
    // image: "image/gif,image/jpeg,image/jpg,image/png",
    image: "image/*",
    video: "video/*",
    audio: "audio/*"
};

const sourcefilter = (e, type, sitesConfig, uploadfiles) => {
    e.preventDefault();
    e.stopPropagation();
    let patt1 = new RegExp(types[type]);
    let files = e.target.files || e.dataTransfer.files;
    let maxMediaSize = sitesConfig.maxMediaSize || 1024;
    let { length } = files
    for (let index = 0; index < length; index += 1) {
        if (!patt1.test(files[index].type)) {
            message.error(files[index].name + "不符合上传类型");
        } else if (files[index].size > maxMediaSize * 1024 * 1024) {
            message.error(files[index].name + "超出" + maxMediaSize + "M的大小限制");
        } else {
            uploadfiles(files[index]);
        }
    }
}

export default sourcefilter