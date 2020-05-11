"use strict";
import React from "react";
import ReactDOM from 'react-dom';
import { message, LocaleProvider } from "antd";
import zh_CN from 'antd/lib/locale-provider/zh_CN';
message.config({
    top: 200,
    duration: 3,
    // maxCount: 3,
});

import "./style/app.less";
import Immutable from "seamless-immutable";
import { baseRoutes, inlineRouters } from '@/pages/routes'

Object.assign(window, {
    Immutable,
    $arr: Immutable([]),
    $obj: Immutable({}),
    localStorages: localStorage,
    globalBranchRoutes: [],
    globalBranchMain: {},
    sitesConfig: {},
    rootDom: "root",
});
let app = window.app = window.app || {};
app.inlineRouters = inlineRouters
app.asyncRouters = []
import Layout from "./pages/A_Layout/Layout";

const initRoutes = (routes = []) => {
    app.routes = [baseRoutes,
        {
            component: Layout,
            path: "/",
            name: "首页",
            show: false,
            auth: 'dashboard.home',
            routes: routes
        }
    ];
}

initRoutes(inlineRouters)

const registerRoutes = (router) => {
    if (!router) {
        return
    }
    app.asyncRouters = app.asyncRouters.concat(router)
    initRoutes([].concat(app.inlineRouters, app.asyncRouters))
}

import InitRouter from './InitRouter'
const App = () => {
    let init = localStorage.init ? JSON.parse(localStorage.init) : {};
    let initValue = {
        init,
        ...AppConfig.initValue,
        onLine: navigator.onLine
    };
    return <app.globalRedux.localRudexProvider value={initValue}>
        <LocaleProvider locale={zh_CN}><InitRouter /></LocaleProvider>
    </app.globalRedux.localRudexProvider>
};

const renderApp = () => {
    // let asyncModules = AppConfig.asyncModules || [];
    // const promiseAll = asyncModules.map(d => {
    //     return app.loadScripts(d.src)
    // })
    // Promise.all(promiseAll).then(function (values) {
    //     console.log(values)
    //     ReactDOM.render(<App />, document.getElementById('root'));
    // });
    ReactDOM.render(<App />, document.getElementById(rootDom));
}

window.app = Object.assign(app || {}, {
    registerRoutes,
    renderApp,
});
if (AppConfig.env == 'main') {
    renderApp()
}

