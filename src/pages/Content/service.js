/**
 * 内容管理接口
 */
/* global app */

const { yssjfetch } = app

//获取栏目工作流
export const getWorkFlowByChannelId = async data => yssjfetch.post("admin/workflow/getByChannelId", data);

//获取工作流内容列表
export const getWorkFlowContentList = async data => yssjfetch.post("admin/content/pageByWorkflow", data);

//获取文章操作记录
export const getContentRecord = async data => yssjfetch.post("admin/content/record/list", data);


//文章引用
export const postContentRefer = async data => yssjfetch.post("admin/content/refer", data);