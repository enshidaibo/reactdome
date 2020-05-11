/* global app */

import ContentIndex from './ContentIndex'

const { asyncComponents } = app
const routes = {
    order: 999,
    path: "/content",
    name: "内容管理",
    iconCls: "icon-neirong",
    hideChildrenInMenu: true,
    auth: 'content',
    component: ContentIndex,
    routes: [{
        path: "/content",
        name: "文章列表",
        exact: true,
        auth: 'content.list',
        component: asyncComponents(() => import("./ContentList")),
    },
    {
        path: "/content/add",
        name: "新增内容",
        auth: 'content.add',
        component: asyncComponents(() => import("./ContentAdd"))
    },
    {
        path: "/content/:id",
        name: "编辑内容",
        auth: 'content.update',
        component: asyncComponents(() => import("./ContentEdit"))
    }]
};
app.registerRoutes(routes)
if (process.env.NODE_ENV !== 'production') {
    app.renderApp()
}
export default routes;