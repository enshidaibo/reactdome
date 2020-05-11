/* global app */

const { asyncComponents } = app

const routes = {
    path: "/interface/static",
    name: "页面静态化",
    auth: 'interface.template',
    component: asyncComponents(() => import("./StaticIndex")),
    // routes: [{
    //     path: "/interface/static",
    //     name: "首页静态化",
    //     exact: true,
    //     show: false,
    //     auth: 'interface.template.list',
    //     component: asyncComponents(() => import("./StaticIndex")),
    // }, {
    //     path: "/interface/static/channel",
    //     name: "栏目静态化",
    //     exact: true,
    //     auth: 'interface.template.list',
    //     component: asyncComponents(() => import("./StaticChannel")),
    // }, {
    //     path: "/interface/static/content",
    //     name: "内容静态化",
    //     exact: true,
    //     auth: 'interface.template.list',
    //     component: asyncComponents(() => import("./StaticContent")),
    // }]
}

export default routes;