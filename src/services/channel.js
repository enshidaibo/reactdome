/* global app */
/**
 * 栏目管理接口
 */
const { yssjfetch } = app
//获取所有站点栏目
export const getChannelAll = async () => yssjfetch.post("admin/channel/all");

//获取栏目树
export const getChannelTree = async (data) => yssjfetch.post("admin/channel/select", data);

//获取栏目列表
export const getChannelList = async (data) => yssjfetch.post("admin/channel/list", data);

//获取栏目详情
export const getChannelDetail = async (data) => yssjfetch.post("admin/channel/get", data);

//更新栏目详情
export const updateChannelDetail = async (data) => yssjfetch.post("admin/channel/update", data);

//创建获取栏目路径
export const createChannelPath = async (data) => yssjfetch.post("admin/channel/create_path", data);

//新增栏目
export const addChannelDetail = async (data) => yssjfetch.post("admin/channel/save", data);

//删除栏目
export const deleteChannelDetail = async (data) => yssjfetch.post("admin/channel/delete", data);