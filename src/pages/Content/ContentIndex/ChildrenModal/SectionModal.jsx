import React, { useEffect } from "react";
import { Modal, Select, message, Tree } from "antd";
import useData from '@/hooks/useData'

const { Option } = Select;
const { TreeNode, DirectoryTree } = Tree;
import styles from "./SectionModal.scss";
import { getChildrenSites, getChildrenChannel, postChildrenPush } from "@/services/content";

const SectionModal = ({ children, ids }) => {
    const [data, setData] = useData({
        visible: false,
        selectedKeys: [],
        childSites: [],
        childChannels: [],
        selectedChannel: {},
        siteId: undefined,
    })
    let { visible, childSites, siteId, selectedKeys, childChannels, selectedChannel } = data;
    useEffect(() => {
        const httpGetChannels = async () => {
            let res = await getChildrenSites({ root: localStorages.getItem("_site_id_param") });
            if (res.success) {
                if (res.body.length > 0) {
                    siteId = res.body[0].id
                }
                setData({
                    childSites: res.body,
                    siteId
                });
            }
        };
        httpGetChannels()
    }, [])
    useEffect(() => {
        if (!siteId) {
            return
        }
        const getChannel = async () => {
            let res = await getChildrenChannel({ siteId, isOutSite: true })
            // let res = await getChildrenChannel({ siteId })
            if (res.success) {
                setData({
                    childChannels: res.body
                })
            }
        }
        getChannel()
    }, [siteId])
    const handleShowVisible = () => setData({ visible: true })
    const handleOk = async () => {
        if (selectedKeys.length == 0) {
            return message.warning("请选择一个栏目");
        }
        let res = await postChildrenPush({ contentIds: ids.join(","), channelIds: selectedKeys.join(",") })
        if (res.success) {
            message.info("推送成功")
            setData({
                visible: false,
                selectedKeys: []
            });
        }
    };
    const handleCancel = () => {
        setData({
            visible: false,
            selectedKeys: []
        });
    };
    const handleSelect = (selectedKeys, info) => {
        let { selectedNodes } = info
        let selectNode = selectedNodes.map(d => {
            let { title } = d.props
            let eventKey = d.props.eventKey || d.key
            return { title, eventKey }
        })
        let site = childSites.find(d => {
            return d.id == siteId
        })
        selectedChannel[siteId] = {
            ...site,
            selectNode
        }
        setData({ selectedKeys, selectedChannel });
    }
    const handleChangeSite = (siteId, e) => {
        setData({ siteId })
    }
    const handleClose = (siteId, eventKey) => {
        selectedKeys = selectedKeys.filter(d => {
            return d !== eventKey
        })
        let selectedSite = selectedChannel[siteId]
        selectedSite.selectNode = selectedSite.selectNode.filter(d => {
            return d.eventKey != eventKey
        })
        selectedChannel[siteId] = selectedSite
        setData({ selectedKeys, selectedChannel });
    }
    const renderTreeNode = (data, level = 0) => {
        return data.map(d => {
            return (
                <TreeNode title={d.name} key={d.id} isLeaf={!d.hasChild} disabled={d.hasChild} >
                    {d.hasChild && renderTreeNode(d.child, level + 1)}
                </TreeNode>
            );
        });
    };
    let seleckeds = Object.keys(selectedChannel)
    return [
        React.cloneElement(children, {
            key: "children",
            onClick: handleShowVisible
        }),
        <Modal
            key="modal"
            title="请选择推送的子站点栏目"
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            okText={"确认"}
            cancelText={"取消"}
        >
            <div className={styles.content}>
                <div className={styles.seleckedList}>
                    <span>当前选中:</span>
                    {seleckeds.map(d => {
                        let nodes = selectedChannel[d]
                        return nodes.selectNode.map(node => {
                            return <span
                                className={styles.tag}
                                key={node.eventKey}
                            >
                                <span>{node.title}({nodes.name})</span>
                                <span className={styles.iclose} onClick={() => handleClose(nodes.id, node.eventKey)}>×</span>
                            </span>
                        })
                    })}
                </div>
                <Select
                    value={siteId}
                    showSearch
                    filterOption={(input, option) =>
                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                    style={{ width: "100%" }}
                    placeholder="选择站点"
                    onChange={handleChangeSite}>
                    {childSites.map(d => {
                        return <Option key={d.id} value={d.id}>{d.name}</Option>
                    })}
                </Select>
                <div className={styles.tree}>
                    {childChannels.length == 0
                        ? <div className={styles.nodata}>暂无可推送栏目</div>
                        : <DirectoryTree multiple defaultExpandAll selectedKeys={selectedKeys} onSelect={handleSelect}>
                            {renderTreeNode(childChannels)}
                        </DirectoryTree>}
                </div>
            </div>
        </Modal>
    ];
}

export default SectionModal