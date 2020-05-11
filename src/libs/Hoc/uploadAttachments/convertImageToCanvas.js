/**
 * 将图片转化为canvas 并进行压缩处理
 */
const convertImageToCanvas = (image, width, height, cover = false) => {
    let w = width;
    let h = height;
    let iw = image.width;
    let ih = image.height;
    let b = w / h;
    let ib = iw / ih;
    let sx = 0;
    let sy = 0;
    let niw;
    let nih;
    let canvas = document.createElement("canvas");
    if (cover) {
        if (b > ib) {
            niw = w;
            nih = (w * ih) / iw;
        } else {
            niw = (iw * h) / ih;
            nih = h;
        }
        canvas.width = w;
        canvas.height = h;
        sx = (w - niw) / 2;
        sy = (h - nih) / 2;
    } else {
        if (b > ib) {
            nih = h;
            niw = nih * ib;
        } else {
            niw = w;
            nih = (niw * ih) / iw;
        }
        canvas.width = niw;
        canvas.height = nih;
    }
    canvas.getContext("2d").drawImage(image, 0, 0, image.width, image.height, sx, sy, niw, nih);
    return canvas;
};

export default convertImageToCanvas;
