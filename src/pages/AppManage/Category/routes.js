/* global app */

const { asyncComponents } = app

const routes = {
    path: "/appmanage/category",
    name: "频道管理",
    hideChildrenInMenu: true,
    auth: 'appmanage.category',
    component: asyncComponents(() => import("./CategoryIndex")),
    routes: [{
        path: "/appmanage/category",
        name: "频道管理",
        exact: true,
        show: false,
        auth: 'appmanage.category.list',
        component: asyncComponents(() => import("./CategoryList")),
    }, {
        path: "/appmanage/category/add",
        name: "新增频道",
        exact: true,
        auth: 'appmanage.category.add',
        component: asyncComponents(() => import("./CategoryAdd")),
    }, {
        path: "/appmanage/category/:id",
        name: "编辑频道",
        exact: true,
        auth: 'appmanage.category.update',
        component: asyncComponents(() => import("./CategoryEdit")),
    }]
}

export default routes;