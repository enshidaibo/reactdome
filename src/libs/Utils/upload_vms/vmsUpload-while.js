import vmsfetch from "./vmsfetch";

const vmsUpload = async (file, serverName, onProgress, start = 0) => {
    let filename = file.name.split(".")[0];
    let filetype = file.type.split("/")[1];
    let filesize = file.size;
    let end;
    let bytesPerPiece = 1024 * 1024 * 2;
    while (start <= filesize) {
        end = start + bytesPerPiece;
        if (end > filesize) {
            end = filesize;
        }
        let chunk = file.slice(start, end); //切割文件
        let chunksize = end - start;
        let formData = new FormData();
        formData.append("filename", serverName);
        formData.append("originName", filename);
        formData.append("filesize", filesize);
        formData.append("chunksize", chunksize);
        formData.append("offset", start);
        formData.append("filetype", filetype);
        formData.append("upload", chunk);
        let uploadfs = await vmsfetch("v1/file_server", {
            method: "post",
            headers: {
                "Content-Type": "application/octet-stream"
            },
            data: formData
        });
        console.log(uploadfs);
        if (!uploadfs.success) {
            return uploadfs;
        }
        onProgress && onProgress({ filesize, start });
        if (chunksize == 0) {
            return uploadfs;
        }
        start = end;
    }
};

export default vmsUpload;
