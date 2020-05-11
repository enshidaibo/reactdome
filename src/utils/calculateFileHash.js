/**
 * 计算文件的hash值
 */
import CryptoJS from "crypto-js";

const calculateFileHash = async (file, end = 1024) => {
    let chunk = file.slice(0, end) //切割文件，用文件的一部分进行hash计算
    return new Promise((resolve) => {
        let reader = new FileReader()
        reader.readAsArrayBuffer(chunk)
        reader.onload = evt => {
            resolve(evt.target.result)
        }
    }).then(res => {
        let wordArray = CryptoJS.lib.WordArray.create(res)
        let hash = CryptoJS.SHA256(wordArray).toString()
        return hash
    }).catch(error => {
        return error
    });
}

export default calculateFileHash