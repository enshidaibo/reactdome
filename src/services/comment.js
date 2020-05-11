/**
 * 评论管理接口
 */
/* global app */
const { yssjfetch } = app

//获取评论列表
export const getCommentList = async data => yssjfetch.post("admin/comment/list", data);

//获取单条文章评论列表
export const getCommentByContentId = async data => yssjfetch.post("admin/comment/list_by_content", data);

//审核通过
export const httpCommentCheck = async data => yssjfetch.post("admin/comment/check", data);

//修改评论
export const httpCommentUpdate = async data => yssjfetch.post("admin/comment/update", data);

//回复评论
export const httpCommentReply = async data => yssjfetch.post("admin/comment/reply", data);

//推荐
export const httpCommentRecommend = async data => yssjfetch.post("admin/comment/recommend", data);

//删除评论
export const httpCommentDelete = async data => yssjfetch.post("admin/comment/delete", data);