/* global app */

const { asyncComponents } = app

const routes = {
    path: "/interface/template",
    name: "模板管理",
    auth: 'interface.template',
    component: asyncComponents(() => import("./TemplateIndex")),
    hideChildrenInMenu: true,
    routes: [{
        path: "/interface/template",
        name: "模板列表",
        exact: true,
        show: false,
        auth: 'interface.template.list',
        component: asyncComponents(() => import("./TemplateList")),
    }]
}

export default routes;