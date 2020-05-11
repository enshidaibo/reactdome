/**
 * 将data base64字符串数据转化为File文件数据
 */
const convertDataUrlToFile = (DataURL, filename = "file") => {
    // let data = canvas.toDataURL();
    // dataURL 的格式为 “data:image/png;base64,****”,逗号之前都是一些说明性的文字，我们只需要逗号之后的就行了
    let arr = DataURL.split(",");
    let mime = arr[0].match(/:(.*?);/)[1];
    let data = arr[1];
    data = window.atob(data);
    let ia = new Uint8Array(data.length);
    for (let i = 0; i < data.length; i += 1) {
        ia[i] = data.charCodeAt(i);
    }
    let file = new File([ia], filename, { type: mime });
    return file;
};

export default convertDataUrlToFile;