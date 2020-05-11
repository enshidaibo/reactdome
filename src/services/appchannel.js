/* global app */
const { yssjfetch } = app

//获取频道列表
export const getAppChannel = async data => yssjfetch.post("admin/appChannel/page", data);

//获取频道详情
export const getAppChannelDetail = async data => yssjfetch.post("admin/appChannel/getSlideServices", data);

//获取频道幻灯片列表
export const getAppChannelSlideList = async data => yssjfetch.post("admin/contentSection/slideList", data);

//获取服务分页数据
export const getAppService = async data => yssjfetch.post("/admin/appService/page", data);

//获取服务分页数据
export const UpdateAppService = async data => yssjfetch.post("/admin/appChannel/slideService", data);

//清除频道文章缓存
export const clearCache = async data => yssjfetch.post("/admin/appChannel/refreshRedis", data);

//清除频道列表
export const getAppChannelList = async () => yssjfetch.post("/admin/appChannel/list");