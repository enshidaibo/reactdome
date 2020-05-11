const convertSizeToBit = size => {
    let tip = size + "B";
    if (size < 1024) {
        tip = size + "B";
    } else if (size < 1024 * 1024) {
        tip = (size / 1024).toFixed(2) + "KB";
    } else if (size < 1024 * 1024 * 1024) {
        tip = (size / 1024 / 1024).toFixed(2) + "MB";
    } else if (size < 1024 * 1024 * 1024 * 1024) {
        tip = (size / 1024 / 1024 / 1024).toFixed(2) + "GB";
    }
    return tip;
};

export default convertSizeToBit;
