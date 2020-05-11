/* global app */
/**
 * 专题管理接口
 */
const { yssjfetch } = app

//获取专题列表
export const getSubjectList = async (data) => yssjfetch.post("admin/subject/page", data);

//新增专题
export const addSubjectDetail = async data => yssjfetch.post("admin/subject/save", data);

//获取专题
export const getSubjectDetail = async data => yssjfetch.post("admin/subject/get", data);

//更新专题
export const upDateSubjectDetail = async data => yssjfetch.post("admin/subject/update", data);

//删除专题
export const deleteSubject = async data => yssjfetch.post("admin/subject/delete", data);

//获取文章列表数据
export const getContentList = async data => yssjfetch.post("admin/content/list", data);

//获取栏目数据
export const getChannel = async () => yssjfetch.post("admin/channel/select");