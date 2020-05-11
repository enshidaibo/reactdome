/* global app */

/**
 * 栏目管理
 */

const routes = {
    path: "/channel",
    name: "栏目管理",
    order: 990,
    component: app.asyncComponents(() => import("./ChannelIndex")),
    iconCls: "icon-lanmu",
    hideChildrenInMenu: true,
    auth: 'channel',
    routes: [{
        path: "/channel",
        name: "栏目列表",
        exact: true,
        auth: 'channel.list',
        component: app.asyncComponents(() => import("./ChannelList"))
    },
    {
        path: "/channel/add",
        name: "新增栏目",
        auth: 'channel.add',
        component: app.asyncComponents(() => import("./ChannelAdd"))
    },
    {
        path: "/channel/:id",
        name: "编辑栏目",
        auth: 'channel.update',
        component: app.asyncComponents(() => import("./ChannelEdit"))
    }]
};

app.registerRoutes(routes)
if (process.env.NODE_ENV !== 'production') {
    app.renderApp()
}

export default routes;