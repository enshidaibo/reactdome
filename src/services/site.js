/* global app */
const { yssjfetch } = app

//新增站点
export const add = async data => yssjfetch.post("admin/site/save", data);

//获取站点详情
export const get = async data => yssjfetch.post("admin/site/get", data);

//新增站点
export const update = async data => yssjfetch.post("admin/site/update", data);