/**
 * 网站模板设置
 */
/* global app */

const { yssjfetch } = app

//更新网站模板设置
export const getTplSolutions = async data => yssjfetch.post("admin/template/getSolutions", data);

//获取网站模板设置
export const getTplSetting = async data => yssjfetch.post("admin/site_config/base_get", data);

//更新网站模板设置
export const updateTplSolutions = async data => yssjfetch.post("admin/template/solutionupdate", data);