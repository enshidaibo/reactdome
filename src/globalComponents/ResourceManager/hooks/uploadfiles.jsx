import React, { useEffect } from "react";
import { message } from "antd";
import useData from '@/hooks/useData'

const types = {
    // image: "image/gif,image/jpeg,image/jpg,image/png",
    image: "image/*",
    video: "video/*",
    audio: "audio/*"
};

const filterSource = (e, { accept, maxMediaSize = 1024 }) => {
    e.preventDefault();
    e.stopPropagation();
    let files = e.target.files || e.dataTransfer.files;
    let { length } = files
    let filesOk = []
    let patt1 = new RegExp(types[accept]);
    for (let index = 0; index < length; index += 1) {
        if (accept && !patt1.test(files[index].type)) {
            message.error(files[index].name + "不符合上传类型");
        } else if (files[index].size > maxMediaSize * 1024 * 1024) {
            message.error(files[index].name + "超出" + maxMediaSize + "M的大小限制");
        } else {
            filesOk.push(files[index])
        }
    }
    return filesOk
}

const uploadfiles = ({ uploadRequest, accept, children }) => {
    const [data, setData] = useData({ attachments: [], fileVersion: 0 })
    const { attachments, fileVersion } = data

    useEffect(() => {
        handleFileUpload(0)
    }, [fileVersion])

    const handleFileUpload = async (start = 0) => {
        let length = attachments.length
        if (length == 0 || length <= start) {
            return
        }
        let attachment = attachments[start]
        if (!attachment.status || attachment.status == 3) {
            handleFileUpload(start + 1)
            return;
        }
        attachments[start].status = 1;
        setData({ attachments });
        const onProgress = (res) => {
            attachments[start].progress = res
            setData({ attachments });
        }
        let res = await uploadRequest(attachment.file, onProgress)
        if (res.success) {
            attachment = {
                ...attachment,
                status: 3,
                ...res.body,
                ...res.data
            }
            attachments[start] = attachment
        } else {
            attachments[start].status = 2;
        }
        setData({ attachments });
        handleFileUpload(start + 1)
    }
    /**
    * 选择框选取文件
    */
    const handleChangeFile = e => {
        let files = filterSource(e, { accept, maxMediaSize: 1024 })
        files.map(file => {
            let bloburl = URL.createObjectURL(file);
            attachments.push({
                fileName: file.name,
                fileType: file.type,
                size: file.size,
                status: 4, //4:等待上传中，//1：上传中，2：上传失败，3：上传成功，
                bloburl: bloburl,
                progress: {
                    start: 0,
                    filesize: file.size
                },
                file: file,
            });
        })
        setData({ attachments, fileVersion: Date.now() });
    };
    const handleRetry = () => {
        setData({ fileVersion: Date.now() });
    }
    return children(attachments, handleChangeFile, handleRetry)
}
export default uploadfiles