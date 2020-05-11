import React, { Component } from "react";
import { Switch, Select, TreeSelect, Button } from "antd";
const Option = Select.Option;
const TreeNode = TreeSelect.TreeNode;
import modelTypes from "@/Libs/config/modelTypes";
import { getShareSiteData, getShareChannelData } from "@/services/contentlist";
import styles from "./Step1.scss";
export default class Step2 extends Component {
    state = {
        channelIds: [],
        sites: []
    };
    componentDidMount() {
        this.getShareSiteData();
    }
    /**
     * 获取共享站点信息
     */
    getShareSiteData = async () => {
        let res = await getShareSiteData();
        if (res.success) {
            this.setState({
                sites: res.body
            });
            let { data } = this.props;
            this.getTreeData(data.channelSiteId);
        }
    };
    handleChangeShareSite = channelSiteId => {
        let { onChange } = this.props;
        onChange({ channelSiteId, channelStr: [] });
        this.getTreeData(channelSiteId);
    };
    /**
     * 获取栏目数据
     */
    getTreeData = async siteId => {
        let res = await getShareChannelData({ siteId });
        if (res.success) {
            this.setState({
                channelIds: res.body
            });
        }
    };
    initContentTree = data => {
        return data.map(d => {
            return (
                <TreeNode value={d.id} title={d.name} key={d.id}>
                    {d.hasChild && this.initContentTree(d.child)}
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
        let { onChangeStep, onChange, data, onSave } = this.props;
        let { channelIds, sites } = this.state;
        return (
            <div>
                <div className={styles.items}>
                    <div className={styles.label}>
                        <span className={styles.lbt}>排序</span>
                        <Select
                            className={styles.select}
                            value={data.order}
                            onChange={order => onChange({ order })}
                            placeholder="请选择排序"
                        >
                            <Option value={0}>最新</Option>
                            <Option value={1}>热门</Option>
                            <Option value={2}>评论</Option>
                        </Select>
                    </div>
                </div>
                <div className={styles.items}>
                    <div className={styles.label}>
                        <span className={styles.lbt}>选择站点</span>
                        <Select
                            className={styles.select}
                            style={{ width: "100%" }}
                            value={data.channelSiteId}
                            onChange={this.handleChangeShareSite}
                            placeholder="请选择站点"
                        >
                            {sites.map(d => (
                                <Option key={d.id} value={d.id}>
                                    {d.name}
                                </Option>
                            ))}
                        </Select>
                    </div>
                    <div className={styles.label}>
                        <span className={styles.lbt}>选择栏目</span>
                        {channelIds.length > 0 && (
                            <TreeSelect
                                className={styles.select}
                                placeholder="请选择栏目"
                                style={{ width: "100%" }}
                                multiple
                                value={data.channelStr}
                                treeDefaultExpandAll
                                filterTreeNode={this.handlefilterTreeNode}
                                dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
                                onChange={channelStr => onChange({ channelStr })}
                            >
                                {this.initContentTree(channelIds)}
                            </TreeSelect>
                        )}
                    </div>
                    <div className={styles.label}>
                        <span className={styles.lbt}>选择模型</span>
                        <Select
                            className={styles.select}
                            style={{ width: "100%" }}
                            mode="multiple"
                            value={data.models}
                            onChange={models => onChange({ models })}
                            placeholder="请选择模型"
                        >
                            {modelTypes.map(d => (
                                <Option key={d.key} value={d.key}>
                                    {d.title}
                                </Option>
                            ))}
                        </Select>
                    </div>
                    <div className={styles.label}>
                        <span className={styles.lbt}>关键词</span>
                        <Select
                            className={styles.select}
                            mode="tags"
                            value={data.keyWord}
                            style={{ width: "100%" }}
                            placeholder="请输入关键词"
                            tokenSeparators={[",", " "]}
                            onChange={keyWord => onChange({ keyWord })}
                        />
                    </div>
                    <div className={styles.label}>
                        <span className={styles.lbt}>时间范围</span>
                        <Select
                            className={styles.select}
                            value={data.releaseDateRange}
                            onChange={releaseDateRange => onChange({ releaseDateRange })}
                            placeholder="选择时间范围"
                        >
                            <Option value={0}>一天内</Option>
                            <Option value={1}>一周内</Option>
                            <Option value={2}>一个月内</Option>
                            <Option value={3}>一年内</Option>
                            <Option value={4}>不限</Option>
                        </Select>
                    </div>
                    <div className={styles.label}>
                        <span className={styles.lbt}>有缩略图</span>
                        <Switch checked={data.isThumb} onChange={isThumb => onChange({ isThumb })} />
                    </div>
                </div>
                <div className={styles.btns}>
                    <Button type="primary" className={styles.next} onClick={() => onChangeStep(1)}>
                        上一步
                    </Button>
                    <Button type="primary" className={styles.next} onClick={onSave}>
                        保存
                    </Button>
                </div>
            </div>
        );
    }
}
