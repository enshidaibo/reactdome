/* global app */

/**
 * 工作流管理
 */
const { asyncComponents } = app
const routes = {
    path: "/workflow",
    name: "工作流",
    component: asyncComponents(() => import("./WorkFlowIndex")),
    iconCls: "icon-lanmu",
    permission: "*",
    hideChildrenInMenu: true,
    auth: 'workflow',
    routes: [{
        path: "/workflow",
        name: "工作流",
        exact: true,
        auth: 'workflow.list',
        show: false,
        component: asyncComponents(() => import("./WorkFlowList"))
    }, {
        path: "/workflow/add",
        name: "新增工作流",
        auth: 'workflow.add',
        component: app.asyncComponents(() => import("./WorkFlowAdd"))
    }, {
        path: "/workflow/:id",
        name: "编辑工作流",
        auth: 'workflow.update',
        component: app.asyncComponents(() => import("./WorkFlowEdit"))
    }]
};

app.registerRoutes(routes)

if (process.env.NODE_ENV !== 'production') {
    app.renderApp()
}

export default routes;