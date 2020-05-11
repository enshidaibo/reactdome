/* global app */
/**
 * 栏目管理接口
 */
const { yssjfetch } = app
//获取工作流列表
export const getBootMap = async () => yssjfetch.get("appconfigure/app-site-config-ext/getPage");

//获取工作流列表
export const updateBootMap = async data => yssjfetch.post("appconfigure/app-site-config-ext/updatePage", data);