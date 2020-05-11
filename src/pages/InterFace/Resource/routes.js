/* global app */

const { asyncComponents } = app

const routes = {
    path: "/interface/resource",
    name: "资源管理",
    auth: 'interface.resource',
    component: asyncComponents(() => import("./ResourceIndex")),
    hideChildrenInMenu: true,
    routes: [{
        path: "/interface/resource",
        name: "模板列表",
        exact: true,
        show: false,
        auth: 'interface.resource.list',
        component: asyncComponents(() => import("./ResourceList")),
    }]
}

export default routes;