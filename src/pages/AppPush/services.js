/* global app */
/**
 * 栏目管理接口
 */
const { yssjfetch } = app

//站点列表
export const getPushSiteList = async () => yssjfetch.post("admin/site/allList");

//栏目列表
export const getPushChannelAll = async data => yssjfetch.post("admin/channel/allList", data);

//模型列表
export const getPushModeList = async data => yssjfetch.post("admin/model/list", data);

//选取内容
export const getPushContentList = async data => yssjfetch.post("admin/content/pageContent", data);

//推送列表
export const getPushList = async data => yssjfetch.post("admin/push/list", data);

// 新增推送
export const addPushContent = async data => yssjfetch.post("admin/push/timing", data);

//获取推送详情
export const getPushDetail = async data => yssjfetch.post("admin/push/get", data);

//修改推送内容接口
export const updatePushContent = async data => yssjfetch.post("admin/push/update", data);

//取消推送接口
export const deletePushContent = async data => yssjfetch.post("admin/push/cacel", data);

//推送详情文章详情
export const getPushItemDetail = async data => yssjfetch.post("admin/content/getByModel", data);