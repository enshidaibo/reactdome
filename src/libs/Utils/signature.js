import CryptoJS from "crypto-js";
import Base64 from "crypto-js/enc-base64";

const app = {
    key: "ef42d328a5ea4948b47f12d3fc1606be",
    secret: "a4151d3f12974cf4a8fa5a54a63380b5"
};
const signature = (params, timestamp, nonce) => {
    params.appkey = app.key;
    let order = Object.keys(params).sort();
    let paramsString = "";
    order.map(key => {
        if (params[key]) {
            paramsString = paramsString + key + params[key];
        }
    });
    paramsString = app.key + timestamp + nonce + paramsString + app.secret;
    let hmacSha1String = CryptoJS.HmacSHA1(paramsString, app.secret);
    let base64String = Base64.stringify(hmacSha1String);
    return "Dataplus " + app.key + ":" + base64String.toUpperCase();
};

export default signature;
