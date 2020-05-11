import React, { useState } from "react";
import { Menu, Icon, Input } from "antd";
const { SubMenu, Item } = Menu;
import { LeftContent } from '@/pages/A_Layout/ContentLayout';
import { fetchList$ } from '../../stream';

import styles from "./Menubar.scss";
const menuItem = (d, level = 0, handleItemClick) => {
    if (d.child && !d.isParent) {
        return subMenuItem(d, level, handleItemClick);
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

const subMenuItem = (d, level = 0, handleItemClick) => {
    return (
        <SubMenu
            key={d.id}
            onTitleClick={handleItemClick}
            title={
                <span>
                    <Icon type={`folder`} />
                    <span>{d.name}</span>
                </span>
            }
        >
            {d.child.map(d => {
                level++;
                return menuItem(d, level, handleItemClick);
            })}
        </SubMenu>
    );
};

const Menubar = ({ channel, flattenChannel, query, openKeys, ...props }) => {
    const [searchValue, setSearchValue] = useState('')
    if (searchValue.length > 0) {
        channel = flattenChannel.filter(d => {
            return d.name.indexOf(searchValue) > -1;
        });
    }
    const handleItemClick = (e) => {
        let { cid } = query;
        if (cid == e.key) {
            return;
        }
        fetchList$.next({
            cid: e.key,
            pageNo: 1,
            pageSize: 10,
            queryTopLevel: false, //置顶
            queryRecommend: false, //推荐
            queryShare: 0, //共享
            queryStatus: "checked", //状态
            queryOrderBy: 2,
            queryTitle: "", //搜索标题
            queryInputUsername: "" //搜索发布人
        });
    }
    return (
        <LeftContent>
            <div className={styles.search}>
                <Input placeholder="搜索栏目" onChange={e => setSearchValue(e.target.value)} />
            </div>
            <Menu
                className={styles.menu}
                mode="inline"
                openKeys={JSON.parse(JSON.stringify(openKeys))}
                {...props}
                // onOpenChange={e => {
                //     console.log(e);
                // }}
                // onSelect={e => {
                //     console.log(e);
                // }}
                onClick={handleItemClick}>
                <Item key={-1}>
                    <Icon type={`mail`} />
                    <span>我的</span>
                </Item>
                <Item key={0}>
                    <Icon type={`mail`} />
                    <span>全部</span>
                </Item>
                {channel.map(d => {
                    return menuItem(d, 0, handleItemClick);
                })}
            </Menu>
        </LeftContent>
    );
}

export default Menubar