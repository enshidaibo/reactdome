/**
 * 云稿库接口
 */

/* global app */
const { yssjfetch } = app

//获取所有站点
export const getSiteList = async () => yssjfetch.post("admin/site/exceptCurrentList");

//栏目列表
export const getColumnList = async (data) => yssjfetch.post("admin/channel/listChannel", data);

//模型列表
export const getModelList = async () => yssjfetch.post("admin/model/shareList");

//共享列表
export const getShareList = async (data) => yssjfetch.post("admin/contentSection/shareSesctionList", data);

//栏目内容分页
export const getContentList = async (data) => yssjfetch.post("admin/content/sitePage", data);

//列表内容分页
export const getSectionList = async (data) => yssjfetch.post("admin/contentSection/historys", data);

//转载引用
export const draftCopy = async (data) => yssjfetch.post("admin/content/reprintRef", data);