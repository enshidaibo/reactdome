import React, { Component } from "react";
import { Input, Modal } from "antd";
import styles from "./AddType.scss";

import { httpContentListTypeAdd } from "@/services/contentlist";

export default class AddType extends Component {
    state = {
        visible: false,
        confirmLoading: false,
        name: "ceshi"
    };
    handleChange = e => {
        this.setState({ name: e.target.value });
    };
    handleAdd = async () => {
        this.setState({
            visible: true
        });
    };
    handleCancel = () => {
        this.setState({
            visible: false
        });
    };
    handleOk = async () => {
        this.setState({
            confirmLoading: true
        });
        let { name } = this.state;
        let res = await httpContentListTypeAdd({ name });
        if (res.success) {
            this.setState({
                visible: false,
                confirmLoading: false
            });
            this.props.getTypeTreeData();
        } else {
            this.setState({
                confirmLoading: false
            });
        }
    };
    render() {
        let { visible, confirmLoading } = this.state;
        return (
            <div className={styles.title}>
                <span>内容列表</span>
                <span className={`iconfont icon-add ${styles.icon}`} title="新增分类" onClick={this.handleAdd} />
                <Modal
                    title="新增分类"
                    visible={visible}
                    onOk={this.handleOk}
                    confirmLoading={confirmLoading}
                    onCancel={this.handleCancel}
                    cancelText="取消"
                    okText="确定"
                >
                    <Input placeholder="请输入分类名称" onChange={this.handleChange} />
                </Modal>
            </div>
        );
    }
}
