import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Icon, Button, Radio } from 'antd';

import styles from './components.scss';

const { SubMenu } = Menu;
const ButtonGroup = Button.Group;

class MenuBar extends Component {

    constructor (props) {
        super(props);
    }

    handleChangeRadio = (e) => {
        this.props.onChange && this.props.onChange(e);
    }

    render () {
        return (
            <div className={styles.menuLeft}>
                <div className={styles.menuHd}>
                    <Radio.Group 
                        defaultValue={this.props.radio} 
                        buttonStyle="solid"
                        style={{userSelect: "none"}}
                        onChange={(e) => this.handleChangeRadio(e)}
                    >
                        <Radio.Button value="android" checked={this.props.radio === "android" ? true : false}>安卓</Radio.Button>
                        <Radio.Button value="ios" checked={this.props.radio === "ios" ? true : false}>苹果</Radio.Button>
                    </Radio.Group>
                </div>
                <Menu
                    className={styles.menu}
                    defaultSelectedKeys={[this.props.selectedKeys]}
                    defaultOpenKeys={[this.props.openKeys]}
                    mode="inline"
                    theme="light"
                >
                    <Menu.Item key="mn1"><Link to="/statistics"><Icon type="appstore" /><span >数据概览</span></Link></Menu.Item>
                    <Menu.Item key="mn2"><Link to="/statistics/terminal"><Icon type="appstore" /><span>终端设备</span></Link></Menu.Item>
                    <SubMenu key="mn3" title={<span><Icon type="appstore" /><span>用户行为</span></span>}>
                        <Menu.Item key="sb1"><Link to="/statistics/au"><span>活跃度</span></Link></Menu.Item>
                        <Menu.Item key="sb2"><Link to="/statistics/visit"><span>访问统计</span></Link></Menu.Item>
                        <Menu.Item key="sb3"><Link to="/statistics/frequency"><span>使用频率</span></Link></Menu.Item>
                        <Menu.Item key="sb4"><Link to="/statistics/retention"><span>留存率</span></Link></Menu.Item>
                    </SubMenu>
                    <SubMenu key="mn4" title={<span><Icon type="appstore" /><span>开发支持</span></span>}>
                        <Menu.Item key="sb5"><Link to="/statistics/error"><span>错误信息</span></Link></Menu.Item>
                        <Menu.Item key="sb6"><Link to="/statistics/os"><span>系统信息</span></Link></Menu.Item>
                        <Menu.Item key="sb7"><Link to="/statistics/crash"><span>crash</span></Link></Menu.Item>
                    </SubMenu>
                </Menu>
            </div>
        );
    }
}

export default MenuBar;