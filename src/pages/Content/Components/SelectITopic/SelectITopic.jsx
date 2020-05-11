import React, { Component } from "react";
import { message, Select } from "antd";
const Option = Select.Option;
import SelectItem from "../SelectItem/SelectItem";
import styles from "../Edit.scss";

import { getTopicListData } from "@/services/content";

export default class SelectITopic extends Component {
    state = {
        topicList: []
    };
    componentDidMount() {
        this.getTopicListData();
    }
    /**
     * 获取专题数据
     */
    getTopicListData = async () => {
        let res = await getTopicListData();
        if (res.success) {
            this.setState({
                topicList: res.body
            });
        }
    };
    render() {
        let { name, value, onChange } = this.props;
        let { topicList } = this.state;
        return (
            <div className={styles.time}>
                <span className={styles.t}>关联专题</span>
                <SelectItem
                    className={styles.st}
                    value={value}
                    placeholder="请选择"
                    onChange={value => onChange(name, value)}
                >
                    {topicList.map(d => {
                        return (
                            <Option key={d.id} value={d.id}>
                                {d.name}
                            </Option>
                        );
                    })}
                </SelectItem>
            </div>
        );
    }
}
