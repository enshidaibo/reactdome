import React, { Component } from "react";
import { Menu, Icon, Input } from "antd";
const { SubMenu, Item } = Menu;
import styles from "./Menubar.scss";
const menuItem = (d, level = 0) => {
    if (d.child && !d.isParent) {
        return subMenuItem(d, level);
    }
    return (
        <Item key={d.id}>
            <div to={d.path}>
                <Icon type={`mail`} />
                <span>{d.name}</span>
            </div>
        </Item>
    );
};

const subMenuItem = (d, level = 0) => {
    return (
        <SubMenu
            key={d.id}
            title={
                <span>
                    <Icon type={`folder`} />
                    <span>{d.name}</span>
                </span>
            }
        >
            {d.child.map(d => {
                level++;
                return menuItem(d, level);
            })}
        </SubMenu>
    );
};

export default class Menubar extends Component {
    state = {
        searchValue: ""
    };
    handleChange = e => {
        console.log(e);
        this.setState({
            searchValue: e.target.value
        });
    };
    render() {
        let { channel, flattenChannel, ...props } = this.props;
        let { searchValue } = this.state;
        if (searchValue.length > 0) {
            channel = flattenChannel.filter(d => {
                return d.name.indexOf(searchValue) > -1;
            });
        }
        return (
            <div className={styles.menubar}>
                <div className={styles.search}>
                    <Input placeholder="搜索栏目" onChange={this.handleChange} />
                </div>
                <Menu className={styles.menu} mode="inline" {...props}>
                    <Item key={0}>
                        <Icon type={`mail`} />
                        <span>全部</span>
                    </Item>
                    {channel.map(d => {
                        return menuItem(d);
                    })}
                </Menu>
            </div>
        );
    }
}
