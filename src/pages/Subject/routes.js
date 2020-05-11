/* global app */

/**
 * 栏目管理
 */
const { asyncComponents } = app
const routes = {
    path: "/subject",
    name: "专题",
    component: asyncComponents(() => import("./SubjectIndex")),
    iconCls: "icon-jiemianyangshibiaofenleianniugongjulandengfenlei",
    permission: "*",
    hideChildrenInMenu: true,
    // auth: 'subject',
    routes: [{
        path: "/subject",
        name: "专题",
        exact: true,
        // auth: 'workflow.list',
        show: false,
        component: asyncComponents(() => import("./SubjectList"))
    }, {
        path: "/subject/add",
        name: "新增专题",
        // auth: 'subject.add',
        component: app.asyncComponents(() => import("./SubjectAdd"))
    }, {
        path: "/subject/:id",
        name: "编辑专题",
        // auth: 'workflow.update',
        component: app.asyncComponents(() => import("./SubjectEdit"))
    }]
};

app.registerRoutes(routes)

if (process.env.NODE_ENV !== 'production') {
    app.renderApp()
}

export default routes;