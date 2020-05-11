import React, { Component } from "react";
import { Modal, Input, message, Tree } from "antd";
const { DirectoryTree, TreeNode } = Tree;

import styles from "./SectionModal.scss";

import { getContentListType } from "@/services/contentlist";

export default class SectionModal extends Component {
    state = {
        visible: false,
        selectedKeys: [],
        sectionList: []
    };
    componentDidMount() {
        this.httpGetChannels();
    }
    httpGetChannels = async () => {
        let res = await getContentListType();
        if (res.success) {
            this.setState({
                sectionList: res.body
            });
        }
    };
    handleShowVisible = () => {
        this.setState({
            visible: true
        });
    };
    handleOk = () => {
        let { selectedKeys } = this.state;
        if (selectedKeys.length == 0) {
            return message.warning("请选择一个内容列表");
        }
        let { onSelect } = this.props;
        onSelect && onSelect(selectedKeys);
        this.setState({
            visible: false,
            selectedKeys: []
        });
    };
    handleCancel = () => {
        this.setState({
            visible: false,
            selectedKeys: []
        });
    };
    onSelect = (selectedKeys, info) => {
        this.setState({
            selectedKeys
        });
    };
    renderTreeNode = data => {
        return data.map(d => {
            return (
                <TreeNode title={d.name} key={'parent' + d.id} selectable={false}>
                    {d.child && d.child.length > 0 && this.renderChlidNode(d.child)}
                </TreeNode>
            );
        });
    };
    renderChlidNode = data => {
        return data.map(d => {
            return d.classify == 0 ? <TreeNode title={d.name} key={d.id} isLeaf /> : null;
        });
    };
    render() {
        let { children } = this.props;
        let { visible, sectionList, selectedKeys } = this.state;
        return [
            React.cloneElement(children, {
                key: "children",
                onClick: this.handleShowVisible
            }),
            <Modal
                key="modal"
                title="请选择推送的内容列表"
                visible={visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                okText={"确认"}
                cancelText={"取消"}
            >
                <div className={styles.content}>
                    <DirectoryTree defaultExpandAll selectedKeys={selectedKeys} onSelect={this.onSelect}>
                        {this.renderTreeNode(sectionList)}
                    </DirectoryTree>
                </div>
            </Modal>
        ];
    }
}
