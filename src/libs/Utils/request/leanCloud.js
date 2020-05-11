/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
import axios from "axios";
const CancelToken = axios.CancelToken;
const APP_ID = "lRUkg4MU5BNfbSj3FSK1sQcj-gzGzoHsz";
const APP_KEY = "kPNV7UDmkUHXpMwoYfzntWei";
/**
 * 请求拦截器
 *
 */
let leanCloud = axios.create({
    timeout: 10000,
    dataType: "json",
    baseURL: "https://lrukg4mu.api.lncld.net/1.1/",
    headers: {
        "X-LC-Id": APP_ID,
        "X-LC-Key": APP_KEY
    }
});
leanCloud.interceptors.request.use(config => {
    // let leanCloudUserIsexit = typeof leanCloudUser != "undefined" ? true : false;
    config.headers = {
        // "X-LC-Session": leanCloudUser ? leanCloudUser.sessionToken : null,
        ...config.headers
    };
    config.cancelToken = new CancelToken(c => {
        // executor 函数接收一个 cancel 函数作为参数
        window.leanCloudCancel = c;
    });
    return config;
});

/**
 * 响应拦截器
 */
leanCloud.interceptors.response.use(
    response => {
        // 对响应数据做点什么
        let data = {
            success: true,
            message: response.data.msg,
            ...response.data
        };
        return data;
    },
    error => {
        // 对响应错误做点什么
        let res = {};
        if (error.response) {
            let err = error.response;
            let data = isJson(err.data) ? err.data : {};
            res = {
                message: data.message || data.msg || err.statusText,
                status: err.status,
                ...data
            };
        } else if (error.request) {
            res.message = "网络错误，请检查你的网络状态";
        } else {
            console.log("Error", error.message);
        }
        res.success = false;
        return res;
    }
);

export default leanCloud;

//判断obj是否为json对象
function isJson(obj) {
    var isjson =
        typeof obj == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length;
    return isjson;
}
