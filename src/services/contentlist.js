/**
 * 内容列表管理接口
 */
/* global app */
const { yssjfetch } = app

//获取内容列表分类及列表
export const getContentListType = async () => yssjfetch.post("admin/contentSection/typeTree");

//新增分类
export const httpContentListTypeAdd = async data => yssjfetch.post("admin/contentSection/typeSave", data);

//修改分类信息
export const httpContentListTypeUpdate = async data => yssjfetch.post("admin/contentSection/typeUpdate", data);

//删除分类
export const httpContentListTypeDelete = async data => yssjfetch.post("admin/contentSection/typeDelete", data);

//新增内容列表
export const httpContentListAdd = async data => yssjfetch.post("admin/contentSection/save", data);

//更新内容列表
export const httpContentListUpdate = async data => yssjfetch.post("admin/contentSection/update", data);

//获取内容列表详情
export const getContentListDetail = async data => yssjfetch.post("admin/contentSection/get", data);

//删除内容列表
export const httpContentListDelete = async data => yssjfetch.post("admin/contentSection/delete", data);

//获取内容列表列表数据
export const getContentListData = async data => yssjfetch.post("admin/contentSection/rows", data);

//保存内容列表条目数据
export const httpContentListSave = async data => yssjfetch.post("admin/contentSection/saveList", data);

//获取内容列表列表历史数据
export const getContentListHistorysData = async data => yssjfetch.post("admin/contentSection/historys", data);

//获取共享分类
export const getShareType = async () => yssjfetch.post("admin/contentSection/shareType");

//获取共享站点信息
export const getShareSiteData = async () => yssjfetch.post("admin/contentSection/shareSite");

//获取共享站点栏目数据
export const getShareChannelData = async data => yssjfetch.post("admin/contentSection/shareChannel", data);

//获取共享内容列表数据
export const getShareList = async () => yssjfetch.post("admin/contentSection/shareList");

//获取内容列表条目标签
export const getContentListLabel = async () => yssjfetch.post("admin/contentSection/labelList");

//获取内容列表条目详情
export const getContentListItemDetail = async data => yssjfetch.post("admin/contentSection/itemGet", data);

//修改内容列表条目详情
export const httpContentListItemUpdate = async data => yssjfetch.post("admin/contentSection/itemUpdate", data);

//删除内容列表条目
export const httpContentListItemDelete = async data => yssjfetch.post("admin/contentSection/itemDelete", data);