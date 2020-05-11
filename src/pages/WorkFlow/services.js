/* global app */
/**
 * 工作流接口
 */
const { yssjfetch } = app

//获取工作流列表
export const getWorkflowList = async data => yssjfetch.post("admin/workflow/list", data);

//获取角色列表
export const getRoleList = async data => yssjfetch.post("admin/role/getRoleListBySiteId", data);

//获取工作流详情
export const getWorkFlowDetail = async data => yssjfetch.post("admin/workflow/get", data);

//保存工作流详情
export const saveWorkFlowDetail = async data => yssjfetch.post("admin/workflow/save", data);

//更新工作流详情
export const updateWorkFlowDetail = async data => yssjfetch.post("admin/workflow/update", data);

//删除工作流
export const deleteWorkFlow = async data => yssjfetch.post("admin/workflow/delete", data);

//保存排序
export const updateWorkFlowPriority = async data => yssjfetch.post("admin/workflow/priority", data);