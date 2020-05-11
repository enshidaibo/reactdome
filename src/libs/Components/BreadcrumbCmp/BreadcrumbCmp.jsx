import React, { Component } from "react";

import { Link, withRouter } from "react-router-dom";
import { Breadcrumb, Icon } from "antd";
const { Item } = Breadcrumb;

const BreadcrumbCmp = ({ match, location }) => {
    return (
        <Breadcrumb separator={<Icon type="right" />} style={{ padding: "5px 15px", minHeight: "32px" }}>
            <Item key="home">
                <Link to="/">
                    <Icon type="home" />
                </Link>
            </Item>
            {globalBranchRoutes.map((d, i) => {
                if (d.route.show == false) {
                    return null;
                }
                if (d.route.isUrl == true) {
                    return <Item key={d.match.url}>
                        <Link to={{ pathname: d.match.url }}>{d.route.name}</Link>
                    </Item>
                }
                return (
                    <Item key={d.match.url}>
                        {d.route.isUrl == false || d.match.url == location.pathname ? (
                            <span>{d.route.name}</span>
                        ) : (
                                <Link to={{ pathname: d.match.url }}>{d.route.name}</Link>
                            )}
                    </Item>
                );
            })}
        </Breadcrumb>
    );
};
export default withRouter(BreadcrumbCmp);
