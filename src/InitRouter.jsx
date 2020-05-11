import React, { useEffect } from "react";
import { BrowserRouter, HashRouter, Switch, Redirect } from "react-router-dom";
import { matchRoutes, renderRoutes } from "react-router-config";
import { Spin } from 'antd';
import renderRoute from "@/utils/react-router-render";
import InitUserInfo from "@/Libs/Hoc/InitUserInfo";

const PendingNavDataLoader = ({ children, location, sessionKey }) => {
    globalBranchRoutes = matchRoutes(app.routes, location.pathname);
    globalBranchMain = globalBranchRoutes[globalBranchRoutes.length - 1];
    if (!sessionKey && globalBranchMain.route.auth) {
        return <Redirect replace to={{ pathname: "/login", state: { ...location } }} />;
    }
    return children;
};

const RootRouter = () => {
    const locale = app.globalRedux.getContext()
    const { sessionKey } = locale.context
    return (
        <HashRouter basename={AppConfig.homeUrl}>
            <Switch>
                <PendingNavDataLoader sessionKey={sessionKey}>{renderRoute(app.routes)}</PendingNavDataLoader>
            </Switch>
        </HashRouter>
    )
};

const InitRouter = () => {
    const [data, getData] = InitUserInfo()
    useEffect(() => { getData() }, [])
    if (!window.dispatch) {
        const locale = app.globalRedux.getContext()
        window.dispatch = locale.dispatch
    }
    if (data.loading) {
        return <Spin tip="页面初始化中..."><div style={{ height: '400px' }}></div></Spin>
    }
    return <RootRouter />
}

export default InitRouter