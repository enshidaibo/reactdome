/**
 * 角色管理接口
 */
/* global app */

const { yssjfetch } = app

//获取角色列表
export const getRoleList = async (data) => yssjfetch.post("admin/role/list", data);

//根据站点id查询角色List
export const getRoleListBySiteId = async (data) => yssjfetch.post("admin/role/getRoleListBySiteId", data);

//新增角色
export const addRoleDetail = async (data) => yssjfetch.post("admin/role/save", data);

//获取权限列表
export const getPermissionList = async (data) => yssjfetch.post("admin/permission/list", data);

//获取角色详情
export const getRoleDetail = async (data) => yssjfetch.post("admin/role/get", data);

//修改角色详情
export const updateRoleDetail = async (data) => yssjfetch.post("admin/role/update", data);

//删除角色
export const deleteRole = async (data) => yssjfetch.post("admin/role/delete", data);

//获取角色成员
export const getRoleMember = async (data) => yssjfetch.post("admin/role/member_list", data);

//新增角色成员
export const addRoleMember = async (data) => yssjfetch.post("admin/role/bound", data);

//删除角色成员
export const deleteRoleMember = async (data) => yssjfetch.post("admin/role/member_delete", data);

//全站删除用户
export const deleteGlobalMember = async (data) => yssjfetch.post("admin/global_delete", data);

//本站删除用户
export const deleteLocalMember = async (data) => yssjfetch.post("admin/local_delete", data);