import React, { Component } from "react";
import { Menu } from "antd";
const { Item } = Menu;

import styles from "./Menubar.scss";

const menuList=[
    {
        key:"hot",
        title:"热点"
    },
    {
        key:"new",
        title:"最新"
    },
    {
        key:"share",
        title:"平台共享"
    }
];
export default class Menubar extends Component {

    constructor(props) {
        super(props);
        this.state={
            selectIndex:props.selectKey
        };
    }

    /*
    * 菜单切换
    * */
    handleItemClick=(e)=>{
        this.setState({
            selectIndex: e.key
        });
      this.props.SelectChange&&this.props.SelectChange(e.key);
    };

    render(){
        let {selectIndex}=this.state;
        return(
            <div className={styles.menubar}>
                <span className={styles.title}>云稿库</span>
                <Menu mode="inline" className={styles.menu}
                      selectedKeys={[selectIndex]}
                      onClick={this.handleItemClick}>
                    {menuList.length<=0?"":
                     menuList.map(menu=>{
                         return <Item key={menu.key}>
                             {menu.title}
                         </Item>
                     })
                    }
                </Menu>
            </div>
        )
    }
}