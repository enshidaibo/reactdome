/**
 * 栏目管理
 */

/* global app */

const { asyncComponents } = app

const routes = {
    order: 980,
    path: "/comment",
    name: "评论管理",
    iconCls: "icon-pinglun",
    hideChildrenInMenu: true,
    auth: 'comment',
    component: asyncComponents(() => import("./CommentIndex")),
    routes: [{
        path: "/comment",
        name: "评论列表",
        exact: true,
        auth: 'comment.list',
        component: asyncComponents(() => import("./CommentList"))
    },
    {
        path: "/comment/:id",
        name: "文章评论",
        auth: 'comment.list',
        component: asyncComponents(() => import("./CommentList"))
    }]
};
app.registerRoutes(routes)
if (process.env.NODE_ENV !== 'production') {
    app.renderApp()
}
export default routes;