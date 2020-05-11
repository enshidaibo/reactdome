/* global AppConfig */
import axios from "axios";

const vmsfetch = axios.create({
    baseURL: AppConfig.vmsUrl,
    timeout: 15000
});

/**
 * 响应拦截器
 */
vmsfetch.interceptors.response.use(
    response => {
        let { Code, Msg } = response.data;
        if (Code == 200 || Code == 202) {
            return {
                success: true,
                data: Msg,
                code: Code
            };
        } else {
            return {
                ...response.data,
                data: Msg,
                code: Code,
                success: false
            };
        }
    },
    error => {
        // 对响应错误做点什么
        let res = {};
        if (error.response) {
            let err = error.response;
            res = {
                message: err.message,
                status: err.status
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

export default vmsfetch;