/**
 * 将data base64字符串数据转化为blob文件数据
 */
const convertDataUrlToBlob = (DataURL, type) => {
    // let data = canvas.toDataURL();
    // dataURL 的格式为 “data:image/png;base64,****”,逗号之前都是一些说明性的文字，我们只需要逗号之后的就行了
    let arr = DataURL.split(",");
    let mime = arr[0].match(/:(.*?);/)[1];
    let data = arr[1];
    data = window.atob(data);
    let ia = new Uint8Array(data.length);
    for (let i = 0; i < data.length; i++) {
        ia[i] = data.charCodeAt(i);
    }
    // canvas.toDataURL 返回的默认格式就是 image/png
    let blob = new Blob([ia], {
        type: type || mime
    });
    console.log(blob);
    return blob;
};

export default convertDataUrlToBlob;
