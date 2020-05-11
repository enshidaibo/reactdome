/* global app */

const { asyncComponents } = app

const routes = {
    path: "/report",
    name: "报料",
    hideChildrenInMenu: true,
    iconCls: "icon-baoliaoguanli",
    auth: 'report',
    routes: [{
        path: "/report",
        name: "报料列表",
        exact: true,
        auth: 'report',
        component: asyncComponents(() => import("./ReportIndex")),
    },
    {
        path: "/report/:id",
        name: "报料详情",
        exact: true,
        auth: 'report',
        component: asyncComponents(() => import("./ReportDetail")),
    }]
};

app.registerRoutes(routes)
if (process.env.NODE_ENV !== 'production') {
    app.renderApp()
}
export default routes;