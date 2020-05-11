/**
 * 素材资源管理
 */
/* global app */

const { yssjfetch } = app

//上传文件到服务器
export const httpFilesUpload = async data => yssjfetch({ method: "post", url: "admin/upload/o_upload", timeout: 120000, data });

//上传文件到服务器
export const httpFilesUploadAll = async data => yssjfetch({ method: "post", url: "admin/upload/o_upload_doc", timeout: 120000, data });

//保存文件信息
export const httpFilesSave = async data => yssjfetch.post("admin/file/save", data);

//删除文件
export const httpFilesDelete = async data => yssjfetch.post("admin/file/deleteFile", data);

//获取文件列表数据
export const getFilesList = async data => yssjfetch.post("admin/file/allList", data);

//获取我的文件列表数据
export const getFilesMyList = async data => yssjfetch.post("admin/file/my", data);

//获取文件分类列表
export const httpFilesTypeList = async data => yssjfetch.post("admin/file/typeList", data);

//新增文件分类
export const httpFilesTypeSave = async data => yssjfetch.post("admin/file/typeSave", data);

//上传文件到服务器
export const httpVmsProxy = async data => yssjfetch.post("admin/vms/proxy", data);

//远程图片水印
export const httpRemoteImgsWaterMark = async data => yssjfetch.post("admin/upload/image_local", data);