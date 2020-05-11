/**
 * 管理员管理接口
 */
/* global app */

const { yssjfetch } = app

//获取本站管理员列表
export const getUsersLocalList = async (data) => yssjfetch.post("admin/admin/local_list", data);

//新增本站管理员
export const addUserDetail = async (data) => yssjfetch.post("admin/admin/local_save", data);

//获取本站管理员详情
export const getUserLocalDetail = async (data) => yssjfetch.post("admin/admin/local_get", data);

//修改本站管理员
export const updateUserDetail = async (data) => yssjfetch.post("admin/admin/local_update", data);

//删除本站管理员
export const deleteUser = async (data) => yssjfetch.post("admin/admin/local_delete", data);