/* global app */

const { asyncComponents } = app

const routes = {
    path: "/cloud",
    name: "云稿库",
    order: 302,
    iconCls: "icon-ic_folder_x",
    hideChildrenInMenu: true,
    auth: 'cloud',
    routes: [{
        path: "/cloud",
        name: "热点",
        exact: true,
        auth: 'cloud',
        component: asyncComponents(() => import("./CloudIndex")),
    }]
}
app.registerRoutes(routes)
if (process.env.NODE_ENV !== 'production') {
    app.renderApp()
}

export default routes;