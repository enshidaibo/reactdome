/* global AppConfig */
/* global localStorages */
/* global memoryStorage */
import axios from "axios";

import AppConf from "@/config/app.config";
// import { getRand } from "@/globalApp/jeecmsfetch/random";
// import { signParams } from "@/globalApp/jeecmsfetch/sign";
import { getXDate, getXContent, getAuthorization } from "@/globalApp/yssjfetch/HmacAuthUtil";

let AppCfg = { ...AppConf, ...AppConfig }

const isUrl = (url) => {
    const reg = /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+).)+([A-Za-z0-9-~/])+$/;
    return reg.test(url)
}

// const baseUrl = "http://10.114.20.202:8000/adsys/v1/api/";
const baseUrl = "https://yssjgateway.estv.com.cn/adsys/v1/api/";

const netfetch = axios.create({
    baseURL: baseUrl,
    timeout: 15000,
    headers: { "Content-Type": "application/json" }
});

// 添加请求拦截器
netfetch.interceptors.request.use((config) => {
    // 在发送请求之前做些什么
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
    config.params = {
        ...config.params,
        timestamp: Date.now(),
        token: memoryStorage.getItem("token"),
    }
    return config;
}, () => {
    let err = {
        success: false,
        code: "9001",
        msg: "请求时发生错误了",
        data: ""
    }
    return err;
});

// 添加响应拦截器
netfetch.interceptors.response.use((response) => {
    // 对响应数据做点什么
    let res = response.data;
    if (res.code == "200" || res.success) {
        res.success = true;
    }
    return res;
}, () => {
    // 对响应错误做点什么
    let err = {
        success: false,
        code: "9001",
        msg: "请求错误",
        data: ""
    }
    return err;
});

//分辨率分页查询
export const getPxList = async (params) => await netfetch.get('ads/res/getPageList', {
    params: params
});

//编辑分辨率
export const updatePx = async (data) => await netfetch.post("ads/res/update", data);

//新增分辨率
export const savePx = async (data) => await netfetch.post("ads/res/save", data);

//删除分辨率
export const delPx = async (data) => await netfetch.post('ads/res/delete', data);

//获取分辨率详情
export const getPx = async (id) => await netfetch.get(`ads/res/get/${id}`);

//广告商
//广告商分页查询
export const getAgencyList = async (params) => await netfetch.get('ads/merchant/list', {
    params: params
});

//新增广告商
export const saveAgency = async (data) => await netfetch.post('ads/merchant/add', data);

//修改广告商
export const updateAgency = async (data) => await netfetch.post('ads/merchant/update', data);

//删除广告商
export const delAgency = async (id) => await netfetch.post(`ads/merchant/delete/${id}`);

//查询广告商
export const getAgency = async (id) => await netfetch.get(`ads/merchant/get/${id}`);

//设备管理
//查询设备列表
export const getDeviceList = async (params) => await netfetch.get('device/getPageList', { params: params });

//新增设备
export const saveDevice = async (data) => await netfetch.post('device/save', data);

//修改设备
export const updateDevice = async (data) => await netfetch.post('device/update', data);

//删除设备
export const delDevice = async (data) => await netfetch.post('device/delete', data);

//查询设备
export const getDevice = async (params) => await netfetch.get('device/detail', { params: params });

//设备广告列表
export const getDeviceAdverList = async (params) => await netfetch.get('device/getAdsPageList', { params: params });

//查询设备分辨率广告列表
export const getPxsAdversList = async (params) => await netfetch.get('device/list/ads', { params: params });

//广告管理
//广告分页查询
export const getAdverList = async (params) => await netfetch.get('ads/ads/list', { params: params });

//广告新增
export const saveAdver = async (data) => await netfetch.post('ads/ads/add', data);

//修改广告
export const updateAdver = async (data) => await netfetch.post('ads/ads/update', data);

//删除广告
export const deleteAdver = async (id) => await netfetch.post(`ads/ads/delete/${id}`);

//查看广告详情
export const getAdver = async (id) => await netfetch.get(`ads/ads/get/${id}`);

//查询符合广告对应分辨率的设备列表
export const getPxAdverList = async (params) => await netfetch.get('ads/ads/list/target/device', { params: params });

//查询广告所有已关联设备
export const getAdverRela = async (params) => await netfetch.get('ads/ads/list/device', { params: params });

//发布广告
export const releaseAdver = async (data) => await netfetch.post('ads/ads/release', data);

//将广告从设备上移除
export const moveAdver = async (data) => await netfetch.post('ads/ads/remove/device', data);

//设置广告下线时间
export const offAdver = async (data) => await netfetch.post('ads/ads/offline', data);

//缩略图上传接口
export const thumbUpload = async (data) => await netfetch.post('ads/ads/ads/ads/upload', data);

//统计分析模块
//设备广告播放统计
export const playSum = async (params) => await netfetch.get('stats/getPageList', { params: params });

//设备数量
export const deviceSum = async () => await netfetch.get('device/getAllDeviceList');

//广告次数
export const adverSum = async (params) => await netfetch.get('stats/getAdsCurrList', { params: params });