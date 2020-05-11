/* global app */
const { yssjfetch } = app

//模板文件列表树
export const getResourceTree = async data => yssjfetch.post("admin/resource/tree", data);

//模板文件列表
export const getResourceList = async data => yssjfetch.post("admin/resource/list", data);

//新增模板文件
export const addResourceDetail = async data => yssjfetch.post("admin/resource/save", data);

//模板文件
export const getResourceDetail = async data => yssjfetch.post("admin/resource/get", data);

//更新
export const updateResourceDetail = async data => yssjfetch.post("admin/resource/update", data);

//删除
export const deleteResource = async data => yssjfetch.post("admin/resource/delete", data);

//重命名
export const updateResourceReName = async data => yssjfetch.post("admin/resource/rename", data);

//文件上传
export const uploadResource = async data => yssjfetch.post("admin/resource/upload", data);

//新建文件夹
export const addResourceDir = async data => yssjfetch.post("admin/resource/dir_save", data);