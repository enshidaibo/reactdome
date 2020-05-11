/* global app */
/**
 * 栏目管理接口
 */
const { yssjfetch } = app
//获取工作流列表
export const getWorkflowList = async () => yssjfetch.post("admin/workflow/list");

//获取工作流列表
export const getContentModel = async data => yssjfetch.get("admin/channel/content/model", data);