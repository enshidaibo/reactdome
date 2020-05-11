/* global app */

const { asyncComponents } = app

const routes = {
    path: "/statistics",
    iconCls: "icon-shuju",
    name: "数据分析",
    order: 301,
    isUrl: false,
    hideChildrenInMenu: true,
    auth: 'statistics',
    routes: [{
        path: "/statistics",
        name: "数据概览",
        exact: true,
        component: asyncComponents(() => import("./StatisticsIndex"))
    },
    {
        path: "/statistics/terminal",
        name: "终端设备",
        component: asyncComponents(() => import("./StatTerminal"))
    },
    {
        path: "/statistics/au",
        name: "活跃度",
        component: asyncComponents(() => import("./StatBehavior"))
    },
    {
        path: "/statistics/visit",
        name: "访问统计",
        component: asyncComponents(() => import("./StatVisit"))
    },
    {
        path: "/statistics/frequency",
        name: "使用频率",
        component: asyncComponents(() => import("./StatFrequency"))
    },
    {
        path: "/statistics/retention",
        name: "留存率",
        component: asyncComponents(() => import("./StatRetention"))
    },
    {
        path: "/statistics/error",
        name: "错误信息",
        component: asyncComponents(() => import("./StatError"))
    },
    {
        path: "/statistics/os",
        name: "系统信息",
        component: asyncComponents(() => import("./StatOsInfo"))
    },
    {
        path: "/statistics/crash",
        name: "crash",
        component: asyncComponents(() => import("./StatCrash"))
    }]
};
app.registerRoutes(routes)
if (process.env.NODE_ENV !== 'production') {
    app.renderApp()
}
export default routes;