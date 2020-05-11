/* global app */
const { yssjfetch } = app
// import yssjfetch from '@/globalApp/yssjfetch'

//获取投稿单位列表
export const getDepartmentList = async (params) => await yssjfetch.get('jztg/org/list', {
    params: params
});

//获取常用投稿单位列表
export const getDepartmentPage = async (params) => await yssjfetch.get('jztg/orgcommon/page', {
    params: params
});

//设置常用单位
export const getDepartmentSave = async (data) => await yssjfetch.post('jztg/orgcommon/save', data);

//移除常用单位
export const getDepartmentDelete = async (data) => await yssjfetch.post('jztg/orgcommon/delete', data);

//获取所有投稿单位列表
export const getDepartmentAll = async (params) => await yssjfetch.get('jztg/org/selectAll', {
    params: params
});

//获取单位投稿统计
export const getOrgStatisticPage = async (params) => await yssjfetch.get('jztg/manuscript/getOrgStatisticPage', {
    params: params
});

//投稿单位的新增或修改
export const departCreateOrUpdate = async (data) => await yssjfetch.post("jztg/org/save", data);

//删除投稿单位
export const departDelById = async (data) => await yssjfetch.post("jztg/org/delete", data);

//投稿栏目
export const columnList = async (params) => await yssjfetch.get("jztg/column/list", {
    params: params
});
//投稿栏目删除
export const columnDel = async (data) => await yssjfetch.post("jztg/column/delete", data);

//投稿栏目添加
export const columnAdd = async (data) => await yssjfetch.post("jztg/column/save", data);

//投稿栏目修改
export const columnEdit = async (data) => await yssjfetch.post("jztg/column/update", data);

//投稿列表
export const contributeList = async (params) => await yssjfetch.get("jztg/manuscript/list", {
    params: params
});

//解锁投稿
export const contributeUnLock = async (params) => await yssjfetch.get("jztg/manuscript/cancelLock", {
    params: params
});

//新增投稿
export const contributeAdd = async (data) => await yssjfetch.post("jztg/manuscript/save", data);

//修改投稿
export const contributeEdit = async (data) => await yssjfetch.post("jztg/manuscript/update", data);

//投稿状态
export const contributeStatus = async (data) => await yssjfetch.post("jztg/manuscript/operateStatus", data);

//查看投稿
export const contributeView = async (params) => await yssjfetch.get("jztg/manuscript/view", {
    params: params
});

//批量删除
export const contributeDel = async (data) => await yssjfetch.post("jztg/manuscript/deleteByIds", data);

//回复
export const replySave = async (data) => await yssjfetch.post("jztg/reply/save", data);

//修改回复
export const replyUpdate = async (data) => await yssjfetch.post("jztg/reply/update", data);

//删除回复
export const replyDel = async (data) => await yssjfetch.post("jztg/reply/delete", data);

//回复列表
export const replyList = async (params) => await yssjfetch.get("jztg/reply/list", {
    params: params
});

//投稿线索
export const contributeRecord = async (params) => await yssjfetch.get("jztg/manuscript/recordList", { params: params });

//一键投稿
export const contributePublish = async (data) => await yssjfetch.post("jztg/manuscript/publish", data);

//回收站
export const contributeRecycle = async (data) => await yssjfetch.post("jztg/manuscript/operateStatus", data);

//统计
export const contributeStat = async (params) => await yssjfetch.get("jztg/manuscript/getStatisticPage", { params: params });

//评分
export const contributeScore = async (data) => await yssjfetch.post("jztg/manuscript/updateScore", data);