import React, { useState } from "react";
import { Layout, Menu, Icon, Modal, Table } from "antd";
const { Item } = Menu;
const { Header } = Layout;
import logo from "./images/logo.png";
import userAvatar from "./images/userAvatar.png";
import styles from "./Header.scss";
import { logout } from "@/services";

const HeaderCmp = ({ location }) => {
    const locale = app.globalRedux.getContext()
    let { menufold, userInfo = {}, curWeb = {} } = locale.context;
    userInfo = userInfo || {}
    curWeb = curWeb || {}
    const handleGoout = async () => {
        let res = await logout();
        if (res.success) {
            memoryStorage.removeItem("sessionKey");
            memoryStorage.removeItem("token");
            locale.dispatch.set({
                sessionKey: null,
                userInfo: null,
                curWeb: null,
                menus: null,
                flattenMenus: null
            });
        }
    };
    const handleMenuFold = () => {
        locale.dispatch.set({ menufold: !menufold });
    };
    return (
        <Header className={styles.header}>
            <div className={styles.logos}>
                <img src={logo} alt="logo" className={styles.logo} />
                <Icon
                    type={menufold ? "menu-unfold" : "menu-fold"}
                    className={styles.menufold}
                    onClick={handleMenuFold}
                />
            </div>
            <div>
                <Menu mode="horizontal" className={styles.topmenu}>
                    <Item key="userInfo">
                        <span className={styles.userInfo}>
                            <img className={styles.userAvatar} src={userAvatar} alt="" />
                            <span className={styles.userName}>{userInfo.realname}</span>
                        </span>
                    </Item>
                    <Item onClick={handleGoout}>
                        <i className={`iconfont icon-out-copy`} title={`退出`} />
                    </Item>
                    <Item>
                        <WebToggle curWeb={curWeb} sites={userInfo.sites} />
                    </Item>
                </Menu>
            </div>
        </Header>
    )
}

export default HeaderCmp

const WebToggle = ({ curWeb, sites = $arr }) => {
    const [visible, setVisible] = useState(false)
    const setSiteId = (val) => {
        localStorages._site_id_param = val;
        localStorages.removeItem('contentcid')
        // window.location.reload()
        window.location.href = AppConfig.homeUrl || "/"; //重新处理请求
    }
    const columns = [
        {
            title: "站点ID",
            dataIndex: "id",
            key: "id"
        },
        {
            title: "站点名称",
            dataIndex: "name",
            key: "name"
        },
        {
            title: "操作",
            key: "action",
            render: (text, record) =>
                curWeb.id == record.id
                    ? <span className={styles.webToggle}>当前站点</span>
                    : <span className={styles.webToggle} onClick={() => setSiteId(record.id)}>切换</span>

        }
    ];
    return (
        <div>
            <div onClick={() => setVisible(true)} className={styles.webs}>
                {curWeb.name}
            </div>
            <Modal
                title="站点选择"
                // cancelText={`取消`}
                // okText={`确定`}
                footer={null}
                visible={visible}
                onOk={() => setVisible(false)}
                onCancel={() => setVisible(false)}
            >
                <Table dataSource={sites} columns={columns} size={`small`} />
            </Modal>
        </div>
    );
}