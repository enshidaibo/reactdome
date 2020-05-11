/**
 * 部门管理接口
 */
/* global app */

const { yssjfetch } = app

//获取部门树
export const getDepartmentTree = async (data) => yssjfetch.post("admin/department/tree", data);

//获取部门列表
export const getDepartmentList = async (data) => yssjfetch.post("admin/department/getDepartmentListBySiteId", data);

//获取部门成员列表
export const getDepartmentMember = async (data) => yssjfetch.post("admin/department/member_list", data);

//新增部门
export const addDepartmentDetail = async (data) => yssjfetch.post("admin/department/save", data);

//获取部门详情
export const getDepartmentDetail = async (data) => yssjfetch.post("admin/department/get", data);

//更新部门详情
export const updatetDepartmentDetail = async (data) => yssjfetch.post("admin/department/update", data);

//删除部门
export const deleteDepartment = async (data) => yssjfetch.post("admin/department/delete", data);