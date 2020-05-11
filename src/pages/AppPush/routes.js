/* global app */

const { asyncComponents } = app

const routes = {
    path: "/apppush",
    name: "App推送",
    order: 400,
    iconCls: "icon-tuisong",
    auth: 'apppush',
    component: asyncComponents(() => import("./PushIndex")),
    routes: [{
        path: "/apppush",
        redirect: "/apppush/add",
        exact: true,
        hideInMenu: true
    },
    {
        path: "/apppush/add",
        name: "App推送",
        auth: 'apppush.add',
        exact: true,
        component: asyncComponents(() => import("./PushAdd"))
    },
    {
        path: "/apppush/timing",
        name: "待推送",
        auth: 'apppush.list',
        component: asyncComponents(() => import("./PushTiming"))
    },
    {
        path: "/apppush/list",
        name: "推送历史",
        auth: 'apppush.list',
        component: asyncComponents(() => import("./PushList"))
    }, {
        path: "/apppush/:id",
        name: "编辑定时推送",
        auth: 'apppush.add',
        exact: true,
        hideInMenu: true,
        component: asyncComponents(() => import("./PushEdit"))
    }]
};
app.registerRoutes(routes)
if (process.env.NODE_ENV !== 'production') {
    app.renderApp()
}

export default routes;