/* global app */

const { asyncComponents } = app

const routes = {
    path: "/settings",
    name: "平台设置",
    order: 5,
    iconCls: "icon-baoliaoguanli",
    auth: 'settings',
    isLocal: true,
    routes: [{
        path: "/settings",
        name: "权限库",
        auth: 'settings.list',
        exact: true,
        component: asyncComponents(() => import("./privilege/PrivilegeIndex")),
    },
    {
        path: "/settings/dict",
        name: "字典维护",
        auth: 'settings.dict',
        exact: true,
        component: asyncComponents(() => import("./dict/DictIndex")),
    }]
};

app.registerRoutes(routes)
if (process.env.NODE_ENV !== 'production') {
    app.renderApp()
}
export default routes;