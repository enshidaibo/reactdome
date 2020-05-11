import useData from '@/hooks/useData'

const upload = () => {
    const [data, setData] = useData({ attachments: [], files: {} })
    const { attachments, files } = data
    /**
     * 文件上传操作
     */
    const getFileId = file => {
        let fileId = attachments.length;
        files[fileId] = file;
        let bloburl = URL.createObjectURL(file);
        attachments.push({
            fileName: file.name,
            fileType: file.type,
            size: file.size,
            state: 1, //1：上传中，2：上传失败，3：上传成功，
            bloburl: bloburl,
            progress: {
                start: 0,
                filesize: file.size
            }
        });
        setData({ attachments, files });
        return fileId
    };
    /**
     * 重试上传失败的文件
     */
    const retryUpload = () => {
        attachments.map((attachment, index) => {
            if (attachment.state != 2) {
                return;
            }
            attachments[index].state = 1;
            setData({ attachments });
        });
    };
    const funcs = {
        setData,
        getFileId,
        retryUpload
    }
    return [data, funcs]
}

export default upload