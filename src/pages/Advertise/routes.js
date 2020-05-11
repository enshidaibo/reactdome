/* global app */
const { asyncComponents } = app

const routes = {
    path: "/advertise",
    name: "大屏广告",
    iconCls: "icon-novigo_yonghu",
    // redirect: "/member/roles",
    isUrl: false,
    auth: 'advertise',
    routes: [{
        path: "/advertise/ad",
        name: "广告管理",
        hideChildrenInMenu: true,
        auth: "advertise.admng",
        routes: [{
            path: "/advertise/ad",
            name: "广告列表",
            exact: true,
            auth: "advertise.ad.list",
            component: asyncComponents(() => import("./ad/AdIndex"))
        },
        {
            path: "/advertise/ad/add",
            name: "新增广告",
            exact: true,
            auth: "advertise.ad.add",
            component: asyncComponents(() => import("./ad/AdAdd"))
        },
        {
            path: "/advertise/ad/edit/:id",
            name: "修改广告",
            exact: true,
            auth: "advertise.ad.edit",
            component: asyncComponents(() => import("./ad/AdEdit"))
        },
        {
            path: "/advertise/ad/push/:id",
            name: "发布广告",
            exact: true,
            auth: "advertise.ad.push",
            component: asyncComponents(() => import("./ad/AdPublish"))
        },
        {
            path: "/advertise/ad/entity/:id",
            name: "广告详情",
            exact: true,
            auth: "advertise.ad.detail",
            component: asyncComponents(() => import("./ad/AdEntity"))
        }]
    },
    {
        path: "/advertise/agency",
        name: "广告商管理",
        hideChildrenInMenu: true,
        auth: "advertise.agencymng",
        routes: [{
            path: "/advertise/agency",
            name: "广告商列表",
            exact: true,
            auth: "advertise.agency.list",
            component: asyncComponents(() => import("./agency/AgencyIndex"))
        },
        {
            path: "/advertise/agency/add",
            name: "新增广告商",
            exact: true,
            auth: "advertise.agency.add",
            component: asyncComponents(() => import("./agency/AgencyAdd"))
        },
        {
            path: "/advertise/agency/edit/:id",
            name: "修改广告商",
            exact: true,
            auth: "advertise.agency.edit",
            component: asyncComponents(() => import("./agency/AgencyEdit"))
        }]
    },
    {
        path: "/advertise/device",
        name: "设备管理",
        hideChildrenInMenu: true,
        auth: "advertise.devicemng",
        routes: [{
            path: "/advertise/device",
            name: "设备列表",
            exact: true,
            auth: "advertise.device.list",
            component: asyncComponents(() => import("./device/DeviceIndex"))
        }, {
            path: "/advertise/device/add",
            name: "新增设备",
            exact: true,
            auth: "advertise.device.add",
            component: asyncComponents(() => import("./device/DeviceAdd"))
        }, {
            path: "/advertise/device/edit/:id",
            name: "修改设备",
            exact: true,
            auth: "advertise.device.edit",
            component: asyncComponents(() => import("./device/DeviceEdit"))
        }, {
            path: "/advertise/device/bind/:id",
            name: "广告列表",
            exact: true,
            auth: "advertise.device.bind",
            component: asyncComponents(() => import("./device/DeviceAdBind"))
        }]
    },
    {
        path: "/advertise/px",
        name: "分辨率管理",
        hideChildrenInMenu: true,
        auth: "advertise.pxmng",
        component: asyncComponents(() => import("./px/PxIndex")),
        routes: [{
            path: "/advertise/department",
            name: "部门列表",
            exact: true,
            auth: "advertise.px.list",
            component: asyncComponents(() => import("./px/PxIndex"))
        }]
    },
    {
        path: "/advertise/statis",
        name: "统计分析",
        hideChildrenInMenu: true,
        auth: "advertise.statismng",
        component: asyncComponents(() => import("./statis/StatisIndex"))
    }]
};
app.registerRoutes(routes)
if (process.env.NODE_ENV !== 'production') {
    app.renderApp()
}
export default routes;