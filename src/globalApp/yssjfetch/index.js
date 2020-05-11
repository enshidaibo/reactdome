/* global AppConfig */
/* global localStorages */
/* global dispatch */
/* global memoryStorage */

import axios from "axios";
import { message } from "antd";
import AppConf from "@/config/app.config";
import { getRand } from "./random";
import { signParams } from "./sign";
import { getXDate, getXContent, getAuthorization } from "./HmacAuthUtil";

let AppCfg = { ...AppConf, ...AppConfig }

const isUrl = (url) => {
    const reg = /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/;
    return reg.test(url)
}

const yssjfetch = axios.create({
    baseURL: AppCfg.baseUrl,
    timeout: AppCfg.timeout || 30000
});

/**
 * 请求拦截器
 *
 */
yssjfetch.interceptors.request.use(
    config => {
        if (!AppCfg.islocale && (!isUrl(config.url) || config.url.includes(AppCfg.baseUrl) || config.url.includes('https://yssjgateway.estv.com.cn/'))) {
            let xdata = getXDate(localStorages.timedifference * 1 || 0);
            let xcontent = getXContent(config.url);
            config.headers = {
                "X-Date": xdata,
                "X-Content": xcontent,
                Authorization: getAuthorization(AppCfg.cmsId, AppCfg.cmsPassword, xdata, xcontent),
                ...config.headers
            };
        }
        if (config.method == 'get') {
            config.params = {
                ...config.params,
                token: memoryStorage.getItem("token"),
                timestamp: Date.now()
            }
        } else if (config.method == 'post') {
            //在此处统一配置公共参数
            let { appId, appKey } = AppCfg
            let sessionKey = memoryStorage.getItem("sessionKey"); //sessionkey
            let _site_id_param = localStorages.getItem("_site_id_param") || ""; //站点id
            let params = {
                appId: appId, //appid
                nonce_str: getRand(), //随机数
                _site_id_param
            };
            let { data = {} } = config;
            let { uploadFile, ...configData } = data;
            for (let key in configData) {
                let kdata = configData[key];
                if (Array.isArray(kdata)) {
                    kdata = JSON.stringify(kdata);
                }
                params[key] = kdata; //添加进参数列表
            }
            if (sessionKey && sessionKey != "") {
                params.sessionKey = sessionKey;
                params.token = memoryStorage.getItem("token");
            }
            params = signParams(params, appKey); //返回签名后的对象
            let formdata = new FormData();
            for (let key in params) {
                formdata.append(key, params[key] == null ? '' : params[key]);
            }
            uploadFile && formdata.append("uploadFile", uploadFile);
            config.data = formdata;
        }
        return config;
    },
    error => {
        Promise.reject(error); // 错误提示
    }
);

let is403 = false;

const messageOutLogin = data => {
    if (is403) {
        return {
            ...data,
            success: false
        };
    }
    is403 = true;
    memoryStorage.removeItem("sessionKey");
    memoryStorage.removeItem("token");
    dispatch.set({
        sessionKey: null,
        userInfo: null,
        curWeb: null,
        menus: null,
        flattenMenus: null
    });
    message.error(data.message).then(() => {
        is403 = false;
    });
    return {
        ...data,
        success: false
    };
    // const errors = new Error("用户登录超时，请重新登录");
    // errors.name = 403;
    // // errors.response = response;
    // throw errors;
};

/**
 * 响应拦截器
 */
const codeMessage = {
    200: "服务器成功返回请求的数据。",
    201: "新建或修改数据成功。",
    202: "一个请求已经进入后台排队（异步任务）。",
    204: "删除数据成功。",
    400: "发出的请求有错误，服务器没有进行新建或修改数据的操作。",
    401: "用户没有权限（令牌、用户名、密码错误）。",
    403: "用户得到授权，但是访问是被禁止的。",
    404: "访问的页面或接口地址不存在，服务器没有进行操作。",
    406: "请求的格式不可得。",
    410: "请求的资源被永久删除，且不会再得到的。",
    422: "当创建一个对象时，发生一个验证错误。",
    500: "服务器发生错误，请检查服务器。",
    502: "网关错误。",
    503: "服务不可用，服务器暂时过载或维护。",
    504: "请求超时。"
};
yssjfetch.interceptors.response.use(
    response => {
        // const locale = app.globalRedux.getContext()
        // console.log(locale)
        let { data } = response;
        if (data.code == 200 || data.success) {
            return {
                ...data,
                success: true
            };
        }
        if (data.code == 302 || data.code == 3) {
            return messageOutLogin(data);
        }
        if (data.code == 201) {
            data.message = data.message + ':' + data.body
        }
        if (response.config.url.includes("api/admin/proxy")) {
            return data;
        }
        message.error(data.message);
        // const errors = new Error(data.message);
        // errors.name = data.code || response.status;
        // errors.response = response;
        // throw errors;
        return {
            ...data,
            success: false
        };
    },
    error => {
        const { response } = error
        let errortext;
        let status = 504;
        if (response) {
            status = response.status;
            errortext = codeMessage[response.status] || response.statusText;
        } else {
            errortext = codeMessage[status]
        }
        message.error(errortext);
        return {
            success: false
        };
        // const errors = new Error(errortext);
        // errors.name = response.status;
        // errors.response = response;
        // throw errors;
    }
);

export default yssjfetch;