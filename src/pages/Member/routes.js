/**
 * 用户管理
 */
/* global app */

const { asyncComponents } = app

const routes = {
    path: "/member",
    name: "用户管理",
    iconCls: "icon-novigo_yonghu",
    // redirect: "/member/roles",
    isUrl: false,
    auth: 'member',
    routes: [{
        path: "/member/roles",
        name: "角色管理",
        hideChildrenInMenu: true,
        component: asyncComponents(() => import("./Roles/RolesIndex")),
        auth: 'member.roles',
        routes: [{
            path: "/member/roles",
            name: "角色列表",
            exact: true,
            auth: 'member.roles.list',
            component: asyncComponents(() => import("./Roles/RolesList"))
        },
        {
            path: "/member/roles/add",
            name: "新增角色",
            exact: true,
            auth: 'member.roles.add',
            component: asyncComponents(() => import("./Roles/RolesAdd"))
        },
        {
            path: "/member/roles/:id",
            name: "角色详情",
            auth: 'member.roles.update',
            exact: true,
            component: asyncComponents(() => import("./Roles/RoleDetail"))
        }]
    },
    {
        path: "/member/department",
        name: "部门管理",
        hideChildrenInMenu: true,
        auth: 'member.department',
        component: asyncComponents(() => import("./Department/DepartmentIndex")),
        routes: [{
            path: "/member/department",
            name: "部门列表",
            exact: true,
            auth: 'member.department.list',
            component: asyncComponents(() => import("./Department/DepartmentList"))
        },
        {
            path: "/member/department/add",
            name: "新增部门",
            exact: true,
            auth: 'member.department.add',
            component: asyncComponents(() => import("./Department/DepartmentAdd"))
        },
        {
            path: "/member/department/:id",
            name: "部门详情",
            exact: true,
            auth: 'member.department.update',
            component: asyncComponents(() => import("./Department/DepartmentDetail"))
        }]
    },
    {
        path: "/member/users",
        name: "人员管理",
        hideChildrenInMenu: true,
        auth: 'member.users',
        component: asyncComponents(() => import("./Users/UsersIndex")),
        routes: [{
            path: "/member/users",
            name: "人员列表",
            exact: true,
            auth: 'member.users.list',
            component: asyncComponents(() => import("./Users/UsersList"))
        },
        {
            path: "/member/users/add",
            name: "新增人员",
            exact: true,
            auth: 'member.users.add',
            component: asyncComponents(() => import("./Users/UsersAdd"))
        },
        {
            path: "/member/users/:id",
            name: "人员详情",
            exact: true,
            auth: 'member.users.update',
            component: asyncComponents(() => import("./Users/UsersDetail"))
        }]
    }]
};
app.registerRoutes(routes)
if (process.env.NODE_ENV !== 'production') {
    app.renderApp()
}
export default routes;