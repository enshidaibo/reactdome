"use strict";
import CryptoJS from "crypto-js";
const accessKey = "Lkve3Zo4h2ZK3iIGMJbwvop2Guy1jIDyJT0Mi9RL";
const secretKey = "WF41n8b1LIRk8c6lcBiDzNrFTci2E-cu7ki22W2b";
const scope = "gitee";

export const getUpToken = () => {
    let returnBody =
        '{ "name":$(fname),"format": $(imageInfo.format),"size":$(fsize),"info":$(imageInfo),"hash":$(etag),"url":"http://paww7oby8.bkt.clouddn.com/$(etag)"}';
    let putPolicy = {
        scope: scope,
        deadline: Date.now() + 3600,
        returnBody: returnBody
    };
    let put_policy = JSON.stringify(putPolicy);
    let encoded = base64encode(utf16to8(put_policy));
    let hash = CryptoJS.HmacSHA1(encoded, secretKey);
    let encoded_signed = hash.toString(CryptoJS.enc.Base64);
    let upload_token = accessKey + ":" + safe64(encoded_signed) + ":" + encoded;
    return upload_token;
};

export const QiniuUploadAxios = async file => {
    let token = getUpToken();
    let formdata = new FormData();
    // formdata.append("name", "file");
    // formdata.append("key", file.name);
    formdata.append("token", token);
    formdata.append("file", file);
    let res = await Request.post("http://up.qiniu.com", formdata);
    console.log(res);
    return res;
};

export const QiniuUpload = async file => {
    return new Promise((resolve, reject) => {
        let token = getUpToken();
        const data = new FormData();
        data.append("token", token);
        data.append("file", file);
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "http://up.qiniu.com");
        xhr.send(data);
        xhr.addEventListener("load", () => {
            const response = JSON.parse(xhr.responseText);
            resolve({
                success: true,
                data: response
            });
        });
        xhr.addEventListener("error", () => {
            // const error = JSON.parse(xhr.responseText);
            // reject(error);
            resolve({
                success: false,
                message: "上传失败"
            });
        });
    });
};

export default QiniuUpload;

function utf16to8(str) {
    var out, i, len, c;
    out = "";
    len = str.length;
    for (i = 0; i < len; i++) {
        c = str.charCodeAt(i);
        if (c >= 0x0001 && c <= 0x007f) {
            out += str.charAt(i);
        } else if (c > 0x07ff) {
            out += String.fromCharCode(0xe0 | ((c >> 12) & 0x0f));
            out += String.fromCharCode(0x80 | ((c >> 6) & 0x3f));
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3f));
        } else {
            out += String.fromCharCode(0xc0 | ((c >> 6) & 0x1f));
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3f));
        }
    }
    return out;
}

/*
 * Interfaces:
 * b64 = base64encode(data);
 * data = base64decode(b64);
 */
var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
var base64DecodeChars = new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1,
    62, -1, -1, -1, 63,
    52, 53, 54, 55, 56, 57, 58, 59, 60, 61,
    -1, -1, -1, -1, -1, -1, -1,
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
    10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
    20, 21, 22, 23, 24, 25,
    -1, -1, -1, -1, -1, -1,
    26, 27, 28, 29,
    30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
    40, 41, 42, 43, 44, 45, 46, 47, 48, 49,
    50, 51, -1, -1, -1, -1, -1
);

function base64encode(str) {
    var out, i, len;
    var c1, c2, c3;
    len = str.length;
    i = 0;
    out = "";
    while (i < len) {
        c1 = str.charCodeAt(i++) & 0xff;
        if (i == len) {
            out += base64EncodeChars.charAt(c1 >> 2);
            out += base64EncodeChars.charAt((c1 & 0x3) << 4);
            out += "==";
            break;
        }
        c2 = str.charCodeAt(i++);
        if (i == len) {
            out += base64EncodeChars.charAt(c1 >> 2);
            out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xf0) >> 4));
            out += base64EncodeChars.charAt((c2 & 0xf) << 2);
            out += "=";
            break;
        }
        c3 = str.charCodeAt(i++);
        out += base64EncodeChars.charAt(c1 >> 2);
        out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xf0) >> 4));
        out += base64EncodeChars.charAt(((c2 & 0xf) << 2) | ((c3 & 0xc0) >> 6));
        out += base64EncodeChars.charAt(c3 & 0x3f);
    }
    return out;
}

var safe64 = function (base64) {
    base64 = base64.replace(/\+/g, "-");
    base64 = base64.replace(/\//g, "_");
    return base64;
};