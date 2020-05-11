import React from "react";
import { Switch, Route, Redirect, Link } from "react-router-dom";

const noMatch = () => <div>该页面不存在或者你无权访问该页面！</div>;

export default function renderRoutes(routes, extraProps = {}, switchProps = {}) {
    if (!routes) {
        return null;
    }
    routes = routes.concat([
        {
            path: "*",
            name: "404页面",
            component: extraProps.noMatch || noMatch
        }
    ]);
    return (
        <Switch {...switchProps}>
            {routes.map((route, i) => {
                if (route.redirect) {
                    return (
                        <Redirect
                            key={route.key || i}
                            from={route.path}
                            to={route.redirect}
                            exact={route.exact}
                            strict={route.strict}
                        />
                    );
                }
                return (
                    <Route
                        key={route.key || i}
                        path={route.path}
                        exact={route.exact}
                        strict={route.strict}
                        render={props => {
                            const childRoutes = renderRoutes(route.routes, {}, { location: props.location });
                            if (route.component) {
                                return (
                                    <route.component {...props} {...extraProps} route={route}>
                                        {childRoutes}
                                    </route.component>
                                );
                            } else {
                                return childRoutes;
                            }
                        }}
                    />
                );
            })}
        </Switch>
    );
}
