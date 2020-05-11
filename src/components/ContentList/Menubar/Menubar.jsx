import React, { Component } from "react";

import { Menu, Input } from "antd";
const { SubMenu, Item } = Menu;

import { LeftContent } from '@/pages/A_Layout/ContentLayout';
import getTypeTreeData from "../dispatch/getTypeTreeData";

import AddType from "./AddType";
import Header from "./Header";
import List from "./List";

import styles from "./Menubar.scss";
const menuItem = (d, level = 0) => {
    if (d.sections) {
        return subMenuItem(d, level);
    }
    return (
        <Item key={d.id}>
            <List data={d} />
        </Item>
    );
};

const subMenuItem = (d, level = 0) => {
    return (
        <SubMenu key={d.id} title={<Header data={d} />}>
            {d.sections.map(d => {
                level++;
                return menuItem(d, level);
            })}
        </SubMenu>
    );
};

const contextConsumers = app.globalRedux.localRudexConsumers
@contextConsumers(state => ({
    contentlist: state.contentlist || $arr,
    flattens: state.flattens || $arr
}))
export default class Menubar extends Component {
    state = {
        searchValue: "",
        flattenChannel: [],
        openKeys: [],
        contentlist: []
    };
    componentDidMount() {
        this.getTypeTreeData();
    }
    getTypeTreeData = () => {
        getTypeTreeData(this.props.dispatch);
    };
    /**
     * 栏目展开
     */
    handleOpenChange = openKeys => {
        this.setState({
            openKeys
        });
    };
    /**
     * 点击栏目
     */
    handleItemClick = e => {
        let { id } = this.props.curItem;
        if (id == e.key) {
            return;
        }
        let { flattens } = this.props;
        let curItem = flattens.find(d => {
            return d.id == e.key;
        });
        this.props.onChangeState(curItem);
    };
    handleChange = e => {
        this.setState({
            searchValue: e.target.value
        });
    };
    render() {
        let { contentlist, curItem, flattens } = this.props;
        let channel = contentlist
        let { searchValue, openKeys } = this.state;
        if (searchValue.length > 0) {
            channel = flattens.filter(d => {
                return d.name.indexOf(searchValue) > -1;
            });
        }
        return (
            <LeftContent>
                <AddType getTypeTreeData={this.getTypeTreeData} />
                <div className={styles.search}>
                    <Input placeholder="搜索" onChange={this.handleChange} />
                </div>
                <Menu
                    className={styles.menu}
                    mode="inline"
                    openKeys={openKeys}
                    selectedKeys={[String(curItem.id)]}
                    onOpenChange={this.handleOpenChange}
                    onClick={this.handleItemClick}
                >
                    {channel.map(d => {
                        return menuItem(d);
                    })}
                </Menu>
            </LeftContent>
        );
    }
}
