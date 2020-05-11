/* global app */
const { yssjfetch } = app

//模板文件列表树
export const getTemplateTree = async data => yssjfetch.post("admin/template/tree", data);

//模板文件列表
export const getTemplateList = async data => yssjfetch.post("admin/template/list", data);

//新增模板文件
export const addTemplateDetail = async data => yssjfetch.post("admin/template/save", data);

//模板文件
export const getTemplateDetail = async data => yssjfetch.post("admin/template/get", data);

//更新
export const updateTemplateDetail = async data => yssjfetch.post("admin/template/update", data);

//删除
export const deleteTemplate = async data => yssjfetch.post("admin/template/delete", data);

//重命名
export const updateTemplateReName = async data => yssjfetch.post("admin/template/rename", data);

//文件上传
export const uploadTemplate = async data => yssjfetch.post("admin/template/upload", data);

//新建文件夹
export const addTemplateDir = async data => yssjfetch.post("admin/template/dir_save", data);