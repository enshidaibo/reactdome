
import Layout from "./A_Layout/Layout";
import Home from "./A_Home/Home";
import Login from "./A_Login/Login";

export const inlineRouters = [
    {
        path: "/",
        name: "首页",
        redirect: "/dashboard/home",
        exact: true,
        hideInMenu: true,
    },
    {
        path: "/dashboard",
        name: "我的",
        icon: "home",
        isUrl: false,
        routes: [
            {
                path: "/dashboard",
                redirect: "/dashboard/home",
                exact: true,
                hideInMenu: true,
            },
            {
                path: "/dashboard/home",
                exact: true,
                name: "首页",
                component: Home,
                auth: 'dashboard.home',
            },
            // {
            //     path: "/dashboard/test",
            //     exact: true,
            //     name: "测试页面",
            //     // auth: 'dashboard',
            //     component: asyncComponents(() => import("./Test/Test2")),
            // },
        ]
    },
];

export const baseRoutes = {
    path: "/login",
    name: "登录",
    exact: true,
    permission: "*",
    component: Login
}

const routes = [
    baseRoutes,
    {
        component: Layout,
        path: "/",
        name: "首页",
        show: false,
        routes: inlineRouters,
    }
];

export default routes;
