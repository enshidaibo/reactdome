/* global AppConfig */
/* global localStorages */
/* global memoryStorage */

import axios from "axios";
import AppConf from "@/config/app.config";
import { getRand } from "./random";
import { signParams } from "./sign";
import { getXDate, getXContent, getAuthorization } from "./HmacAuthUtil";

let AppCfg = { ...AppConf, ...AppConfig }
const basicfetch = axios.create({
    baseURL: AppCfg.baseUrl,
    timeout: AppCfg.timeout || 30000
});
/**
 * 请求拦截器
 *
 */
basicfetch.interceptors.request.use(
    config => {
        let xdata = getXDate(localStorages.timedifference * 1 || 0);
        let xcontent = getXContent(config.url);
        config.headers = {
            "X-Date": xdata,
            "X-Content": xcontent,
            Authorization: getAuthorization(AppCfg.cmsId, AppCfg.cmsPassword, xdata, xcontent),
            ...config.headers
        };
        // config.responseType = 'blob'
        if (config.method == 'get') {
            config.params = {
                ...config.params,
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
            if (sessionKey && sessionKey != "") {
                params.sessionKey = sessionKey;
                params.token = memoryStorage.getItem("token");
            }
            let { data = {} } = config;
            let { uploadFile, ...configData } = data;
            for (let key in configData) {
                let kdata = configData[key];
                if (Array.isArray(kdata)) {
                    kdata = JSON.stringify(kdata);
                }
                params[key] = kdata; //添加进参数列表
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

export default basicfetch;