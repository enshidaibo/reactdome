/* global app */
export const getTimestamp = async () => app.yssjfetch.get('https://yssjgateway.estv.com.cn/common/api/service/time/timestamp')

//登录接口
export const login = async data => app.yssjfetch.post("admin/user/login", data);

//获取二维码登录状态
export const qrLoginStatus = async data => app.yssjfetch.post("admin/user/qrLoginStatus", data);

//登出接口
export const logout = async () => app.yssjfetch.post("admin/member/user/logout");

//获取当前用户登录信息
export const getUserPerms = async () => app.yssjfetch.post("admin/user/getPerms");

//心跳接口
export const heartbeat = async () => app.yssjfetch.post("admin/content/heartbeat");

//统计来源
export const getFlowSource = async () => app.yssjfetch.post("admin/flow/source/list");

//统计PV
export const getFlowPv = async () => app.yssjfetch.post("admin/flow/pv/list");

//文件上传
export const uploadfile = async (data) => app.yssjfetch.post("admin/file/upload", data);

//日志
export const getOperatingLogs = async (data) => app.yssjfetch.post("admin/log/operating_list", data);