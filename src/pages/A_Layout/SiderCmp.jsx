import React, { Component } from "react";
import pathToRegexp from "path-to-regexp";
import Links from "@/Libs/Extended/Link";
import { Layout, Menu, Icon } from "antd";
const { Sider } = Layout;
const { SubMenu, Item } = Menu;

import styles from "./Sider.scss";
const contextConsumers = app.globalRedux.localRudexConsumers

const IconFont = ({ iconCls }) => {
    return (
        <i className="anticon">
            <i className={`iconfont ${iconCls} ${styles.iconfont}`} />
        </i>
    );
};

const menuItem = (d, menufold, level = 0) => {
    if (d.hideInMenu) {
        return null;
    }
    if (d.routes && !d.isParent && !d.hideChildrenInMenu) {
        return subMenuItem(d, menufold, level);
    }
    return (
        <Item key={d.path}>
            <Links to={d.path}>
                {d.icon && <Icon type={d.icon} />}
                {d.iconCls && <IconFont iconCls={d.iconCls} />}
                <span>{d.name}</span>
            </Links>
        </Item>
    );
};

const subMenuItem = (d, menufold, level) => {
    return (
        <SubMenu
            key={d.path}
            title={
                <span>
                    {d.icon && <Icon type={d.icon} />}
                    {d.iconCls && <IconFont iconCls={d.iconCls} />}
                    <span>{d.name}</span>
                </span>
            }
        >
            {d.routes.map(d => {
                return menuItem(d, menufold, level + 1);
            })}
        </SubMenu>
    );
};

@contextConsumers(state => ({
    menufold: !!state.menufold,
    menus: state.menus || $arr,
    flattenMenus: state.flattenMenus || $arr
}))
export default class SiderCmp extends Component {
    getOpenKeys = (pathname, flattenMenus) => {
        if (this.init) {
            return {};
        }
        this.init = true;
        let flatts = flattenMenus.find(d => {
            let keys = [];
            let re = pathToRegexp(d.path, keys);
            return re.exec(pathname);
        });
        let res = {};
        if (!flatts) {
            return res;
        }
        res.defaultOpenKeys = this.getDefaultOpenKeys(flatts, flattenMenus);
        res.defaultSelectedKeys = res.defaultOpenKeys.concat([flatts.path]);
        return res;
    };
    getDefaultOpenKeys = (menu, flattenMenus) => {
        let res = [];
        if (menu.parentPath) {
            res.push(menu.parentPath);
            let parent = flattenMenus.find(d => {
                return d.path == menu.parentPath;
            });
            let parentKey = this.getDefaultOpenKeys(parent, flattenMenus);
            res = res.concat(parentKey);
        }
        return res;
    };
    getd = () => {
        let defaultOpenKeys = globalBranchRoutes
            .filter(d => {
                return d.route.show !== false;
            })
            .reduce((arr, d) => {
                if (d.route.parentPath) {
                    return arr.concat([d.match.path], d.route.parentPath);
                }
                return arr.concat([d.match.path]);
            }, []);
        return defaultOpenKeys;
    };
    render() {
        let { location, menufold, menus, flattenMenus, route } = this.props;
        // let opts = this.getOpenKeys(location.pathname, flattenMenus);
        let defaultOpenKeys = this.getd();
        return (
            <Sider
                className={styles.sider}
                width={220}
                trigger={null}
                collapsible
                collapsed={menufold}
                collapsedWidth={50}
            >
                <Menu
                    mode="inline"
                    defaultOpenKeys={defaultOpenKeys}
                    // openKeys={defaultOpenKeys}
                    defaultSelectedKeys={defaultOpenKeys}
                    // selectedKeys={defaultOpenKeys}
                    className={styles.menu}
                >
                    {menus.map(d => {
                        return menuItem(d, menufold);
                    })}
                </Menu>
            </Sider>
        );
    }
}
