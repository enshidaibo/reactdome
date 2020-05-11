import React, { Component } from "react";
import { TreeSelect, message } from "antd";

const TreeNode = TreeSelect.TreeNode;
import { getChannelTree } from "@/services/channel";
import styles from "../Edit.scss";
export default class SelectChannel extends Component {
    state = {
        channel: []
    };
    componentDidMount() {
        this.getTree();
    }
    /**
     * 获取栏目数据
     */
    getTree = async () => {
        let res = await getChannelTree({ singleModel: false });
        if (res.success) {
            let channel = this.iniChannelData(res.body);
            this.setState({
                channel
            });
        }
    };
    iniChannelData = data => {
        data = data.map(d => {
            let rt = {
                title: d.name,
                value: d.id,
                key: d.id
            };
            if (d.hasChild) {
                rt.children = this.iniChannelData(d.child);
            }
            return rt;
        });
        return data;
    };
    initContentTree = data => {
        return data.map(d => {
            return (
                <TreeNode value={d.value} title={d.title} key={d.value} disabled={d.children}>
                    {d.children && this.initContentTree(d.children)}
                </TreeNode>
            );
        });
    };
    handlefilterTreeNode = (value, item) => {
        if (item.props.title.indexOf(value) > -1) {
            return true
        }
        return false
    }
    render() {
        let { name, value, onChange } = this.props;
        let { channel } = this.state;
        return (
            <div className={styles.time}>
                <span className={styles.t}>选择栏目</span>
                {channel.length > 0 && (
                    <TreeSelect
                        className={styles.ls}
                        multiple
                        value={value}
                        placeholder="请选择栏目"
                        filterTreeNode={this.handlefilterTreeNode}
                        dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
                        onChange={(value) => {
                            onChange(name, value)
                        }}
                    >
                        {this.initContentTree(channel)}
                    </TreeSelect>
                )}
            </div>
        );
    }
}
