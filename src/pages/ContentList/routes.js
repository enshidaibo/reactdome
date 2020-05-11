/* global app */

const { asyncComponents } = app

const routes = {
    path: "/contentlist",
    name: "内容列表",
    component: asyncComponents(() => import("./ContentList")),
    iconCls: "icon-liebiao",
    hideChildrenInMenu: true,
    auth: 'contentlist',
    routes: [{
        path: "/contentlist",
        name: "内容列表",
        auth: 'contentlist.list',
        exact: true,
    },
    {
        path: "/contentlist/add",
        name: "新增内容列表",
        auth: 'contentlist.add',
        component: asyncComponents(() => import("./ContentListAdd"))
    },
    {
        path: "/contentlist/:id",
        name: "编辑内容列表",
        auth: 'contentlist.update',
        component: asyncComponents(() => import("./ContentListAdd"))
    }]
};
app.registerRoutes(routes)
if (process.env.NODE_ENV !== 'production') {
    app.renderApp()
}
export default routes;