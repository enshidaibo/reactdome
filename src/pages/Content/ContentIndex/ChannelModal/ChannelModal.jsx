import React from "react";
import { Modal, Tree } from "antd";
const { DirectoryTree, TreeNode } = Tree;
import useData from '@/hooks/useData';
import styles from "./ChannelModal.scss";

const ChannelModal = ({ onSelect, children, channel }) => {
    const [state, setState] = useData({ visible: false, selectedKeys: [] })
    const { visible, selectedKeys } = state
    const handleShowVisible = () => setState({ visible: true })
    const handleOk = () => {
        onSelect && onSelect(selectedKeys);
        setState({ visible: false, selectedKeys: [] })
    };
    const handleCancel = () => setState({ visible: false, selectedKeys: [] })
    const handleSelect = (selectedKeys) => setState({ selectedKeys })
    const renderTreeNode = (data, level = 0) => {
        return data.map(d => {
            return (
                <TreeNode title={d.name} key={d.id} selectable={!d.hasChild} isLeaf={!d.hasChild}>
                    {d.hasChild && renderTreeNode(d.child, level + 1)}
                </TreeNode>
            );
        });
    };
    return [
        React.cloneElement(children, {
            key: "children",
            onClick: handleShowVisible
        }),
        visible && (
            <Modal
                key="modal"
                title="请选择栏目"
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
                okText={"确认"}
                cancelText={"取消"}
            >
                <div className={styles.content}>
                    <DirectoryTree onSelect={handleSelect} >
                        {renderTreeNode(channel)}
                    </DirectoryTree>
                </div>
            </Modal>
        )
    ];
}

export default ChannelModal