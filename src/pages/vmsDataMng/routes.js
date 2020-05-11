/* global app */

const { asyncComponents } = app
const routes = {
    path: "/vmsDataMng",
    name: "素材库",
    order: 303,
    iconCls: "icon-wangzhanwangzhi",
    isUrl: false,
    auth: 'vmsDataMng',
    routes: [{
        path: "/vmsDataMng/pictureList",
        name: "图片库",
        exact: true,
        auth: 'vmsDataMng.image',
        component: asyncComponents(() => import("./pictureList"))
    },
    {
        path: "/vmsDataMng/videoList",
        name: "视频库",
        exact: true,
        auth: 'vmsDataMng.video',
        component: asyncComponents(() => import("./videoList"))
    },
    {
        path: "/vmsDataMng/audioList",
        name: "音频库",
        exact: true,
        auth: 'vmsDataMng.audio',
        component: asyncComponents(() => import("./audioList"))
    }]
};
app.registerRoutes(routes)
if (process.env.NODE_ENV !== 'production') {
    app.renderApp()
}

export default routes;