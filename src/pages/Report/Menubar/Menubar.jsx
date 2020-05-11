import React, { Component } from "react";
import { Menu } from "antd";
const { Item } = Menu;
import Add from "./Add";
import List from "./MenuList";
import styles from "./Menubar.scss";

export default class Menubar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuList: [],
            selectIndex: "0"
        };
    }
    componentDidMount() {
        this.getAllColumn();
    }
    /*
    * 获取所有爆料栏目
    * */
    getAllColumn = async () => {
        let { menuList } = this.state;
        let res = await app.yssjfetch.post("admin/web/column/list", { yssjId: localStorages._site_id_param });
        if (res.code == "200") {
            menuList = res.body;
        }
        menuList.push({ id: "回收站", columnName: "回收站" });
        menuList.push({ id: "黑名单", columnName: "黑名单" });
        this.setState({ menuList: menuList });
    };
    /*
    * 菜单切换
    * */
    handleItemClick = e => {
        this.setState({
            selectIndex: e.key
        });
        this.props.MenuIndex(e.key);
    };

    render() {
        let { menuList, selectIndex } = this.state;
        return (
            <div className={styles.menubar}>
                <Add callBackData={this.getAllColumn} />
                <Menu mode="inline" className={styles.menu} selectedKeys={[selectIndex]} onClick={this.handleItemClick}>
                    {menuList.length <= 0
                        ? ""
                        : menuList.map(menu => {
                            return (
                                <Item key={menu.id}>
                                    <List menuData={menu} callBack={this.getAllColumn} />
                                </Item>
                            );
                        })}
                </Menu>
            </div>
        );
    }
}
