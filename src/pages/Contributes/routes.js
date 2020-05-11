/* global app */

const { asyncComponents } = app
// const {userId} = localStorage.getItem()

const routes = {
    path: "/contribute",
    name: "投稿箱",
    iconCls: "icon-tougao",
    auth: 'contributesystem',
    isUrl: false,
    routes: [{
        path: "/contribute/index",
        name: "投稿",
        auth: 'contribute.list',
        hideChildrenInMenu: true,
        routes: [{
            path: "/contribute/index",
            name: "投稿列表",
            exact: true,
            auth: 'contribute.list',
            component: asyncComponents(() => import("./Contribute/ContributeIndexs")),
        },
        {
            path: "/contribute/index/add",
            name: "新增投稿",
            exact: true,
            component: asyncComponents(() => import("./Contribute/ContributeAdd")),
            auth: 'contribute.add',
        },
        {
            path: "/contribute/index/entity/:id",
            name: "查看投稿",
            exact: true,
            component: asyncComponents(() => import("./Contribute/ContributeEntity")),
            auth: 'contribute.entity',
        },
        {
            path: "/contribute/index/:id",
            name: "投稿列表",
            exact: true,
            component: asyncComponents(() => import("./Contribute/ContributeIndexs")),
            auth: 'contribute.list',
        },
        {
            path: "/contribute/index/edit/:id",
            name: "修改投稿",
            exact: true,
            component: asyncComponents(() => import("./Contribute/ContributeEdit")),
            auth: 'contribute.update',
        }]
    },
    {
        path: "/contribute/editing",
        name: "审稿",
        auth: 'editing',
        hideChildrenInMenu: true,
        routes: [{
            path: "/contribute/editing/:id",
            name: "审稿箱",
            exact: true,
            auth: 'editing',
            component: asyncComponents(() => import("./Editing/EditingIndexs")),
        },
        {
            path: "/contribute/editing/entity/:id",
            name: "稿件详情",
            exact: true,
            auth: 'editing.entity',
            component: asyncComponents(() => import("./Editing/EditingEntitys")),
        },
        {
            path: "/contribute/editing",
            name: "审稿箱",
            exact: true,
            auth: 'editing',
            component: asyncComponents(() => import("./Editing/EditingIndexs")),
        }]
    },
    {
        path: "/contribute/depart",
        name: "投稿单位",
        auth: 'depart',
        component: asyncComponents(() => import("./Department/Department")),
    },
    {
        path: "/contribute/commonly",
        name: "常用单位设置",
        auth: 'contribute.list',
        component: asyncComponents(() => import("./Commonly"))
    },
    {
        path: "/contribute/statis",
        name: "统计",
        auth: 'statis',
        hideChildrenInMenu: true,
        routes: [{
            path: "/contribute/statis",
            name: "统计",
            exact: true,
            auth: 'statis',
            component: asyncComponents(() => import("./Stat/Statis"))
        },
        {
            path: "/contribute/statis/:userId",
            name: "统计明细",
            exact: true,
            auth: 'statis.record',
            component: asyncComponents(() => import("./Stat/StatisRecord"))
        }]
    },
    {
        path: "/contribute/statistical",
        name: "单位投稿统计",
        auth: 'statis',
        hideChildrenInMenu: true,
        routes: [{
            path: "/contribute/statistical",
            name: "单位投稿统计",
            exact: true,
            auth: 'statis',
            component: asyncComponents(() => import("./Statistical")),
        },
        {
            path: "/contribute/statistical/:orgId",
            name: "单位投稿统计明细",
            exact: true,
            auth: 'statis.record',
            component: asyncComponents(() => import("./Statistical/StatisRecord")),
        }]
    },
    {
        path: "/contribute/personal",
        name: "我的投稿统计",
        auth: 'contribute.list',
        component: asyncComponents(() => import("./Personal")),
    }]
};
app.registerRoutes(routes)
if (process.env.NODE_ENV !== 'production') {
    app.renderApp()
}
export default routes;