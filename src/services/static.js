/**
 * 静态化接口
 */

/* global app */
const { yssjfetch } = app

//首页生成
export const updateStaticIndex = async () => yssjfetch.post("admin/static/index");

//首页删除
export const deleteStaticIndex = async () => yssjfetch.post("admin/static/index_remove");

//栏目生成
// channelId: 75
// containChild: true
export const updateStaticChannel = async data => yssjfetch.post("admin/static/channel", data);

//内容生成
// channelId: 75
// startDate: 2019-02-11
export const updateStaticContent = async data => yssjfetch.post("admin/static/content", data);