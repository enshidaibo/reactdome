import React from "react";
import { Layout } from "antd";
const { Content } = Layout;
import Header from "./Header";
import SiderCmp from "./SiderCmp";

import styles from "./Layout.scss";
const BaseLayout = ({ children, location, route }) => {
    return (
        <Layout className={styles.layout}>
            <Header location={location} />
            <Content className={styles.content}>
                <Layout className={styles.layout}>
                    <SiderCmp location={location} route={route} />
                    <Content className={styles.inlineContent}>{children}</Content>
                </Layout>
            </Content>
        </Layout>
    );
};
export default BaseLayout;
