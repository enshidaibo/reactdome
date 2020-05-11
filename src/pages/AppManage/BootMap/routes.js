/* global app */

const { asyncComponents } = app

const routes = {
    path: "/appmanage/bootmap",
    name: "开机图",
    hideChildrenInMenu: true,
    auth: 'appmanage.category',
    component: asyncComponents(() => import("./BootMapIndex"))
}

export default routes;