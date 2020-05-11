import Template from './Template/routes';
import Resource from './Resource/routes';
import Static from './Static/routes';

/* global app */

const { asyncComponents } = app

const routes = {
    path: "/interface",
    name: "界面",
    iconCls: "icon-jiemianyangshibiaofenleianniugongjulandengfenlei",
    isUrl: false,
    auth: 'interface',
    routes: [
        {
            path: "/interface",
            redirect: "/interface/template",
            exact: true,
            hideInMenu: true,
            // auth: 'interface',
        },
        Template,
        Resource,
        Static,
        {
            path: "/interface/logs",
            name: "日志",
            exact: true,
            auth: 'interface.logs',
            component: asyncComponents(() => import("./Logs/LogsIndex")),
        },
    ]
};

app.registerRoutes(routes)
if (process.env.NODE_ENV !== 'production') {
    app.renderApp()
}
export default routes;